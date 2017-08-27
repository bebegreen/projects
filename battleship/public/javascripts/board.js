class Board extends Client {
    constructor(canvas_id, socket) {
        super(socket);
        this.canvas = document.getElementById(canvas_id);
        // if (!this.canvas.ctx) throw Error('no canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth * 0.7;
        this.canvas.height = window.innerHeight * 0.6;

        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.cellWidth = this.width / 2 / 12;
        this.cellHeight = this.height / 12;

        this.registerListener();

    }

    drawTable() {
        this.ctx.save();
        this.ctx.translate(this.cellWidth, this.cellHeight);
        this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
        this.ctx.fillRect(0, 0, this.cellWidth * 10, this.cellHeight * 10)

        for (var i = 0; i < 10; ++i) {
            for (var j = 0; j < 10; ++j) {
                this.ctx.lineWidth = 1.6;
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                this.ctx.strokeRect(this.cellWidth * j, this.cellHeight * i, this.cellWidth, this.cellHeight);
            }
        }
        this.ctx.restore();
    }

    drawTables() {

        this.ctx.save();
        this.ctx.translate(this.width / 2, 0);
        this.drawTable();
        this.ctx.restore();
        this.drawTable();
        this.loadBackGround();

    }

    drawShips(ships) {
        this.clear();
        this.drawTables();

        var shipPadding = 4;
        // console.log(ships);
        this.ctx.fillStyle = '#3366ff';
        this.ctx.save();
        this.ctx.translate(this.cellWidth, this.cellHeight);
        for (var i = 0; i < ships.length; ++i) {

            var x = ships[i].x * this.cellWidth + shipPadding;
            var y = ships[i].y * this.cellHeight + shipPadding;
            var shipWidth = ships[i].horizontal ? this.cellHeight - shipPadding * 2 :
                this.cellWidth - shipPadding * 2;
            var shipLength = ships[i].horizontal ? this.cellWidth * ships[i].size - shipPadding * 2 : // if horizontal multiply cell width
                this.cellHeight * ships[i].size - shipPadding * 2; // if vertical multiply cell height

            if (ships[i].horizontal) {
                this.ctx.fillRect(x, y, shipLength, shipWidth);
            } else {
                this.ctx.fillRect(x, y, shipWidth, shipLength);
            }
        }
        this.ctx.restore();

    }


    registerListener() {

        var handleClick = this.handleClick.bind(this);
        this.canvas.addEventListener('click', handleClick);
    }

    handleClick(e) {
        var cell = this.getCellCoordinates(e);
        console.log(cell);
        // click is in range of enemys table
        if (cell.x >= 0 && cell.x <= 9 && cell.y >= 0 && cell.y <= 9) {
            this.sendShot(cell);
        }
    }

    getCellCoordinates(e, table) {
        var canvas = this.canvas.getBoundingClientRect();
        var canvasX = e.clientX - canvas.left; // now canvasX is 0, 0 =  canvas left top
        var canvasY = e.clientY - canvas.top;
        var opponentTableX = canvasX - this.width / 2; // opponent table x, y
        var opponentTableY = canvasY;
        var x = Math.floor(opponentTableX / this.cellWidth) - 1;
        var y = Math.floor(opponentTableY / this.cellHeight) - 1;
        console.log(opponentTableX, canvasX);
        console.log(this);
        return {
            x,
            y
        };
    }

    update(boardInfo) {
        this.ctx.save();
        if (boardInfo.board === 'hisBoard') {
            this.ctx.translate(this.width / 2, 0);
        }

        this.ctx.translate(this.cellWidth, this.cellHeight);

        for (var i = 0; i < 10; ++i) {
            for (var j = 0; j < 10; ++j) {
                if (boardInfo.map[i][j] === 0) {
                    this.drawMiss(i, j);
                }
                if (boardInfo.map[i][j] === 1) {
                    this.drawHit(i, j);
                }
            }
        }
        this.ctx.restore();
    }

    drawMiss(i, j) {
        // this.ctx.fillRect(j * this.cellWidth, i * this.cellHeight, this.cellWidth, this.cellHeight);
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(this.cellWidth * j + (this.cellWidth / 4), this.cellHeight * i + (this.cellHeight / 4))
        this.ctx.lineTo(this.cellWidth * (j + 1) - (this.cellWidth / 4), this.cellHeight * (i + 1) - (this.cellHeight / 4));
        this.ctx.moveTo(this.cellWidth * (j + 1) - (this.cellWidth / 4), this.cellHeight * i + (this.cellHeight / 4))
        this.ctx.lineTo(this.cellWidth * j + (this.cellWidth / 4), this.cellHeight * (i + 1) - (this.cellHeight / 4))
        // this.ctx.closePath(); 
        this.ctx.stroke();
    }

    drawHit(i, j) {

        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(j * this.cellWidth + this.cellWidth / 2,
            i * this.cellHeight + this.cellHeight / 2, this.cellWidth / 4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    clear() {

        this.ctx.clearRect(0, 0, this.width, this.height); // (x, y, width, height); 

    }

    loadBackGround() {
        this.ctx.fillStyle = "#333";
        this.img = new Image();
        this.img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Rangefinder_reticle_08a.svg/220px-Rangefinder_reticle_08a.svg.png';
        this.img.onload = () => {
            this.ctx.drawImage(this.img, this.width / 2 + this.cellWidth * 2 - 3, this.cellHeight * 2, this.width / 2 - this.cellWidth * 4, this.height - this.cellHeight * 4);
        }
    }
}

