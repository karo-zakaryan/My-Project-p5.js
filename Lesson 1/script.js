"use strict";

let matrix = [];
let grassArr = [];
let grassEaterArr = [];
let bearArr = [];
let hunterArr = [];
let holeArr = [];
let side = 13;

function setup() {
  matrixCreator(40, 40);

  noStroke();
  frameRate(8);
  createCanvas(matrix[0].length * side, matrix.length * side);
  background("grey");
}

function draw() {
  for (let i in hunterArr) {
    hunterArr[i].beat();
  }

  for (let i in grassArr) {
    grassArr[i].mul();
  }

  for (let i in grassEaterArr) {
    grassEaterArr[i].eat();
  }

  for (let i in bearArr) {
    bearArr[i].eat();
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix.length; x++) {
      if (matrix[y][x] == 0) {
        fill("grey");
        rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 1) {
        fill("green");
        rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 2) {
        fill("yellow");
        rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 3) {
        fill("black");
        rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 4) {
        fill("red");
        rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 5) {
        fill("white");
        rect(x * side, y * side, side, side);
      }
    }
  }
}

function matrixCreator(n, m) {
  let limitBear = 0;
  let limitHunter = 0;
  let limitHole = 0;
  let charNumArr = [
    4,
    0,
    1,
    5,
    3,
    1,
    2,
    0,
    0,
    4,
    0,
    1,
    0,
    0,
    0,
    0,
    2,
    3,
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    4,
    2,
    1,
    0,
    1,
    1,
    1,
    0,
    1,
    0,
    2,
    3,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    ,
    0,
    1,
    0
  ];

  for (let y = 0; y < n; y++) {
    matrix[y] = [];
    for (let x = 0; x < m; x++) {
      let randNumForMatrix = random(charNumArr);
      if (randNumForMatrix == 1) {
        matrix[y][x] = randNumForMatrix;
        grassArr.push(new Grass(x, y, 1));
      } else if (randNumForMatrix == 0) {
        matrix[y][x] = randNumForMatrix;
      } else if (randNumForMatrix == 2) {
        matrix[y][x] = randNumForMatrix;
        grassEaterArr.push(new GrassEater(x, y, 1));
      } else if (randNumForMatrix == 3 && limitBear < 30) {
        limitBear++;
        bearArr.push(new Bear(x, y, 1));
        matrix[y][x] = randNumForMatrix;
      } else if (randNumForMatrix == 4 && limitHunter < 3) {
        limitHunter++;
        hunterArr.push(new Hunter(x, y, 1));
        matrix[y][x] = randNumForMatrix;
      } else if (randNumForMatrix == 5 && limitHole < 3) {
        limitHole++;
        matrix[y][x] = randNumForMatrix;
      } else {
        matrix[y][x] = 0;
      }
    }
  }
}
