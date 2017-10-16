const Locations = require('../models/locations.model.js');
const objectID = require('mongodb').ObjectID;

exports.getLocations = async (req, res) => {
     
    try {
        const locations = await Locations.getLocations(); 
        res.json(locations); 
    }
    catch (err) {
        console.log(err);  
        res.sendStatus(500); 
    }
}

exports.getLocation = (req, res) => {
    const locationID = req.params.locationID;

    Locations.getLocation(locationID)
        .then(location => {
            res.json(location);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
}

exports.book = async (req, res) => { 
    const locationID = req.params.locationID; 
    const dates = req.body; 

    try { 
        const location = await Locations.book(locationID, dates); 
        console.log(location); 
        res.json(location);  
    }
    catch (err) { 
        res.sendStatus(500); 
    }
}
