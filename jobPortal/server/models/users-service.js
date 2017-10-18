const MongoClient = require('mongodb').MongoClient;
const url = require('./config/dbUrl.js').url;
const jwt = require('jsonwebtoken');
const jobsService = require('./jobs.service.js');
const ObjectId = require('mongodb').ObjectID;
const skillsList = require('./config/moch-skills.js').skills;
const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyDoXkSSqgDV07tBv42eBsKpoRBm4rJmMhQ', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

exports.getUser = username => { 
    const dbPromise = MongoClient.connect(url);
    let user; 

    return dbPromise.then(db => { 
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
        let address;
    
        return getCoords(user)
            .then(addr => {
                user.skills = matchSkillsNamesToIndex(user.skills);
                address = addr;
                return MongoClient.connect(url);
    
            }).then(database => {
                db = database;
                return findUser(db, user)
    
            }).then(arr => {
                return insertNewUser(db, user, arr, address);
    
            }).then(() => {
    
                return newToken(user.username);
    
            }).catch(err => {
                console.log(err);
            })
    
    }

exports.authenticate = (username, password) => {

    const dbPromise = MongoClient.connect(url);

    return dbPromise.then(db => {

        return db.collection('users').findOne({
            username: username, 
            // password: hashedPassword tbd...
        })

    }).then(user => {
        if (!user) {
            throw new Error('not found');
        }
        else {
            let token = newToken(user.username);
            return token;
        }

    }).catch(err => {
        if (err.message === 'not found') throw err;
        throw new Error('internal error');
    })
}

function newToken(username) {
    return jwt.sign({
        username: username
    }, 'secret')
}



exports.getApplicants = (job_id) => {

    const dbPromise = MongoClient.connect(url);
    let db;

    return dbPromise.then(database => {
        db = database;
        return getJob(db, job_id)

    }).then(job => {

        return getApplicants(db, job);

    }).catch(err => {
        console.log(err);
    })

}

function getCoords(user) {
    let coordinates = [];
    return geocoder.geocode(user.city)
        .then(function (res) {
            coordinates.push(res[0].longitude, res[0].latitude);
            let address = {
                city: user.city,
                steet: user.street,
                coordinates: coordinates
            }
            return address;
        })
        .catch(function (err) {
            console.log(err);
        });
}

function findUser(db, user) {
    return db.collection('users')
        .find(
        {
            $or: [
                { username: user.username },
                { email: user.email }
            ]
        }).toArray()
}

function insertNewUser(db, user, arr, address) {
    if (!arr.length) {

        return db.collection('users').insertOne({
            username: user.username,
            password: user.password,
            email: user.email,
            skills: user.skills,
            address: address,
            firstname: user.fname,
            lastname: user.lname,
            private_data: user.cv
            
        })

    }
    else throw new Error('exists');
}

function matchSkillsNamesToIndex(skillsNames) {
    let skillsIndex = []; 
    for (let skill of skillsNames) {
        skillsIndex.push(skillsList.indexOf(skill)); 
    }
    return skillsIndex; 
    
}

function getJob(db, job_id) {
    let job = db.collection('jobs').findOne({
        _id: ObjectId(job_id)
    })
    return job;
}

function getAllSkills(db) {
    return db.collection('skills').find({}).toArray();
}

async function getApplicants(db, job) {
    const skills = await getAllSkills(db);
    let applicants = job.applicants;
    if (applicants) {
        return db.collection('users').find({
            username: { $in: applicants }

        })
            .toArray()
            .then(users => {

                for (let user of users) {
                    let userSkills = [];
                    for (let index of user.skills) {
                        index = skills[index + 1].skill;
                        userSkills.push(index);
                    }
                    user.skills = userSkills;
                }
                return users;
            })

    }
    else {
        return [];
    }

}


