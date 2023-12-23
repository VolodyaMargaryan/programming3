var socket = io()
var side = 30;
var myChart;

function setup() {
    createCanvas(30 * side, 30 * side);
}

socket.on("Winter", function (weath) {
    weather = weath;
})
socket.on("Summer", function (weath) {
    weather = weath;
})
socket.on("Spring", function (weath) {
    weather = weath;
})
socket.on("Autumn", function (weath) {
    weather = weath;
})
var weather = "spring"

function DrawGame(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            
            if (matrix[y][x] == 1) {
                if (weather == "spring") {
                    fill("#468036");
                }
                else if (weather == "summer") {
                    fill("#79a83b");
                }
                else if (weather == "autumn") {
                    fill("#FFA785");
                }
                else if (weather == "winter") {
                    fill("#ffffff");
                }
            }    
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("brown")
            }
            else if (matrix[y][x] == 4) {
                fill("black")
            }
            else if (matrix[y][x] == 5) {
                fill("gray")
            }
            else if (matrix[y][x] == 6) {
                fill("blue")
            }  
            else {
                fill("#acacac");
            } 
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on("send matrix", DrawGame)

//buttons

function Spring() {
    socket.emit("spring");
}
function Summer() {
    socket.emit("summer");
}
function Autumn() {
    socket.emit("autumn");
}
function Winter() {
    socket.emit("winter");
}
function KillAll() {
    socket.emit("KillAll")
}
function AddGrass() {
    socket.emit("Add Grass")
}
function AddGrassEater() {
    socket.emit("Add GrassEater")
}
function AddPredator() {
    socket.emit("Add Predator")
}
function AddVirus() {
    socket.emit("Add Virus")
}
function AddMakabuyc() {
    socket.emit("Add Makabuyc")
}
function AddVorsord() {
    socket.emit("Add Vorsord")
}

//counts

socket.on("send datas", function(counts){
    
    document.getElementById("grassCount").innerHTML = counts.grass;
    document.getElementById("grassEaterCount").innerHTML = counts.grassEater;
    document.getElementById("predatorCount").innerHTML = counts.predator;
    document.getElementById("virusCount").innerHTML = counts.virus;
    document.getElementById("makabuycCount").innerHTML = counts.makabuyc;
    document.getElementById("vorsordCount").innerHTML = counts.vorsord;
    
    myChart.data.datasets[0].data = [counts.grass, counts.grassEater, counts.predator, counts.virus, counts.makabuyc, counts.vorsord];
    myChart.update();
})