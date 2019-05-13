const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

/** Arrays */
const charNumArr = require("./data/charNumArr");
const { grassArr, grassEaterArr, hunterArr, bearArr } = require("./data/memberArrays");
const matrix = [];

/** Game members */
const Grass = require("./modules/Grass/Grass");
const GrassEater = require("./modules/GrassEater/GrassEater");
const Bear = require("./modules/Bear/Bear");
const Hunter = require("./modules/Hunter/Hunter");

app.use(express.static("./public"));
app.get("/", (req, res) => {
    res.redirect("index.html");
});

server.listen(8000, () => {
    console.log("Server listen to 8000 port");
});

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
matrixCreator(40, 40);

const game = () => {
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

    io.on("connection", socket => {
        socket.emit("send matrix", matrix);
    });
};

io.on("connection", socket => {
    setInterval(game, 10);
});