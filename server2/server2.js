const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let guess = require("./guess.js").guess;

let guessedCities = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/singleplayer.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit("newConnection", guessedCities);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("guess", (cityGuess) => {
        io.emit("guessResult", guess(cityGuess));
    });

    socket.on("correctGuess", (correctCity) => {
        guessedCities.push(correctCity);
        console.log(guessedCities);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
