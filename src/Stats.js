class Stats {
    constructor(cities) {
        this.totalCities = cities.length;
        this.citiesGuessed = 0;
        this.totalCapitals = cities.filter(x => x.capital == true).length;
        this.capitalsGuessed = 0;

        // no logic for values below yet
        this.totalGuesses = 0;
    }

    update(guessedCities) {
        this.citiesGuessed = guessedCities.length;
        this.capitalsGuessed = guessedCities.filter(x => x.capital == true).length;
    }

    #toObj(name, current, total = null) {
        return {
            name: name,
            current: current,
            total: total
        };
    }

    // returns array which is send to client
    format() {
        return [
            this.#toObj("Cities Guessed", this.citiesGuessed, this.totalCities),
            this.#toObj("Capitals Guessed", this.capitalsGuessed, this.totalCapitals),
            this.#toObj("Total Guesses", this.totalGuesses)
        ];
    }
}

module.exports = { Stats };
