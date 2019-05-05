class Hunter {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
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

      if (matrix[y][x] == 1) {
        matrix[this.y][this.x] = this.lastCellIndex;
        matrix[y][x] = 4;
        this.x = x;
        this.y = y;
        this.lastCellIndex = 1;
      } else if (matrix[y][x] == 0) {
        matrix[this.y][this.x] = this.lastCellIndex;
        matrix[y][x] = 4;
        this.x = x;
        this.y = y;
        this.lastCellIndex = 0;
      } else if (matrix[y][x] == 5) {
        this.die();
      }
    }
  }

  beat() {
    let newCellHerbivore = random(this.chooseCell(2));
    let newCellBear = random(this.chooseCell(3));

    if (newCellHerbivore) {
      matrix[newCellHerbivore[1]][newCellHerbivore[0]] = 4;
      matrix[this.y][this.x] = 0;

      for (let i in grassEaterArr) {
        if (
          grassEaterArr[i].x == newCellHerbivore[0] &&
          grassEaterArr[i].y == newCellHerbivore[1]
        ) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
      this.x = newCellHerbivore[0];
      this.y = newCellHerbivore[1];

      this.multiply = 0;
    } else if (newCellBear) {
      matrix[newCellBear[1]][newCellBear[0]] = 4;
      matrix[this.y][this.x] = 0;

      for (let i in bearArr) {
        if (bearArr[i].x == newCellBear[0] && bearArr[i].y == newCellBear[1]) {
          bearArr.splice(i, 1);
          break;
        }
      }
      this.x = newCellBear[0];
      this.y = newCellBear[1];

      this.multiply = 0;
    } else {
      this.move();
    }
  }

  die() {
    for (let i in hunterArr) {
      if (hunterArr[i].x == this.x && hunterArr[i].y == this.y) {
        if (hunterArr.length === 1) {
          hunterArr.splice(i, 1);
          matrix[this.y][this.x] = 0;
          break;
        } else {
          hunterArr.splice(i, 1);
          matrix[this.y][this.x] = 0;
          break;
        }
      }
    }
  }
}
