/**EX1 */
// new p5();

// let a;
// let rainbow = true;
// let rate = 1;

// function setup() {
//   createCanvas(500, 500);
//   background(0);
//   a = 0;
// }

// function draw() {
//   // background(220);
// }

// function mouseDragged() {
//   if (rainbow) {
//     if (a > 360) {
//       a = 0;
//     } else {
//       a += rate;
//     }
//   }
//   colorMode(HSL, 360);
//   noStroke();
//   fill(a, 200, 200);
//   ellipse(mouseX, mouseY, 25, 25);
// }

// function keyPressed() {
//   if (keyCode == 82) {
//     a = 0;
//     rainbow = false;
//   }
//   if (keyCode == 71) {
//     a = 125;
//     rainbow = false;
//   }
//   if (keyCode == 66) {
//     a = 200;
//     rainbow = false;
//   }
//   if (keyCode == 32) {
//     rainbow = true;
//     rate *= 2;
//   }
// }

// setup();

/**EX2 */
const main = () => {
  const socket = io();
  const chatDiv = document.getElementById("chat");
  const input = document.getElementById("message");
  const button = document.getElementById("submit");

  const handleSubmit = event => {
    const val = input.value;
    if (val != "") {
      socket.emit("send message", val);
    }
  };

  const handleMessage = msg => {
    const p = document.createElement("p");
    p.innerText = msg;
    chatDiv.appendChild(p);
    input.value = "";
  };

  button.onclick = handleSubmit;
  socket.on("display message", handleMessage);
};

window.onload = main;
