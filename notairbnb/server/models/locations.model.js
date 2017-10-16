const connection = require('./config/dbUrl.js').connection;
const objectID = require('mongodb').ObjectID;


exports.getLocations = () =>
    connection.then(db =>
        db.collection('locations').find({}, {
            price: 1,
            type: 1,
            title: 1,
            theSpace: 1,
            rating: 1,
            reviews: 1,
            imageUrl: 1,
            address: 1
        }).toArray()
    )

exports.getLocation = async (locationID) => {

    const db = await connection;
    const users = db.collection('users');
    try {

        let location = await db.collection('locations').findOne({ _id: objectID(locationID) });
        let user = await users.findOne({ id: location.userID }, { imageUrl: 1, firstname: 1 });

        for (let review of location.reviews) {
            let reviewer = await users.findOne({ id: review.userID }, { firstname: 1, imageUrl: 1 })
            review.userImageUrl = reviewer.imageUrl;
            review.name = reviewer.firstname;
        }

        location.owner = user;

        return location;

    }
    catch (err) {
        throw err;
    }
}

exports.book = async (locationID, dates) => {
    const db = await connection;

    try {
        const location = await db.collection('locations').updateOne(
            { _id: objectID(locationID) },
            { $addToSet: { occupancy: dates } }
        )
        return location; 
         
    }
    catch (err) {
        throw err;
    }

}

