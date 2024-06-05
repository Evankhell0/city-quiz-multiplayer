const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const Data = require("./Data.js");

app.use(express.static("src/public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/game/index.html');
});

app.get('/lobby', (req, res) => {
    res.sendFile(__dirname + '/public/personal/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // replace this with login logic
        socket.user = Data.users[0];
        socket.user.online = true;

    socket.on('joinLobby', (id) => {
        const lobby = Data.getLobby(id);

        // validate if user has access to lobby here
        if(!lobby.hasAccess(socket.user.id)) {
            // emit that no access
            console.log("no access");
            //return;
        }

        console.log(socket.user.username + ' joined lobby ' + id);

        socket.emit("guessedCities", lobby.getGuessedCities());
        socket.emit("userlist", lobby.getUsers());
        socket.emit("stats", lobby.getStats());

        socket.on('disconnect', () => {
            console.log('user disconnected');
            socket.user.online = false;
            io.emit("userlist", lobby.getUsers());
        });

        socket.on("guess", (guess) => {
            const guessResult = lobby.makeGuess(guess, socket);
            if(guessResult.msg == "correct") {
                console.log(guessResult.city);
            }
            io.emit("guessResult", guessResult);
            io.emit("stats", lobby.getStats());
        });
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});
