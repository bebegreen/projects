var users = require('./users.js');
var Game = require('./game.js');
var nicknames = {};
var gameId = 0;
var allPlayers = users.users;
var _ = require('lodash');
var server;
var usersManager = require('./authentication.js');
var appPlayers = require('./appPlayers.js');
var cookieParser = require('cookie-parser');

var session = require('express-session');
// var memoryStore = new session.MemoryStore();
var sessions = require('./sessions.js');

///////////////////////////////////////////////////////////////////////////
module.exports = function (io) {

  io.on('connection', socket => {
    console.log(socket.request.sessionID);
    new Client(io, socket);
  })
}

class Client {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.chosenOpponent = null;
    this.registerListeners();

  }

  registerListeners() {
    // var foundSession = _.findKey(sessions, (obj) => {return obj.sessionId === this.socket.request.sessionID;})
    // if (foundSession)
    // { 
    //   allPlayers[this.socket.nickname] = {socket: this.socket, isPlaying: false}
    //   this.socket.join('lobby'); 
    //   this.socket.emit('logged in', foundSession.nickname);  
    //   this.socket.emit('users', this.availableUsers());  
          
    // }
    

    this.socket.on('login', (newName) => {
      this.addNewUser(newName)
    });

    this.socket.on('disconnect', () => {
      this.disconnect();
    })

    this.socket.on('back', () => {
      this.backToLobby();
    })

    this.socket.on('play', (chosenOpponent) => {
      this.chosenOpponent = chosenOpponent;
      this.socket.leave('lobby');
      allPlayers[this.chosenOpponent].socket.leave('lobby');
      this.updateOtherPlayers(this.chosenOpponent, this.socket);

      this.socket.game = this.createNewGame(this.socket, this.chosenOpponent);
      allPlayers[chosenOpponent].socket.game = this.socket.game;

      var players = [this.socket, allPlayers[this.chosenOpponent].socket];

      this.setTurns();


      this.listenToShots(players);

    })

  }

  addNewUser(newName) {
    this.socket.nickname = newName;
    var allPlayersNames = Object.keys(allPlayers);
    if (allPlayersNames.indexOf(newName) < 0) {
      this.socket.join('lobby');
      this.socket.emit('logged in', newName);
      this.socket.broadcast.to('lobby').emit('new user', newName);
      this.socket.emit('users', this.availableUsers());
      allPlayers[newName] = {
        socket: this.socket,
        isPlaying: false
      }
      // this.addSession();

    } else {
      this.socket.emit('nickname already exists');

    }
  }

  addSession() {
    sessions.push({
      sessionId: this.socket.request.sessionID,
       nickname: this.socket.nickname,
       socketIds: [this.socket.id] 
    });
    console.log(sessions); 
  }

  addSocketToExistingSession() { 
    var sessionId = this.socket.request.sessionID; 
    var thisSessionObject = _.findKey(sessions, (obj) => { 
      return obj.sessionId === sessionId; 
    })
    thisSessionObject.socketIds.push(this.socket.id); 
    console.log(sessions); 
  }

  updateOtherPlayers() {
    var opponent = allPlayers[this.chosenOpponent];
    allPlayers[this.socket.nickname].isPlaying = true;
    allPlayers[this.chosenOpponent].isPlaying = true;
    this.socket.broadcast.to('lobby').emit('user left', this.socket.nickname);
    opponent.socket.broadcast.to('lobby').emit('user left', opponent.socket.nickname);
  }

  createNewGame() {
    var playerId = allPlayers[this.socket.nickname].socket.id;
    var opponentId = allPlayers[this.chosenOpponent].socket.id;

    var game = new Game(playerId, opponentId);

    var player = game.players[0];
    var opponent = game.players[1];

    this.io.to(opponentId).emit('start game', opponent.ships, this.socket.nickname);
    this.io.to(playerId).emit('start game', player.ships, this.chosenOpponent);

    return game;
  }

  setTurns() {
    var game = this.socket.game;
    var opponent = 1 - game.currentPlayer;
    var currentPlayer = game.currentPlayer;
    this.io.to(game.players[currentPlayer].id).emit('your turn');
    this.io.to(game.players[opponent].id).emit('his turn');

  }

  listenToShots(players) {
    players.forEach((currentPlayer, index) => {
      var opponent = players[index ? 0 : 1];
      //listen to chat
      currentPlayer.on('chat message', (msg) => {
        this.io.to(opponent.id).emit('chat message', msg);
      })
      currentPlayer.on('shot', (cellNumber) => {
        if (this.itsHisTurn(currentPlayer)) {
          var hitShip = currentPlayer.game.tryHit(cellNumber);
          this.sendUpdatedBoards(currentPlayer, opponent);
          if (!hitShip) {
            this.notifyTurnSwitch(currentPlayer, opponent);
          } else {
            this.checkIfGameIsOver(currentPlayer, opponent);
          }
        }
        // not his turn
        else {
          this.io.to(currentPlayer.id).emit('error', {
            message: 'opponents turn, please wait'
          })
        }

      })
    })
  }

  sendUpdatedBoards(currentPlayer, opponent) {
    var game = currentPlayer.game;
    var opponentIndex = game.currentPlayer ? 0 : 1;
    this.io.to(opponent.id).emit('update', {
      board: 'myBoard',
      map: game.players[opponentIndex].myBoard
    });

    this.io.to(currentPlayer.id).emit('update', {
      board: 'hisBoard',
      map: game.players[game.currentPlayer].hisBoard
    });
  }

  notifyTurnSwitch(currentPlayer, opponent) {
    var game = currentPlayer.game;
    game.switchPlayer();
    this.io.to(currentPlayer.id).emit('his turn');
    this.io.to(opponent.id).emit('your turn');
  }

  checkIfGameIsOver(currentPlayer, opponent) {
    var game = currentPlayer.game;
    var opponentIndex = game.currentPlayer ? 0 : 1;
    if (game.gameIsOver(opponentIndex)) {
      this.io.to(currentPlayer.id).emit('game over', 'you win!!!');
      this.io.to(opponent.id).emit('game over', 'you lose...');
    }
  }

  disconnect() {
    this.socket.broadcast.emit('user left', this.socket.nickname);
    delete allPlayers[this.socket.nickname];

  }

  backToLobby() {
    this.socket.join('lobby');
    var availableUsers = this.availableUsers();
    allPlayers[this.socket.nickname].isPlaying = false;
    this.socket.broadcast.to('lobby').emit('new user', this.socket.nickname);
    this.socket.emit('users', availableUsers)
  }

  availableUsers() {
    var available = [];
    for (let player in allPlayers) {
      if (allPlayers[player].isPlaying === false && allPlayers[player].nickname !== this.socket.nickname) {
        available.push(player);
      }
    }
    return available;
  }

  itsHisTurn(player) {
    return player.id === player.game.players[player.game.currentPlayer].id;
  }

}

/////////////////////////////////////////////////////////////////////////////////////

// module.exports = function (io) {

//   server = io;

//   io.on('connection', (socket) => {

//     console.log(socket.id + ' connected');

//     socket.on('login', (newName) => {
//       // usersManager.insertUser(newName); 
//       // chech with database or register new user...
//       addNewUser(socket, newName);
//     })

//     // socket disconnection 
//     socket.on('disconnect', () => {
//       disconnect(socket);
//     })

//     //chat msg 

//     socket.on('back', () => {
//       backToLobby(socket);
//     });

//     // start a game with the chosen opponent 

//     socket.on('play', (chosenOpponent) => {

//       socket.leave('lobby');

//       allPlayers[chosenOpponent].socket.leave('lobby');

//       updateOtherPlayers(chosenOpponent, socket);

//       socket.game = createNewGame(socket, chosenOpponent);
//       allPlayers[chosenOpponent].socket.game = socket.game;

//       var players = [socket, allPlayers[chosenOpponent].socket];

//       setTurns(socket);

//       listenToShots(players);

//     })
//   })
// }

// function backToLobby(socket) {
//   socket.join('lobby');
//   allPlayers[socket.nickname].isPlaying = false;
//   socket.broadcast.to('lobby').emit('new user', socket.nickname);
//   socket.emit('users', availableUsers());
// }

// function availableUsers() {
//   var available = [];
//   for (let player in allPlayers) {
//     if (!allPlayers[player].isPlaying) {
//       available.push(player);
//     }
//   }
//   return available;
// }

// function addNewUser(socket, newName) {
//   socket.nickname = newName;
//   var allPlayersNames = Object.keys(allPlayers);
//   if (allPlayersNames.indexOf(newName) < 0) {
//     socket.join('lobby');
//     socket.emit('logged in', newName);
//     socket.broadcast.to('lobby').emit('new user', newName);
//     socket.emit('users', availableUsers());
//     allPlayers[newName] = {
//       socket: socket,
//       isPlaying: false
//     }
//   } else {
//     socket.emit('nickname already exists');
//   }
// }

// function disconnect(socket) {
//   socket.broadcast.emit('user left', socket.nickname);
//   delete allPlayers[socket.nickname];
// }

// function updateOtherPlayers(chosenOpponent, socket) {
//   var opponent = allPlayers[chosenOpponent];
//   allPlayers[socket.nickname].isPlaying = true;
//   allPlayers[chosenOpponent].isPlaying = true;
//   socket.broadcast.to('lobby').emit('user left', socket.nickname);
//   opponent.socket.broadcast.to('lobby').emit('user left', opponent.socket.nickname);
// }

// function createNewGame(socket, chosenOpponent) {
//   var playerId = allPlayers[socket.nickname].socket.id;
//   var opponentId = allPlayers[chosenOpponent].socket.id;

//   var game = new Game(playerId, opponentId);

//   var player = game.players[0];
//   var opponent = game.players[1];

//   server.to(opponentId).emit('start game', opponent.ships, socket.nickname);
//   server.to(playerId).emit('start game', player.ships, chosenOpponent);

//   return game;

// }

// function setTurns(socket) {
//   var game = socket.game;
//   var opponent = game.currentPlayer ? 0 : 1;
//   var currentPlayer = game.currentPlayer;
//   server.to(game.players[currentPlayer].id).emit('your turn');
//   server.to(game.players[opponent].id).emit('his turn');

// }

// function listenToShots(players) {
//   players.forEach((currentPlayer, index) => {
//     var opponent = players[index ? 0 : 1];
//     //listen to chat
//     currentPlayer.on('chat message', (msg) => {
//       server.to(opponent.id).emit('chat message', msg);
//     })
//     currentPlayer.on('shot', (cellNumber) => {
//       var hitShip;
//       if (itsHisTurn(currentPlayer)) {
//         hitShip = currentPlayer.game.tryHit(cellNumber);
//         sendUpdatedBoards(currentPlayer, opponent);
//         if (!hitShip) {
//           notifyTurnSwitch(currentPlayer, opponent);
//         } else {
//           checkIfGameIsOver(currentPlayer, opponent);
//         }
//       }
//       // not his turn
//       else {
//         server.to(currentPlayer.id).emit('error', {
//           message: 'opponents turn, please wait'
//         })
//       }

//     })
//   })
// }

// function notifyTurnSwitch(currentPlayer, opponent) {
//   var game = currentPlayer.game;
//   game.switchPlayer();
//   server.to(currentPlayer.id).emit('his turn');
//   server.to(opponent.id).emit('your turn');
// }

// function checkIfGameIsOver(currentPlayer, opponent) {
//   var game = currentPlayer.game;
//   var opponentIndex = game.currentPlayer ? 0 : 1;
//   if (game.gameIsOver(opponentIndex)) {
//     server.to(currentPlayer.id).emit('game over', 'you win!!!');
//     server.to(opponent.id).emit('game over', 'you lose...');
//   }
// }

// function sendUpdatedBoards(currentPlayer, opponent) {
//   var game = currentPlayer.game;
//   var opponentIndex = game.currentPlayer ? 0 : 1;
//   server.to(opponent.id).emit('update', {
//     board: 'myBoard',
//     map: game.players[opponentIndex].myBoard
//   });

//   server.to(currentPlayer.id).emit('update', {
//     board: 'hisBoard',
//     map: game.players[game.currentPlayer].hisBoard
//   });
// }

// function itsHisTurn(player) {
//   return player.id === player.game.players[player.game.currentPlayer].id;
// }