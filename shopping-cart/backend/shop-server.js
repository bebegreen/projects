var http = require('http');
var socketio = require('socket.io');
var router = require('./router.js');
var registerPaths = require('./register-paths.js');
var socketManager = require('./socket-manager.js');

registerPaths(); 

var app = http.createServer(router.route);

var io = socketio.listen(app);

socketManager.registerListeners(app, io);

app.listen(8080, () => {
    console.log('running')
});






