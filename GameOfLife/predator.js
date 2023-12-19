let LivingCreature = require('./LivingCreature')
let Makabuyc = require("./makabuyc")

module.exports = class Predator extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.energy = 40;
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
            matrix[newY][newX] = 3
            let newPred = new Predator(newX, newY)
            predatorArr.push(newPred)
        }
    }

    move() {
        this.energy--
        let emptyCells = this.chooseCell(0)
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.energy >= 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if(this.energy <= 0){
                this.die()
            }
        } 
    }

    eat() {
        let emptyCells1 = this.chooseCell(5)
        let newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        let emptyCells2 = this.chooseCell(4)
        let newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        if (newCell1) {
            this.energy++
            let newX = newCell1[0]
            let newY = newCell1[1]
            for (var i in makabuycArr) {
                if (newX == makabuycArr[i].x && newY == makabuycArr[i].y) {
                   makabuycArr.splice(i, 1);
                }
            }
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 5) {
                this.mul()
            }
        } 
        else if (newCell2) {
            this.energy++
            let newX = newCell2[0]
            let newY = newCell2[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
            makabuycArr.push(new Makabuyc(newX,newY))
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0

        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
        }
    }
}