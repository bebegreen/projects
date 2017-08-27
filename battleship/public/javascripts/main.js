window.onload = function () {

    var socket = io.connect();

    var board = new Board('canvas', socket);

    board.drawTables();

}

// window.onload = function () {

//     var socket = io.connect();

//     var board = new Board('canvas');

//     board.drawTables();

//     var client = new Client(board, socket);

//     board.client = client;

// }