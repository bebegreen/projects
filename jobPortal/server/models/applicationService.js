var MongoClient = require('mongodb').MongoClient;
const url = require('./config/dbUrl.js').url;

var ObjectId = require('mongodb').ObjectID;

/**add appliction */

exports.addApplication = (username, job_id) => {

    const dbPromise = MongoClient.connect(url);

    return dbPromise.then(db => {

        return Promise.all([
            assignApplicantToJob(db, username, job_id),
            assignJobToApplicant(db, username, job_id)

        ])

    }).catch(err => {
        throw err;
    })

}

function assignJobToApplicant(db, username, job_id) {

    var users = db.collection('users')

    return users.updateOne(
        { "username": username },
        {
            $addToSet: { "intrestedJobs": job_id }

        }).catch(err => {
            console.log(err);
        })
}

function assignApplicantToJob(db, username, job_id) {

    var jobs = db.collection('jobs');
    //update job with applicant
    return jobs.updateOne(
        { "_id": ObjectId(job_id) },
        {
            $addToSet: { "applicants": username }

        }).catch(err => {
            console.log(err);
        })

}
