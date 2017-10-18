var express = require('express');
var router = express.Router();
var validate = require('../controllers/validate.controller.js').validate; 

var usersCtrl = require('../controllers/usersController.js'); 

router.get('/applicants/:job_id',validate, usersCtrl.getApplicants); 
router.post('/login', usersCtrl.login); 
router.post('/register', usersCtrl.register); 
router.get('/:username', validate, usersCtrl.getUser); 

module.exports = router; 