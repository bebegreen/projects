var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var appPlayers = require('./my-modules/appPlayers.js');
var session = require('express-session');
// var memoryStore = new session.MemoryStore(); 
// console.log(memoryStore); 

// var isSessionLoggedIn = require('./routes/login-routes.js')
// var mysql = require('./routes/login-routes.js')(); 

// app.use(session({ secret: 'keyboard-cat', cookie: { maxAge: 60000 } }));

// handle new connection 

var sessionMiddleware = session({
  store: new session.MemoryStore({}), // XXX redis server config
  secret: "keyboard cat",
});
io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
})
app.use(sessionMiddleware); 
// app.get("/", function(req, res){
//     req.session // Session object in a normal request
//     console.log(req.session); 
// });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

require('./my-modules/client.js')(io);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app, server, io };
