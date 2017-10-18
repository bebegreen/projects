const MongoClient = require('mongodb').MongoClient;
const url = require('./config/dbUrl.js').url;
const ObjectID = require('mongodb').ObjectID;
const jobsService = require('./jobs.service.js'); 

const distance = require('google-distance');
const NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyDoXkSSqgDV07tBv42eBsKpoRBm4rJmMhQ', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

exports.jobsInRadius = (username, km) => {

    const dbPromise = MongoClient.connect(url);
    let db, userCoords;

    return dbPromise.then(database => {
        db = database;
        return getUserLongLat(username, db)

    }).then(address => {

        userCoords = address.coordinates;
        let query = buildquery(userCoords, km);
        let fullAddress = address.city + ' ' + (address.street || '');
        return findJobsInRadius(query, db, fullAddress, username)

    }).then(jobs => {
        return { jobs, userCoords };

    }).catch(err => {
        console.log(err);
        throw new Error('no jobs found');
    })

}

var getLongLat = (address) => {

    return geocoder.geocode(address)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            throw err;
        });

}

function kmToRadian(km) {
    var earthRadiusInKm = 6371;
    return km / earthRadiusInKm;
}

function getUserLongLat(username, db) {
    return db.collection('users')
        .findOne({ username: username })
        .then(user => {
            return user.address;
        })
}

function buildquery(coordinates, km) {

    return {
        coordinates:
        {
            $nearSphere: {
                $geometry:
                { type: 'Point', coordinates: coordinates },
                $maxDistance: km * 1000
            }
        }
    }

}

function getFullAddress(addresses) {
    let fullAdds = [];
    for (let address of addresses) {

        fullAdds.push(address.city);
    }
    return fullAdds;
}

function calculateDistances(jobsAdds, userAddress) {
    let adds = getFullAddress(jobsAdds);

    return new Promise((resolve, reject) => {
        distance.get(
            {
                origins: adds,
                destinations: [userAddress]
            },
            (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
    })
}

// calculateDistances(['tel aviv'], 'jerusalem'); 

function addDistanceToJob(jobs, userAddress) {

    let jobsAdds = [];

    for (let job of jobs) {
        jobsAdds.push(job.address);
    }

    return calculateDistances(jobsAdds, userAddress)

        .then(distances => {
            for (let i = 0; i < jobs.length; ++i) {
                jobs[i].distance = distances[i].duration;
            }

            return jobs;
        })
        .catch(err => {
            console.log(err);
        })
}

function findJobsInRadius(query, db, userAddress, username) {
    return db.collection('jobs').find(query)
        .toArray().then(arr => {

            if (!arr.length) {
                return;
            }

            return addDistanceToJob(arr, userAddress)
            // return arr;
        }).then(jobs => {
            jobsService.markAppliedJobs(jobs, username); 
            return jobs;

        }).catch(err => {
            console.log(err);
        })

}



