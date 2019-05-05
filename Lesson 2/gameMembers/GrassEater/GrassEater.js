class GrassEater {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.energy = 0;
    this.multiply = 0;
    this.index = index;
  }

  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1]
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates();
    let found = [];

    for (let i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }

  move() {
    this.multiply++;
    let newCell = random(this.chooseCell(0));

    if (newCell) {
      matrix[newCell[1]][newCell[0]] = 2;
      matrix[this.y][this.x] = 0;

      this.multiply = 0;
      this.x = newCell[0];
      this.y = newCell[1];
      this.energy--;
    }
  }

  eat() {
    this.multiply++;
    let grassCell = random(this.chooseCell(1));

    if (grassCell) {
      matrix[grassCell[1]][grassCell[0]] = 2;
      matrix[this.y][this.x] = 0;

      for (let i in grassArr) {
        if (grassArr[i].x == grassCell[0] && grassArr[i].y == grassCell[1]) {
          grassArr.splice(i, 1);
          break;
        }
      }
      this.x = grassCell[0];
      this.y = grassCell[1];

      this.multiply = 0;
      this.energy++;
    } else {
      this.move();
    }

    if (this.energy >= 20) {
      this.mul();
      this.energy = 0;
    } else if (this.energy <= -10) {
      this.die();
    }
  }

  mul() {
    let newCell = random(this.chooseCell(0));

    if (newCell) {
      matrix[newCell[1]][newCell[0]] = 2;
      let newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
      grassEaterArr.push(newGrassEater);
    }
  }

  die() {
    for (let i in grassEaterArr) {
      if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
        matrix[this.y][this.x] = 0;
        grassEaterArr.splice(i, 1);

        break;
      }
    }
  }
}
