const Stats = require("./Stats.js");

class GuessStorage {
    constructor(cities, guessedCities) {
        this.allCities = cities;
        this.guessedCities = guessedCities;
        this.stats = new Stats(cities);
        this.stats.update(this.guessedCities);
    }

    // process guesses coming from players, returns object{msg, city, guesser}
    guess(cityName, user, country = "Any") {
        let matchingCities = this.allCities.filter(city => this.#isMatching(cityName, city, country));
        matchingCities = matchingCities.sort((a, b) => b.population - a.population);

        if(!matchingCities.length) {
            return this.#createGuessObj("incorrect", null, user);
        }

        const largestMatchingCity = matchingCities[0];
        largestMatchingCity.name = this.#toTitleCase(largestMatchingCity.name);

        if(this.guessedCities.some(city => this.#isMatching(largestMatchingCity.name, city, country))) {
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

    #isMatching(cityName, city, country = "Any") {
        cityName = cityName.toLowerCase();
        return (cityName == city.name?.toLowerCase()
                || cityName == city.ascii_name?.toLowerCase()
                || city.alternate_names?.map(c => c.toLowerCase())?.includes(cityName))
                && (city.country_code == country || country == "Any");
    }

    #toTitleCase(str) {
        return str.split(" ").map(x => x.slice(0,1).toUpperCase() + x.slice(1).toLowerCase()).join(" ");
    }
}

module.exports = GuessStorage;
