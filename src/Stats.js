class Stats {
    constructor(cities) {
        this.totalCities = cities.length;
        this.citiesGuessed = 0;

        this.totalCapitals = cities.filter(x => x.capital == true).length;
        this.capitalsGuessed = 0;

        this.citiesOver5M = cities.filter(x => x.population >= 5000000).length;
        this.citiesOver5Mguessed = 0;

        this.citiesOver1M = cities.filter(x => x.population >= 1000000).length;
        this.citiesOver1Mguessed = 0;

        this.citiesOver100k = cities.filter(x => x.population >= 100000).length;
        this.citiesOver100kguessed = 0;

        this.totalPopulation = cities.reduce((a,b) => a + b.population, 0);
        this.populationGuessed = 0;
        this.populationGuessedPercent = 0;
    }

    update(guessedCities) {
        this.citiesGuessed = guessedCities.length;
        this.capitalsGuessed = guessedCities.filter(x => x.capital == true).length;
        this.citiesOver1Mguessed = guessedCities.filter(x => x.population >= 5000000).length;
        this.citiesOver1Mguessed = guessedCities.filter(x => x.population >= 1000000).length;
        this.citiesOver1Mguessed = guessedCities.filter(x => x.population >= 100000).length;
        this.populationGuessed = guessedCities.reduce((a,b) => a + b.population, 0);
        this.populationGuessedPercent = `${this.populationGuessed.toLocaleString("en-US")} (${(this.populationGuessed / this.totalPopulation * 100).toFixed(2)}%)`
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
            this.#toObj("Cities over 5M Population", this.citiesOver5Mguessed, this.citiesOver5M),
            this.#toObj("Cities over 1M Population", this.citiesOver1Mguessed, this.citiesOver1M),
            this.#toObj("Cities over 100k Population", this.citiesOver100kguessed, this.citiesOver100k),
            this.#toObj("Total Population guessed", this.populationGuessedPercent)
        ];
    }
}

module.exports = { Stats };
