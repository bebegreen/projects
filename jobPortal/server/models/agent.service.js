const MongoClient = require('mongodb').MongoClient;
const url = require('./config/dbUrl.js').url;
const ObjectID = require('mongodb').ObjectID;
const jobsService = require('./jobs.service.js')


exports.getAgentJobs = (username) => {

    const dbPromise = MongoClient.connect(url);
    let db;

    return dbPromise.then(database => {
        db = database;
        return db.collection('users')
            .findOne({
                username: username
            })

    }).then(user => {

        let skills = user.skills;
        let location = user.address.city;

        return db.collection('jobs').find({

            $and: [
                { 'address.city': location },
                { skills: { $in: skills } },
            ]

        }).toArray();
   
    }).then(arr => { 

        jobsService.markAppliedJobs(arr, username); 
        return arr; 
    
    }).catch(err => { 
        
        console.log(err); 
    })
}
