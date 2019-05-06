// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//     res.send("<h1>Hello World</h1>");
// });

// app.get("/name/:name", (req, res) => {
//     const name = req.params.name;

//     res.send(`<h1>Hello ${name}</h1>`)
// });

// app.get("/google/:search", (req, res) => {
//     const searchQuery = req.params.search;

//     res.redirect(404,`https://www.google.com/search?q=${searchQuery}`);
// });

// app.listen(3001, () => {
//     console.log("Server is running on port 3001");
// });

const fs = require('fs');

const dummyText = "Apple yep";

function main() {
    fs.writeFileSync("dummytext.txt", dummyText);
    const text = fs.readFileSync("dummytext.txt").toString();
    console.log(dummyText === text);
    console.log(text);

    fs.writeFileSync("undummytext.txt", text.replace("Apple", "Microsoft"));

}

main();