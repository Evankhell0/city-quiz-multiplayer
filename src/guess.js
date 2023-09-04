//console.log(allCities.filter(x => x.name == "Berlin" && x.country_code == "DE"))
class GuessStorage {
    constructor(cities) {
        this.allCities = cities;
        this.guessedCities = [];
    }

    // process guesses coming from players, return city object if correct, return false if not
    guess(cityName, user) {
        let matchingCities = this.allCities.filter(city => this.isMatching(cityName, city));
        matchingCities = matchingCities.sort((a, b) => b.population - a.population);
        if(matchingCities.length) {
            const largestMatchingCity = matchingCities[0];
            largestMatchingCity.name = this.toTitleCase(largestMatchingCity.name);
            if(this.guessedCities.some(city => this.isMatching(largestMatchingCity.name, city))) {
                return {
                    "msg": "duplicate",
                    "city": largestMatchingCity,
                    "guesser": user
                };
            }
            largestMatchingCity.id = this.guessedCities.length + 1;
            this.guessedCities.push(largestMatchingCity);
            return {
                "msg": "correct",
                "city" : largestMatchingCity,
                "guesser": user
            };
        }
        return {
            "msg": "incorrect",
            "city": null,
            "guesser": user
        };
    }

    isMatching(cityName, city) {
        cityName = cityName.toLowerCase();
        return cityName == city.name?.toLowerCase()
                || cityName == city.ascii_name?.toLowerCase()
                || city.alternate_names?.map(c => c.toLowerCase())?.includes(cityName);
    }

    toTitleCase(str) {
        return str.split(" ").map(x => x.slice(0,1).toUpperCase() + x.slice(1).toLowerCase()).join(" ");
    }
}

module.exports = { GuessStorage };
