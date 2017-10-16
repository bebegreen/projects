const connection = require('./config/dbUrl.js').connection;
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;


exports.getUser = username => {
    let user;

    return connection.then(db => {
        return db.collection('users').findOne({
            username: username

        }).then(person => {
            user = person;
            return jobsService.matchSkills(person.skills, dbPromise);

        }).then(skills => {
            user.skills = skills;
            return user;
        })
    })
}

exports.register = (user) => {

    let db;

    return connection.then(database => {
        db = database;
        return findUser(db, user)

    }).then(foundUser => {
        if (foundUser) throw new Error('exists');
        return insertNewUser(db, user);

    }).then(() => {
        return newToken(user.email);

    })

}

exports.authenticate = (username, password) => {


    return connection.then(db => {

        return db.collection('users').findOne({
            username: username,
            password: password
        })

    }).then(user => {
        if (!user) {
            throw new Error(401);
        }
        else {
            let token = newToken(user.username);
            return token;
        }

    }).catch(err => {
        if (err.message === '401') { 
            throw err; 

        }
        else throw new Error(500 );
    })
}

function newToken(email) {
    return jwt.sign({
        email: email
    }, 'secret')
}



function findUser(db, user) {
    return db.collection('users')
        .findOne({ email: user.email })
}

function insertNewUser(db, user) {

    return db.collection('users').insertOne({
        password: user.password,
        email: user.email,
        firstname: user.fname,
        lastname: user.lname,
    })



}


