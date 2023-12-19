var socket = io()
var side = 25;

function setup() {
    createCanvas(30 * side, 30 * side);
}

function DrawGame(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            
            if (matrix[y][x] == 1) {
                fill("green");
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
               else  {
                fill("#acacac");
            } 
            rect(x * side, y * side, side, side);
        }
    }
}

setInterval(function() {
    socket.on("send matrix", DrawGame)
}, 300)


//buttons

function AddGrass() {
    socket.emit("Add Grass")
}