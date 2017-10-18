const MongoClient = require('mongodb').MongoClient;
const url = require('./config/dbUrl.js').url;
const skillsList = require('./config/moch-skills.js');

var ObjectId = require('mongodb').ObjectID;

exports.getJobs = username => {
    const dbPromise = MongoClient.connect(url);

    return dbPromise.then(db => {
        return db.collection('jobs')
            .find({},
            { title: 1, date: 1, company: 1, address: 1, applicants: 1 })
            .sort({ date: -1 })
            .limit(10)
            .toArray()
    })
        .then(result => {
            exports.markAppliedJobs(result, username);
            return result;
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getSkills = (keyword) => {

    const dbPromise = MongoClient.connect(url);

    return dbPromise.then(db => {

        let skills = searchSkills(db, keyword, 'skill');
        let titles = searchTitleOrCompany(db, keyword);
        return Promise.all([skills, titles]).then(data => {
            let options = data[0].concat(data[1]);
            return options;
        })


    }).catch(err => {
        console.log(err);
    })

}

exports.getJobDetails = (job_id) => {
    const dbPromise = MongoClient.connect(url);
    let job;
    return dbPromise.then(db => {
        const jobs = db.collection('jobs');
        return jobPromise = jobs.findOne(
            { _id: ObjectId(job_id) },
            { description: 1, skills: 1, company: 1 }
        )
    })
        .then(doc => {
            job = doc;
            return exports.matchSkills(job.skills, dbPromise)
        })
        .then(skills => {
            job.skills = skills;
            return job;
        })
        .catch(err => {
            reject(err);
        })
}

exports.getAppliedJobs = username => {

    const dbPromise = MongoClient.connect(url);

    return dbPromise.then(db => {

        return db.collection('jobs')
            .find(
            { applicants: username },
            { publisher: 0 })
            .toArray()

    }).then(jobs => {
        jobs.forEach(job => {
            job.applicants = username;
        })
        return jobs;

    }).catch(err => {
        console.log(err);
    })

}

exports.getJobsByKeyword = (keyword, location, username) => {

    const dbPromise = MongoClient.connect(url);

    return dbPromise.then(db => {
        return buildQuery(db, keyword, location);


    }).then(jobs => {

        exports.markAppliedJobs(jobs);
        return jobs;

    }).catch(err => {
        console.log(err);
    })

}


exports.getJobsUserOffered = (username) => {

    const dbPromise = MongoClient.connect(url);

    return dbPromise.then(db => {

        return db.collection('jobs').find({
            publisher: username
        }).toArray()

    }).catch(err => {
        console.log(err);
    })
}

exports.getSkillsNames = () => {
    const dbPromise = MongoClient.connect(url);

    return dbPromise.then(db => {
        return db.collection('skills')
            .find({}, { skill: 1 })
            .toArray();

    }).then(skillsArray => {

        let skillsNames = [];
        for (let obj of skillsArray) {
            skillsNames.push(obj.skill);
        }
        return skillsNames;

    }).catch(err => {
        console.log(err);
    })
}

exports.postJob = (job, username) => {
    const dbPromise = MongoClient.connect(url);

    return dbPromise.then(db => {
        return db.collection('jobs').insertOne({
            title: job.title,
            company: job.company,
            date: new Date(),
            address: { city: job.address },
            description: job.description,
            publisher: username
            // coordinates: 

        })
    })
}

exports.markAppliedJobs = (jobs, username) => {

    jobs.forEach(job => {
        if (job.applicants) {
            if (job.applicants.indexOf(username) > -1) {
                job.applicants = username;
            }
            else {
                delete job.applicants;
            }
        }
    });
   
}

exports.matchSkills = (skillsIndex, dbPromise) => {

    return dbPromise.then(db => {
        return db.collection('skills')
            .find({
                id: { $in: skillsIndex }
            })
            .toArray()

    }).then(skillsDocuments => {

        let skills = [];
        for (let doc of skillsDocuments) {
            skills.push(doc.skill);
        }
        return skills;
    })

}


function buildQuery(db, keyword, location) {

    if (keyword && location) {
        var query = queryAnd(db, keyword, location);
    }
    else {
        var query = queryOr(db, keyword, location);
    }
    return query;

}

function searchAtSkills(db, keyword) {
    return searchSkills(db, keyword, 'id')
        .then(index => {
            return getJobsBySkill(db, index)
        })
        .then(jobs => {
            return jobs;
        })

}


function searchSkills(db, keyword, field) {

    const dbPromise = MongoClient.connect(url);

    return dbPromise.then(db => {

        return db.collection('skills').find({
            skill: { $regex: new RegExp(".*" + keyword + ".*", "i") }
        }).toArray()

    }).then(skills_ids => {

        let skillsNames = [];
        for (let val of skills_ids) {
            skillsNames.push(val[field]);
        }
        return skillsNames;

    }).catch(err => {
        console.log(err);
    })
}


function searchTitleOrCompany(db, keyword) {

    const dbPromise = MongoClient.connect(url);

    return dbPromise.then(db => {

        return db.collection('jobs').find({
            $or: [
                { title: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
                { company: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
            ]
        }, { title: 1, company: 1 })
            .toArray()

    }).then(arr => {

        let options = [];
        for (let val of arr) {
            options.push(val.title, val.company);
        }
        return options;
    }).catch(err => {
        console.log(err);
    })

}


function getJobsBySkill(db, index) {
    return new Promise((resolve, reject) => {

        db.collection('jobs').find({
            skills: { $in: index }
        })
            .toArray((err, arr) => {
                resolve(arr);
            })
    })
}

function queryAnd(db, keyword, location) {
    let bySkill = searchAtSkills(db, keyword);

    let byTitleLocationCompany = () => {
        return db.collection('jobs').find({

            $and: [
                {
                    $or: [
                        { company: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
                        { title: { $regex: new RegExp(".*" + keyword + ".*", "i") } }
                    ]
                },
                { 'address.city': { $regex: new RegExp(".*" + location + ".*", "i") } }
            ]

        }).sort({ date: 1 }).toArray();
    }

    return Promise.all([bySkill, byTitleLocationCompany()])
        .then(([options1, options2]) => {
            if (options1.length) {
                let relevantJobs = [];
                for (let job of options1) {
                    var reg = new RegExp(location, 'gi');
                    if (job.address.city.match(reg)) {
                        relevantJobs.push(job);
                    }
                }
                return relevantJobs;
            }
            return options2;
        })
        .catch(err => {
            console.log(err);
        })

}

function queryOr(db, keyword, location) {

    let bySkill = searchAtSkills(db, keyword);

    let byTitleLocationCompany = () => {
        return db.collection('jobs').find({
            $or: [
                { title: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
                { company: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
                { 'address.city': { $regex: new RegExp(".*" + location + ".*", "i") } }
            ],

        }).sort({ date: 1 }).toArray();
    }

    return Promise.all([bySkill, byTitleLocationCompany()])
        .then(([options1, options2]) => {
            if (options1.length && options2.length) {
                return options1.concat(options2);
            }
            return options1.length ? options1 : options2;
        })
        .catch(err => {
            console.log(err);
        })
}


