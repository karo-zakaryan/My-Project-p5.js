class Bear {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.energy = 0;
    this.index = index;
    this.lastCellIndex = 0;
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
      [this.x + 1, this.y + 1],
      [this.x - 2, this.y - 2],
      [this.x - 1, this.y - 2],
      [this.x, this.y - 2],
      [this.x + 1, this.y - 2],
      [this.x + 2, this.y - 2],
      [this.x + 2, this.y - 1],
      [this.x + 2, this.y],
      [this.x + 2, this.y + 1],
      [this.x + 2, this.y + 2],
      [this.x + 1, this.y + 2],
      [this.x, this.y + 2],
      [this.x - 1, this.y + 2],
      [this.x - 2, this.y + 2],
      [this.x - 1, this.y + 1],
      [this.x - 2, this.y],
      [this.x - 2, this.y - 1]
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
    let newCellEmpty = this.chooseCell(0);
    let newCellGrass = this.chooseCell(1);
    let hole = this.chooseCell(5);
    let myArr = [...hole, ...newCellEmpty, ...newCellGrass];
    let cell = random(myArr);

    if (cell) {
      let x = cell[0];
      let y = cell[1];

      if (matrix[y][x] == 0) {
        matrix[this.y][this.x] = this.lastCellIndex;
        matrix[y][x] = 3;
        this.x = x;
        this.y = y;
        this.lastCellIndex = 0;
        this.energy--;
      } else if (matrix[y][x] == 1) {
        matrix[this.y][this.x] = this.lastCellIndex;
        matrix[y][x] = 3;
        this.x = x;
        this.y = y;
        this.lastCellIndex = 1;
      } else if (matrix[y][x] == 5) {
        this.die();
      }
    }
  }

  eat() {
    let grassEaterCell = random(this.chooseCell(2));

    if (grassEaterCell) {
      matrix[grassEaterCell[1]][grassEaterCell[0]] = 3;
      matrix[this.y][this.x] = 0;

      for (let i in grassEaterArr) {
        if (
          grassEaterArr[i].x == grassEaterCell[0] &&
          grassEaterArr[i].y == grassEaterCell[1]
        ) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
      this.x = grassEaterCell[0];
      this.y = grassEaterCell[1];
      this.energy++;
    } else {
      this.energy--;
      this.move();
    }

    if (this.energy <= -60) {
      this.die();
    }
  }

  die() {
    for (let i in bearArr) {
      if (bearArr[i].x == this.x && bearArr[i].y == this.y) {
        matrix[this.y][this.x] = 0;
        bearArr.splice(i, 1);

        break;
      }
    }
  }
}
