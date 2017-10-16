const express = require('express');
const router = express.Router();
const locationsCtrl = require('../controllers/locations.controller.js');
// var validate = require('../controllers/validate.controller.js').validate; 

// router.route('/')
//     .get(locationsCtrl.getLocations)
//     .post(locationsCtrl.addLocation)



router.get('/', locationsCtrl.getLocations);
router.get('/:locationID', locationsCtrl.getLocation);
router.post('/book/:locationID', locationsCtrl.book); 

module.exports = router; 