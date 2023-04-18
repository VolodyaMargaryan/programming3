class Makabuyc {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 50;
        this.directions = [];

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x,     this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x,     this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        let emptyCelss = this.chooseCell(0)
        let newCell = emptyCelss[Math.floor(Math.random() * emptyCelss.length)]
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 3
            let newMak = new Makabuyc (newX, newY)
            makabuycArr.push(newMak)
            this.energy = 10
        }
    }
    move() {
        this.energy--
        let emptyCelss = this.chooseCell(0)
        let newCell = emptyCelss[Math.floor(Math.random() * emptyCelss.length)]
        if (newCell && this.energy >= 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }
    eat() {
        let emptyCelss = this.chooseCell(3)
        let newCell = emptyCelss[Math.floor(Math.random() * emptyCelss.length)]
        if (newCell) {
            this.energy++
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 15) {
                this.mul()
            }
            for (var i in makabuycArr) {
                if (newX == makabuycArr[i].x && newY == makabuycArr[i].y) {
                    makabuycArr.splice(i, 1);
                    break;
                }
            }

        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in makabuycArr) {
            if (this.x == makabuycArr[i].x && this.y == makabuycArr[i].y) {
                makabuycArr.splice(i, 1);
                break;
            }
        }
    }
}