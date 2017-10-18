var express = require('express');
var router = express.Router();
var validate = require('../controllers/validate.controller.js').validate; 

var applicationCtrl = require('../controllers/applicationController.js')

router.put('/', validate, applicationCtrl.apply); 

module.exports = router; 