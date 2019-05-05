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
      const randNumForMatrix = random(charNumArr);

      if (randNumForMatrix == 1) {
        const grass = new Grass(x, y, 1);

        matrix[y][x] = randNumForMatrix;
        grassArr.push(grass);
      } else if (randNumForMatrix == 0) {
        matrix[y][x] = randNumForMatrix;
      } else if (randNumForMatrix == 2) {
        const grassEater = new GrassEater(x, y, 1);

        matrix[y][x] = randNumForMatrix;
        grassEaterArr.push(grassEater);
      } else if (randNumForMatrix == 3 && limitBear < 30) {
        const bear = new Bear(x, y, 1);

        limitBear++;
        bearArr.push(bear);
        matrix[y][x] = randNumForMatrix;
      } else if (randNumForMatrix == 4 && limitHunter < 3) {
        const hunter = new Hunter(x, y, 1);

        limitHunter++;
        hunterArr.push(hunter);
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
  noStroke();
  frameRate(8);
  matrixCreator(40, 40);
  createCanvas(matrix[0].length * side, matrix.length * side);
}

function draw() {
  const mxLength = matrix.length;

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
