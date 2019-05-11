const main = () => {
    const socket = io();
    const chatDiv = document.getElementById('chat');
    const input = document.getElementById('message');
    const button = document.getElementById('submit');

    const handleSubmit = event => {
        const val = input.value;
        if (val != "") {
            socket.emit("send message", val);
        }
    };

    const handleMessage = msg => {
        const p = document.createElement('p');
        p.innerText = msg;
        chatDiv.appendChild(p);
        input.value = "";
    };

    button.onclick = handleSubmit;
    socket.on('display message', handleMessage);
}

window.onload = main;

// function setup() {

// }

// function mouseClicked() {
//     console.log(mouseX, mouseY);
// }

// function preload() {
//     console.log("Window is loaded");
// }

// function mousePressed() {
//     console.log(mouseX, mouseY);
// }

// function keyPressed() {
//     console.log(key);
// }

// setup();

