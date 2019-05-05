class Grass extends LivingCreature {
  mul = () => {
    const newCell = random(this.chooseCell(0));
    this.multiply++;

    if (this.multiply > 4 && newCell) {
      const newGrass = new Grass(newCell[0], newCell[1], this.index);

      grassArr.push(newGrass);
      matrix[newCell[1]][newCell[0]] = 1;
      this.multiply = 0;
    }
  };
}
