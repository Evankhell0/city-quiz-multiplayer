const allCities = require("./citydata/cities1000.json");
const GuessStorage = require("./GuessStorage.js");

class Lobby {
    constructor(id = 0, name = "Nikola's Lobby", players = []) {
        this.guessStorage = new GuessStorage(allCities);
        this.id = id;
        this.name = name;
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
}

module.exports = Lobby;
