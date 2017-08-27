
class Game {
    constructor() {
        // this.client = socket;
        this.registerListeners();
    }

    registerListeners() {

        document.getElementsByTagName('h1')[0].style.marginLeft = this.cellWidth + 'px';

        document.getElementById("send").addEventListener("click", () => {
            var nickname = document.getElementById('nickname').value;
            //register...
            // after register emit login...
            // if registered alreadt then sign up; 
            this.emitLogin(nickname);
        });


        document.getElementById("choose").addEventListener("click", () => {

            var selected = document.querySelectorAll('select option:checked');
            var players = Array.from(selected).map((el) => el.value);
            if (players.length > 1) {
                alert('at this stage of production you can only play vs one person at a time')
            }
            if (players.length === 1) {
                this.opponent = players[0]; 
                this.emitPlay(players[0]);
            }
        });

        document.getElementById('sendChat').addEventListener('click', (event) => {
            event.preventDefault();
            var chatBox = document.getElementById('chat');
            var msg = chatBox.value;
            console.log(msg);
            this.emitChat(msg);
            chatBox.value = '';
        })

    }

    startGame(ships, opponentName) {
        // board = new Board('canvas'); 
        // board.removeListener(); 

        this.clear();
        this.drawTables();
        this.drawShips(ships);
        this.displayChat();
        this.opponent = opponentName;
    }

    removeUser(username) {

        var selected = document.querySelectorAll('select option');
        var values = Array.from(selected).filter((el) => el.value === username);
        if (values.length) {
            document.getElementById('select').removeChild(values[0]);
        }
    }

    invalidName() {
        alert('nickname already exists');
    }

    displayUsers(name) {
        this.username = name;
        document.getElementById('users').style.display = 'block';
        document.getElementById('login').style.display = 'none';
    }

    displayChat() {
        var chat = document.getElementById('chatBox');
        var users = document.getElementById('users');
        chat.style.display = 'block';
        users.style.display = 'none';

        var backToLobby = document.getElementById('backToLobby');
        backToLobby.style.display = 'block';
        backToLobby.addEventListener('click', () => {
            this.emitBack(); 
            chat.style.display = 'none';
            users.style.display = 'block';
        })

        var alerts = document.getElementById('alerts');
        alerts.style.display = 'flex';
        alerts.style.width = this.canvas.width / 2 - this.cellWidth * 2 + 'px';
        alerts.style.marginLeft = this.width / 2 + this.cellWidth + 'px';

        document.getElementsByTagName('form')[0].style.marginTop = this.cellHeight + 'px';

    }

    addUsers(usersList) {
        var select = document.getElementById('select');
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
        usersList.forEach( name =>  {
            if (this.username !== name) {
                var option = document.createElement('option');
                var name = document.createTextNode(name);
                option.appendChild(name);
                select.appendChild(option);
            }
        });
    }


    newUser(newUser) {
        var option = document.createElement('option');
        var name = document.createTextNode(newUser);
        option.appendChild(name);
        document.getElementById('select').appendChild(option);
    }

    opponentStarts() {
        this.alertMsg('opponents turn, please wait')
    }

    alertMsg(msg) {
        var message = document.getElementById('alert');
        message.innerText = this.username + ', ' + msg;
    }

    alertTurn() {
        this.alertMsg('Your turn');
    }

    sendShot(cell) {
        this.emitShot(cell);
    }


    addChatMsg(msg) {
        console.log(msg);
        var ul = document.getElementById('messages');
        var li = document.createElement('li');
        var text = document.createTextNode('opponent: ' + msg);
        li.appendChild(text);
        ul.appendChild(li);
    }

    newGame() {
        var newGameBtn = document.getElementById('game-over')
        newGameBtn.style.display = 'block';

        newGameBtn.addEventListener('click', () => {
            this.emitPlay(this.opponent);
        })
    }
}

