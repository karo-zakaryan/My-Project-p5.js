const charNumArr = require("./dummyData/charNumArr");
const Bear = require("./gameMembers/Bear/Bear");
const Grass = require("./gameMembers/Grass/Grass");
const GrassEater = require("./gameMembers/GrassEater/GrassEater");
const Hunter = require("./gameMembers/Hunter/Hunter");
const side = 13;
const matrix = [];
const holeArr = [];
const bearArr = [];
const grassArr = [];
const hunterArr = [];
const grassEaterArr = [];

const matrixCreator = (n, m) => {
  let limitBear = 0;
  let limitHunter = 0;
  let limitHole = 0;

  for (let y = 0; y < n; y++) {
    matrix[y] = [];
    for (let x = 0; x < m; x++) {
      const randNumForMatrix = 1;
      // const randNumForMatrix = random(charNumArr);

      if (randNumForMatrix == 1) {
        // const grass = new Grass(x, y, 1);

        matrix[y][x] = randNumForMatrix;
        // grassArr.push(grass);
      } else if (randNumForMatrix == 0) {
        matrix[y][x] = randNumForMatrix;
      } else if (randNumForMatrix == 2) {
        // const grassEater = new GrassEater(x, y, 1);

        matrix[y][x] = randNumForMatrix;
        // grassEaterArr.push(grassEater);
      } else if (randNumForMatrix == 3 && limitBear < 30) {
        // const bear = new Bear(x, y, 1);

        limitBear++;
        // bearArr.push(bear);
        matrix[y][x] = randNumForMatrix;
      } else if (randNumForMatrix == 4 && limitHunter < 3) {
        // const hunter = new Hunter(x, y, 1);

        limitHunter++;
        // hunterArr.push(hunter);
        matrix[y][x] = randNumForMatrix;
      } else if (randNumForMatrix == 5 && limitHole < 3) {
        limitHole++;
        matrix[y][x] = randNumForMatrix;
      } else {
        matrix[y][x] = 0;
      }
    }
  }
};

function setup() {
  console.log("====================================");
  console.log("setup");
  console.log("====================================");
  // noStroke();
  // frameRate(8);
  matrixCreator(40, 40);
  // createCanvas(matrix[0].length * side, matrix.length * side);
}

function draw() {
  const mxLength = matrix.length;
  console.log("====================================");
  console.log("draw");
  console.log("====================================");
  for (const i in hunterArr) {
    hunterArr[i].beat();
  }

  for (const i in grassArr) {
    grassArr[i].mul();
  }

  for (const i in grassEaterArr) {
    grassEaterArr[i].eat();
  }

  for (const i in bearArr) {
    bearArr[i].eat();
  }

  for (let y = 0; y < mxLength; y++) {
    for (let x = 0; x < mxLength; x++) {
      switch (matrix[y][x]) {
        case 0:
          // fill("grey");
          console.log(x * side, y * side, side, side);
          break;
        case 1:
          // fill("green");
          console.log(x * side, y * side, side, side);
          break;
        case 2:
          // fill("yellow");
          console.log(x * side, y * side, side, side);
          break;
        case 3:
          // fill("black");
          console.log(x * side, y * side, side, side);
          break;
        case 4:
          // fill("red");
          console.log(x * side, y * side, side, side);
          break;
        case 5:
          // fill("white");
          console.log(x * side, y * side, side, side);
          break;
        default:
          break;
      }
    }
  }
}

module.exports = { setup, draw };
