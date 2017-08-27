var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    // if req.session.loggedIn { 
    //  next(); 
    //}

    req.session.loggedIn = false; 
})