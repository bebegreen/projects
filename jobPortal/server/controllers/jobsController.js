var jobsService = require('../models/jobs.service.js');

exports.getJobs = (req, res) => {
    if (req.query.keyword || req.query.location) {
        getJobsByKeyword(req, res);
    } else {

        jobsService.getJobs(req.username)
            .then(data => {
                res.json(data);
            })
    }
}

exports.getJobDetails = (req, res) => {
    let job_id = req.params.id;
    jobsService.getJobDetails(job_id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.sendStatus(404);
        })
}

exports.getSkills = (req, res) => {
    let keyword = req.query.keyword;
    jobsService.getSkills(keyword)
        .then(skills => {
            res.json(skills);
        })
        .catch(err => {
            res.sendStatus(404);
        })
}

exports.getAppliedJobs = (req, res) => {


    jobsService.getAppliedJobs(req.username)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.sendStatus(500);
        })
}

exports.getSkillsNames = (req, res) => {
    jobsService.getSkillsNames().then(skills => {
        res.json(skills);
    }).catch(err => {
        res.sendStatus(500);
    })
}



exports.getJobsUserOffered = (req, res) => {
    username = req.username;

    jobsService.getJobsUserOffered(username)
        .then(jobs => {
            res.json(jobs);
        })
        .catch(err => {
            res.sendStatus(500);
        })

}

exports.postJob = (req, res) => {
    let username = req.username; 
    let job = req.body;
    jobsService.postJob(job, username)
        .then(() => {
            res.sendStatus(200);
        }).catch(err => { 
            res.sendStatus(500); 
        })
}

function getJobsByKeyword(req, res) {
    let username = req.username;
    let keyword = req.query.keyword;
    let location = req.query.location;

    jobsService.getJobsByKeyword(keyword, location, username)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.sendStatus(err.status);
        })
}

// router.get('/:id', function (req, res) {
//     users.getSingleUser(req.params.id, function (result) {
//       res.status(result.status);
//       res.json(result.body);
//     })
//   })