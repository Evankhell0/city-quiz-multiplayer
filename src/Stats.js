class Stats {
    constructor(cities) {
        this.totalCities = cities.length;
        this.citiesGuessed = 0;
    }

    update(guessedCities) {
        this.citiesGuessed = guessedCities.length;
    }
}

module.exports = { Stats };
