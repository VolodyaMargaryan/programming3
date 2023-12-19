let LivingCreature = require('./LivingCreature')

module.exports = class Makabuyc extends LivingCreature{
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
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
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
            matrix[newY][newX] = 5
            let newMak = new Makabuyc(newX, newY)
            makabuycArr.push(newMak)
        }
    }
    
    move() {
        this.energy--
        let emptyCells = this.chooseCell(0)
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.energy >= 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if(this.energy <= 0){
                this.die()
            }
        }
    }
    
    eat() {
        let emptyCells1 = this.chooseCell(2)
        let newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        let emptyCells2 = this.chooseCell(4)
        let newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        if (newCell1) {
            this.energy++
            let newX = newCell1[0]
            let newY = newCell1[1]
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                }
            }
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 5) {
                this.mul()
            }
        } 
        else if (newCell2) {
            this.die()
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0

        for (var i in makabuycArr) {
            if (this.x == makabuycArr[i].x && this.y == makabuycArr[i].y) {
                makabuycArr.splice(i, 1);
            }
        }
    }
}