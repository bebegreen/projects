const Player = require('./player.js');

/**creates a new game
 * @class
 * @param { string } player1 - socket id for player 1
 * @param { string } player2 - socket id for player 2
 */
class game {
    constructor(player1_id, player2_id) {
    
        this.currentPlayer = Math.floor(Math.random() * 2);
        this.winningPlayer = null;
        this.gameStatus = null;
        this.players = [new Player(player1_id), new Player(player2_id)];

    }

    /**switch turns */
    switchPlayer() {
        this.currentPlayer = this.currentPlayer ? 0 : 1;

    }

    tryHit(shot) {
        var hitShip, opponent = this.currentPlayer ? 0 : 1;

        for (var i = 0; i < 5; ++i) {
            var ship = this.players[opponent].ships[i]

            if (ship.horizontal) {
                // shot is in range of ship
                if (shot.x >= ship.x && shot.x < ship.size + ship.x && ship.y === shot.y) {
                    hitShip = this.hitShipForBothPlayers(ship, shot, opponent);
                    return true;
                }
            }
            // vertical
            else {
                if (shot.y >= ship.y && shot.y < ship.size + ship.y && ship.x === shot.x) {
                    hitShip = this.hitShipForBothPlayers(ship, shot, opponent);
                    return true;
                }
            }
        }

        // mark a miss at current users board
        if (!hitShip) {
            this.players[this.currentPlayer].hitWater(shot);
            this.players[opponent].addMiss(shot);
            
            return false;
        }
    }

    hitShipForBothPlayers(ship, shot, opponent) {
        ship.hits++;
        this.players[this.currentPlayer].hitShip(shot);
        this.players[opponent].addHit(shot);
        return true;
    }

    gameIsOver(player) {
        var ships = this.players[player].ships;
        var shipsCount = 0;
        for (let i = 0; i < ships.length; ++i) {
            if (ships[i].isSunk()) {
                ++shipsCount;
            }
        }
        return shipsCount === 5;
    }
}

module.exports = game; 