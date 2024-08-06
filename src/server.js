const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const Data = require("./Data.js");
const DB = require("./db.js");

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.redirect('/lobbies');
});

app.get('/lobby/:id([0-9]+)', (req, res) => {
    res.sendFile(__dirname + '/public/game/index.html');
});

app.get('/lobbies', (req, res) => {
    res.sendFile(__dirname + '/public/personal/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login/index.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('login', (data) => {
        DB.validateLogin(data.username, data.password).then(res => {
            if(res) {
                socket.emit("loginSuccess");
            } else {
                socket.emit("loginFailed", "Invalid Password");
            }
        }).catch((err) => {
            socket.emit("loginFailed", err.message);
        })
    });

    socket.on('register', (data) => {
        DB.registerUser(data.username, data.password).then((res) => {
            socket.emit("registerSuccess");
        }).catch((err) => {
            socket.emit("registerFailed", "That Username is already taken");
        });
    });

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

    socket.on('personalPage', () => {
        socket.emit("playerData", socket.user);
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});
