const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const usersApi = require('./routes/users.js');
const locations = require('./routes/locations.js');
const validate = require('./controllers/validate.controller.js').validate;
const dbConfig = require('./models/config/db.conf.js')();
const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());


app.use('/api/locations', locations);
app.use('/api/users', usersApi);



module.exports = app;