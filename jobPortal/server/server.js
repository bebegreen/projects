const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const applicationApi = require('./routes/application.api.js');
const jobsApi = require('./routes/jobs.api.js');
const usersApi = require('./routes/users.api.js');
const validate = require('./controllers/validate.controller.js').validate;
const dbConfig = require('./models/config/db.conf.js')();
const session = require('express-session');
const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

app.get('/hbs', function (req, res) {
  res.render('email');
});

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 6000000 } }))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/public')));

// app.use(express.static(path.join(__dirname, '../../jobs-portal')));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(path.join(__dirname, '../client/app')));
app.use(express.static(path.join(__dirname, '../client/app/components')));
app.use(express.static(path.join(__dirname, '../')));


app.use('/api/jobs', jobsApi);
app.use('/api/users', usersApi);
app.use('/api/application', applicationApi);


module.exports = app;