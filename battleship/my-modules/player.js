var Ship = require('./ship.js');
var _ = require('lodash');

class player {
    constructor(socket_id) {
        this.id = socket_id;
        this.hisBoard = this.createBoard();
        this.myBoard = this.createBoard();
        this.ships = this.shipsPosition();
    }

    createBoard() {
        var board = Array(10);
        for (var i = 0; i < 10; ++i) {
            board[i] = Array(10);

        }
        return board;
    }

    shipsPosition() {

        var ships = [];
        var { horizontal, x, y, shipsSizes } = this.generateRandomPositions();
        while (this.isOverLaping(x, y, horizontal, shipsSizes)) {
            var random = this.generateRandomPositions();
            horizontal = random.horizontal;
            x = random.x;
            y = random.y;
        }

        for (var i = 0; i < 5; ++i) {
            var ship = new Ship(shipsSizes[i], x[i], y[i], horizontal[i]);
            ships.push(ship);

        }

        return ships;
    }

    generateRandomPositions() {
        var shipsSizes =  [5, 4, 3, 3, 2];
        function randomNumber(max) {
            return Math.floor(Math.random() * max);
        }
        var horizontal = [];
        var x = [];
        var y = [];
        for (let i = 0; i < 5; ++i) {
            horizontal[i] = Math.random() < 0.5;
            if (horizontal[i]) {
                x[i] = randomNumber(10 - shipsSizes[i]);
                y[i] = randomNumber(10);
            }
            else {
                x[i] = randomNumber(10);
                y[i] = randomNumber(10 - shipsSizes[i]);
            }

        }
        return { horizontal, x, y, shipsSizes };
    }

    /**
     * array of ships and surrounding zones -   
     *  xxxxxx
     * x{ship}x
     *  xxxxxx
     * if not over lapping should sum up to 61 points; 
     */
    isOverLaping(x, y, horizontal, shipsSizes) {

        var arr = [];
        for (let i = 0; i < 5; ++i) {
            if (horizontal[i]) {
                this.addHorizontalShip(arr, i, x, y, shipsSizes);
            }
            else {
                this.addVerticalShip(arr, i, x, y, shipsSizes);
            }
        }
        // ships are overlapping if array has less than 61 unique values
        return _.uniq(arr).length < 61;

    }

    addHorizontalShip(arr, i, x, y, shipsSizes) {
        for (let j = 0; j < shipsSizes[i]; ++j) {
            //the ship itself
            arr.push((x[i] + j + '' + y[i]),
                (x[i] + j + '' + (y[i] + 1)),
                x[i] + j + '' + (y[i] - 1));
        }
        // surrounding area
        arr.push((x[i] - 1 + '' + (y[i])), (x[i] + shipsSizes[i] + '' + (y[i])));
    }

    addVerticalShip(arr, i, x, y, shipsSizes) {
        for (let j = 0; j < shipsSizes[i]; ++j) {
            arr.push((x[i] + '' + (y[i] + j)),
                (x[i] + 1 + '' + (y[i] + j)),
                (x[i] - 1 + '' + (y[i] + j)));
        }
        arr.push((x[i] + '' + (y[i] - 1)), (x[i] + '' + (y[i] + shipsSizes[i])));
    }

    hitShip(coords) {
        this.hisBoard[coords.y][coords.x] = 1;
        // 1 ship hit, 0 water hit 
    }

    hitWater(coords) {
        this.hisBoard[coords.y][coords.x] = 0;
        // 1 ship hit, 0 water hit 
    }

    addHit(coords) {
        this.myBoard[coords.y][coords.x] = 1;
    }
    addMiss(coords){ 
        this.myBoard[coords.y][coords.x] = 0; 
    }

}


module.exports = player; 