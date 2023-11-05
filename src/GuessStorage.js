const fs = require('fs');
const Stats = require("./Stats.js").Stats;

class GuessStorage {
    constructor(cities) {
        this.allCities = cities;
        const guessData = fs.readFileSync('./src/citydata/guessData.json');
        this.guessedCities = guessData.size ? JSON.parse(guessData) : [];
        this.stats = new Stats(cities);
    }

    // process guesses coming from players, returns object{msg, city, guesser}
    guess(cityName, user) {
        let matchingCities = this.allCities.filter(city => this.#isMatching(cityName, city));
        matchingCities = matchingCities.sort((a, b) => b.population - a.population);

        if(!matchingCities.length) {
            return this.#createGuessObj("incorrect", null, user);
        }

        const largestMatchingCity = matchingCities[0];
        largestMatchingCity.name = this.#toTitleCase(largestMatchingCity.name);

        if(this.guessedCities.some(city => this.#isMatching(largestMatchingCity.name, city))) {
            return this.#createGuessObj("duplicate", largestMatchingCity, user);
        }

        largestMatchingCity.id = this.guessedCities.length + 1;
        this.#addCity(largestMatchingCity);
        return this.#createGuessObj("correct", largestMatchingCity, user);
    }

    #createGuessObj(result, city, user) {
        return {
            msg: result,
            city: city,
            guesser: user
        };
    }

    #addCity(city) {
        this.guessedCities.push(city);
        this.stats.update(this.guessedCities);
        fs.writeFile("./src/citydata/guessData.json", JSON.stringify(this.guessedCities), (err) => {
            if(err) return console.log(err);
        });
    }

    #isMatching(cityName, city) {
        cityName = cityName.toLowerCase();
        return cityName == city.name?.toLowerCase()
                || cityName == city.ascii_name?.toLowerCase()
                || city.alternate_names?.map(c => c.toLowerCase())?.includes(cityName);
    }

    #toTitleCase(str) {
        return str.split(" ").map(x => x.slice(0,1).toUpperCase() + x.slice(1).toLowerCase()).join(" ");
    }
}

module.exports = { GuessStorage };
