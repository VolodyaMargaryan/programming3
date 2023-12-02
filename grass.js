class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y)
    }

    mul() {
        this.multiply++
        let emptyCelss = this.chooseCell(0)
        let newCell = emptyCelss[Math.floor(Math.random() * emptyCelss.length)]

        if (this.multiply >= 8 && newCell) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 1

            let newGr = new Grass(newX, newY)
            grassArr.push(newGr)

            this.multiply = 0
        }
    }
}