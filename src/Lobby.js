const allCities = require("./citydata/cities1000.json");
const GuessStorage = require("./GuessStorage.js");

class Lobby {
    constructor(id = 0, name = "Unnamed Lobby", type = 0, players = []) {
        this.guessStorage = new GuessStorage(id, allCities);
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
        return this.guessStorage.guess(guess.city, {"id": socket.id, "username": socket.user.username}, guess.country);
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
