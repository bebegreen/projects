var dataBase = require('./dataBase.js');
var socketio = require('socket.io');
var http = require('http');
var router = require('./router.js');
var request = require('request');



function registerListeners(app, io) {

    io.sockets.on('connection', function (socket) {

        socket.emit('connected');

        socket.on('ctgrsPage', () => {

            dataBase.getCtgrs().then((ctgrs) => {

                socket.emit('recieveCtgrs', ctgrs);
            })

        })

        socket.on('prodsPage', function (catID) {

            dataBase.getProds(catID).then((prods) => {
                socket.emit('recieveProds', prods);
            })

        });

        socket.on('pageLoaded', () => {

            dataBase.loadCart().then((cartData) => {
                socket.emit('cartData', cartData)
            })
        })

        socket.on('addToCart', (prod_id) => {

            dataBase.addToCart(prod_id);

        });

        socket.on('remove', (id) => {

            dataBase.removeItem(id);

        });

        socket.on('updateCart', (id, qty) => {

            dataBase.updateCart(id, qty);

        });

        socket.on('currency', () => {

            request('http://api.fixer.io/latest?base=USD', (err, response, body) => {
                if (err) console.log(err);
                var parsed = JSON.parse(body);
                socket.emit('recieveRates', parsed.rates);

            })
        })

    });
}

module.exports = {
    registerListeners: registerListeners
} 