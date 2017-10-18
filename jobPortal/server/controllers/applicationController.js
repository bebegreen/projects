var applicationService = require('../models/applicationService.js');

exports.apply = (req, res) => {
    var job_id = req.body.id;
    var username = req.username;
    if (username) {

        applicationService.addApplication(username, job_id).then(() => {
            res.sendStatus(200);
        })
            .catch((err) => {
                if (err.message === 'internal error') { res.sendStatus(500) }
                if (err.message === 'bad query') { res.sendStatus(400) }
            })
    }

}