const allCities = require("./citydata/cities1000.json");
const GuessStorage = require("./GuessStorage.js");
const fs = require('fs');

class Lobby {
    constructor(id = 0, name = "Nikola's Lobby", type = 0, players = []) {
        // Temp
            let guessedCities = [];
            if(id == 727) {
                const guessData = fs.readFileSync('./src/citydata/guessData.json');
                guessedCities = guessData ? JSON.parse(guessData) : [];
            }

        this.guessStorage = new GuessStorage(allCities, guessedCities);
        this.id = id;
        this.name = name;
        this.type = type;
        this.players = players;
    }

    getGuessedCities() {
        return this.guessStorage.guessedCities;
    }

    getStats() {
        return this.guessStorage.stats.format();
    }

    makeGuess(guess, socket) {
        return this.guessStorage.guess(guess.city, {"id": socket.id, "username": socket.username}, guess.country)
    }

    addPlayer(user) {
        this.players.push(user);
    }

    getUsers() {
        return this.players;
    }

    hasAccess(id) {
        return this.players.some(x => x.id == id);
    }
}

module.exports = Lobby;
