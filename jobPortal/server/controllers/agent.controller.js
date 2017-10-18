const agentService = require('../models/agent.service.js');
const usersService = require('../models/users-service.js');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const exphbs = require('express-handlebars');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'binyamin.green',
        pass: 'bebe2468'
    }
});
const options = {
    viewEngine: exphbs,
    viewPath: '/home/binyamin/Desktop/myGit/web/projects/jobs-portal/views',
}


transporter.use('compile', hbs(options));

// activateAgent(); 

function activateAgent() {

    setTimeout(() => {
        // setInterval(() => {
        usersService.getUsers()
            .then(users => {
                sendEmails(users);
            })
        // }, 86400000);
        // }, 60000)
    }, 1000);
}

function sendEmail(email, jobsArr) {
    var mailOptions = {
        from: 'binyamin.green@gmail.com',
        to: email,
        subject: 'new agent alert!',
        template: 'email',
        context: {jobsArr}

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

async function sendEmails(users) {
    for (let user of users) {
        let jobs = await agentService.getAgentJobs(user.username);
        if (jobs.length) {
            let jobsArr = prepareEmail(jobs)
            sendEmail(user.email, jobsArr);
        }

    }
}

function prepareEmail(jobs) {
    let jobsArr = []; 
    for (let job of jobs) {
        let context = {
            title: job.title,
            company: job.company,
            location: job.address.city,
            date: job.date,

        }
        jobsArr.push(context);
    }
    return jobsArr;
}

exports.getAgentJobs = (req, res) => {

    let username = req.username;
    if (username) {
        agentService.getAgentJobs(username)
            .then((jobs) => {
                res.json(jobs);
            })
            .catch((err) => {
                res.sendStatus(500);
            })
    }

}

