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
        const largestMatchingCity = matchingCities[0];
        if(matchingCities.length) {
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
        city.name = city.name.toLowerCase();
        city.ascii_name = city.ascii_name ? city.ascii_name.toLowerCase() : city.name;
        if(city.alternate_names) {
            city.alternate_names = city.alternate_names.map(c => c.toLowerCase())
        } else {
            city.alternate_names = [];
        }
        //city.alternate_names = city.alternate_names && city.alternate_names.length ? city.alternate_names.map(c => c.toLowerCase()) : city.name;
        return cityName == city.name || cityName == city.ascii_name || city.alternate_names.includes(cityName)
    }
}

module.exports = { GuessStorage };
