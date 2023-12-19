var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."))

app.get("/", function(req, res){
    res.redirect("index.html");
})

server.listen(3000, function(){
    console.log("Server is connected");
})

//matrix

function matrixGenerate(matLength, grass, grassEater, predator, virus, makabuyc, vorsord) {
    let matrix = []
    for (let i = 0; i < matLength; i++) {
        matrix.push([])
        for (let j = 0; j < matLength; j++) {
            matrix[i].push(0)
        }
    }
    for (let i = 0; i < grass; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grassEater; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < predator; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < virus; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let i = 0; i < makabuyc; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
    for (let i = 0; i < vorsord; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
        }
    }
    return matrix
}

matrix = matrixGenerate(30, 5, 5, 5, 5, 5, 5);

io.sockets.emit("send matrix", matrix);

//arrays

grassArr = [];
grassEaterArr = [];
predatorArr = [];
virusArr = [];
makabuycArr = [];
vorsordArr = [];

//modules

let Grass = require("./grass");
let GrassEater = require("./grassEater");
let Predator = require("./predator");
let Virus = require("./virus");
let Makabuyc = require("./makabuyc");
let Vorsord = require("./vorsord")

//object creator

function createObject(){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y)
                grassArr.push(grass)
            } 
            else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y)
                grassEaterArr.push(grassEater)
            }
            else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y)
                predatorArr.push(predator)
            }
            else if (matrix[y][x] == 4) {
                let virus = new Virus(x, y)
                virusArr.push(virus)
            }
            else if (matrix[y][x] == 5) {
                let makabuyc = new Makabuyc(x, y)
                makabuycArr.push(makabuyc)
            }
            else if (matrix[y][x] == 6) {
                let vorsord = new Vorsord(x, y)
                makabuycArr.push(vorsord)
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function game() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat()
    }
    for (let i = 0; i < makabuycArr.length; i++) {
        makabuycArr[i].eat()
    }
    for (let i = 0; i < vorsordArr.length; i++) {
        vorsordArr[i].eat()
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 300)

//add button

function AddGrass() {
    for(let i = 0; i < 5; i++) {
        let x = Math.floor(Math.random() * matrix.length)
        let y = Math.floor(Math.random() * matrix.length)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 1
            let grass = new Grass(x, y)
            grassArr.push(grass)
        }
    }

    console.log("Grass");
}

io.on("connection", function(socket){
    createObject()
    socket.on("Add Grass", AddGrass)
})

//statistics

var statistics = {
    
}

setInterval(function() {
    statistics.grass = grassArr.length
    statistics.grassEater = grassEaterArr.length
    statistics.predator = predatorArr.length
    statistics.virus = virusArr.length
    statistics.makabuyc = makabuycArr.length
    statistics.vorsord = vorsordArr.length
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(err){

    })
},1000)










//Grass (kanach) - bazmanum e
//GrassEater (dexin) - utum e miayn grass
//Makabuyc (moxraguyn) - utum grassEater-in ev virus, virus utelis mahanum e
//Predator (shaganakaguyn) - utum e makabuycin ev virus, virus uteluc darnum e makabuyc
//Virus (sev) = /
//Vorsord (kapuyt) = utum e predatorin ev grasseaterin, virus utelis energian pakasum e 5-ov