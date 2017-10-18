const distance = require('../models/distance.service.js');

exports.getJobsInRadius = (req, res) => {
    
    let username = req.username;
    
        let km = req.query.km;
        distance.jobsInRadius(username, km)
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                if (err.message === 'no jobs found') {
                    res.json({data: {}}); 
                }
                else {
                    res.sendStatus(500);
                }
            })
    
}