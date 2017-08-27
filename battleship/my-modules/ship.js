

class Ship {
    constructor(size, x, y, horizontal) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.hits = 0;
        this.horizontal = horizontal;
    }

    isSunk() {
        return this.hits >= this.size;
    }

}


module.exports = Ship;