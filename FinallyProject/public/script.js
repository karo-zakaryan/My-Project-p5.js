const socket = io();
const side = 13;

function setup() {
  noStroke();
  frameRate(8);

  socket.on("send matrix", drawExecuter);

  function drawExecuter(data) {
    const matrix = data.matrix;
    const mxLength = matrix.length;
    createCanvas(matrix[0].length * side, matrix.length * side);
    console.log(data);
    
    for (let y = 0; y < mxLength; y++) {
      for (let x = 0; x < mxLength; x++) {
        switch (matrix[y][x]) {
          case 0:
            fill("grey");
            rect(x * side, y * side, side, side);
            break;
          case 1:
            fill("green");
            rect(x * side, y * side, side, side);
            break;
          case 2:
            fill("yellow");
            rect(x * side, y * side, side, side);
            break;
          case 3:
            fill("black");
            rect(x * side, y * side, side, side);
            break;
          case 4:
            fill("red");
            rect(x * side, y * side, side, side);
            break;
          case 5:
            fill("white");
            rect(x * side, y * side, side, side);
            break;
          default:
            break;
        }
      }
    }
  }
}


