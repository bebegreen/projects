var express = require('express');
var router = express.Router();
var jobsCtrl = require('../controllers/jobsController.js');
var agentCtrl = require('../controllers/agent.controller.js');  
var distanceCtrl = require('../controllers/distance.controller.js'); 
var validate = require('../controllers/validate.controller.js').validate; 

router.get('/', validate, jobsCtrl.getJobs); 
router.get('/skillsNames', jobsCtrl.getSkillsNames); 
router.get('/appliedJobs', validate, jobsCtrl.getAppliedJobs)
router.get('/jobsUserOffered', validate, jobsCtrl.getJobsUserOffered); 
router.get('/agent', validate, agentCtrl.getAgentJobs)
router.get('/jobsInRadius', validate, distanceCtrl.getJobsInRadius); 
router.get('/skills', jobsCtrl.getSkills);  
router.get('/:id', jobsCtrl.getJobDetails);
router.post('/', validate, jobsCtrl.postJob); 

module.exports = router; 