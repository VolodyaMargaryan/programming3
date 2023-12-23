let LivingCreature = require('./LivingCreature')

module.exports = class Vorsord extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 15;
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
        return super.chooseCell(character)
    }

    mul() {
        let emptyCells = this.chooseCell(0)
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 6
            let newVors = new Vorsord(newX, newY)
            vorsordArr.push(newVors)
        }
    }

    move() {
        this.energy--
        let emptyCells = this.chooseCell(0)
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.energy >= 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 6
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if(this.energy <= 0){
                this.die()
            }
        } 
    }

    eat() {
        let emptyCells1 = this.chooseCell(3)
        let newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        let emptyCells2 = this.chooseCell(4)
        let newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        if (newCell1) {
            this.energy+=2
            let newX = newCell1[0]
            let newY = newCell1[1]
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                }
            }
            matrix[newY][newX] = 6
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 20) {
                this.mul()
            }
        } 
        else if (newCell2) {
            this.energy--
            let newX = newCell2[0]
            let newY = newCell2[1]
            for (var i in virusArr) {
                if (newX == virusArr[i].x && newY == virusArr[i].y) {
                    virusArr.splice(i, 1);
                }
            }
            matrix[newY][newX] = 6
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 15) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0

        for (var i in vorsordArr) {
            if (this.x == vorsordArr[i].x && this.y == vorsordArr[i].y) {
                vorsordArr.splice(i, 1);
            }
        }
    }
}