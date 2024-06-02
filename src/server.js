const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const allCities = require("./citydata/cities1000.json");
const GuessStorage = require("./GuessStorage.js");
const guessStorage = new GuessStorage(allCities);

let userlist = [];
const randomUserNames = [
  "SunnyDaze",
  "PixelPirate",
  "RainbowNinja",
  "StarGazer",
  "MoonWalker",
  "CrimsonScribe",
  "LuckyLion",
  "ElectricJolt",
  "RubyRider",
  "SilverFox",
  "AquaWhisper",
  "GoldenSnitch",
  "MysticWanderer",
  "ShadowPulse",
  "CeruleanDream",
  "VelvetVoyager",
  "NeonNomad",
  "CopperCrafter",
  "JadeJester",
  "AmberAlchemy",
  "EmeraldEnigma",
  "ObsidianOracle",
  "PlatinumPioneer",
  "TopazTinkerer",
  "OnyxOpus",
  "CrystalCaster",
  "MarbleMaestro",
  "QuasarQuest",
  "GalacticGlider"
];

app.use(express.static("src/public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.username = randomUserNames.pop() ?? "Unnamed";
    userlist.push(socket.username);

    io.emit("guessedCities", guessStorage.guessedCities);
    io.emit("userlist", userlist);
    io.emit("stats", guessStorage.stats.format());

    socket.on('disconnect', () => {
        console.log('user disconnected');
        userlist = userlist.filter(u => u != socket.username);
        io.emit("userlist", userlist);
    });

    socket.on("guess", (guess) => {
        const guessResult = guessStorage.guess(guess.city, {"id": socket.id, "username": socket.username}, guess.country);
        if(guessResult.msg == "correct") {
            console.log(guessResult.city);
        }
        io.emit("guessResult", guessResult);
        io.emit("stats", guessStorage.stats.format());
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});
