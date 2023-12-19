let LivingCreature = require('./LivingCreature')

module.exports = class Virus extends LivingCreature{
    constructor(x, y) {
        super(x,y)
    }
}
