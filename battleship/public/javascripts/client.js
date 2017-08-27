
class Client extends Game {
    constructor(socket) {
        console.log('connected to server');
        super();
        this.socket = socket;
        this.registerEvents();
    }

    registerEvents() {
        this.socket.on('logged in', (name) => {
            this.displayUsers(name);
        })

        this.socket.on('users', super.addUsers);

        this.socket.on('new user', super.newUser);

        this.socket.on('user left', super.removeUser);

        this.socket.on('nickname already exists', super.invalidName);

        this.socket.on('his turn', () => {
            super.opponentStarts();
        })

        this.socket.on('start game', (ships, opponentName) => {
            super.startGame(ships, opponentName)
        })

        this.socket.on('your turn', () => {
            super.alertTurn();
        })

        this.socket.on('update', (boardInfo) => {
            this.update(boardInfo);
        })

        this.socket.on('error', (data) => {
            alert(data.message);
        })

        this.socket.on('game over', (msg) => {
            this.alertMsg(msg);
            this.newGame();
        })

        this.socket.on('opponent left game', () => {
            alert('opponent left game');
        })

        this.socket.on('chat message', super.addChatMsg)
    }

    emitPlay(chosenOpponent) {
        this.socket.emit('play', chosenOpponent);
    }

    emitLogin(nickname) {
        this.socket.emit('login', nickname);
    }

    emitShot(cell) {
        this.socket.emit('shot', cell);
    }

    emitChat(msg) {
        this.socket.emit('chat message', msg);
    }
    emitBack(){ 
        this.socket.emit('back'); 
    }
}
