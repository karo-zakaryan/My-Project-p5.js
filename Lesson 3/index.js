const fs = require("fs");
const testObj = require("./fstests");
const { draw, setup } = require("./script");

/**
 * Ex. 15
 */
setup();
draw();

/**
 * Ex. 25
 */
const main = () => {
  const jsonObj = JSON.stringify(testObj);

  fs.writeFileSync("obj.json", jsonObj);
};

main();
