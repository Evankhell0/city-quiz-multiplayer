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

        this.countriesGuessed = [];
        this.topCountriesGuessed1 = "";
        this.topCountriesGuessed2 = "";
        this.topCountriesGuessed3 = "";
    }

    update(guessedCities) {
        this.citiesGuessed = guessedCities.length;
        this.capitalsGuessed = guessedCities.filter(x => x.capital == true).length;
        this.citiesOver5Mguessed = guessedCities.filter(x => x.population >= 5000000).length;
        this.citiesOver1Mguessed = guessedCities.filter(x => x.population >= 1000000).length;
        this.citiesOver100kguessed = guessedCities.filter(x => x.population >= 100000).length;
        this.populationGuessed = guessedCities.reduce((a,b) => a + b.population, 0);
        this.populationGuessedPercent = `${this.populationGuessed.toLocaleString("en-US")} (${(this.populationGuessed / this.totalPopulation * 100).toFixed(2)}%)`
        this.countriesGuessed = guessedCities.reduce((arr, city) => {
            if(arr.some(x => x.country_code == city.country_code)) {
                arr.find(x => x.country_code == city.country_code).amount++;
            } else {
                arr.push({
                    "country_code": city.country_code,
                    "cou_name_en": city.cou_name_en,
                    "amount": 1
                })
            }
            return arr;
        }, []).sort((a, b) => b.amount - a.amount);
        this.topCountriesGuessed1 = this.countriesGuessed.length ? `${this.countriesGuessed[0].cou_name_en} (${this.countriesGuessed[0].amount})` : "None";
        this.topCountriesGuessed2 = this.countriesGuessed.length >= 2 ? `${this.countriesGuessed[1].cou_name_en} (${this.countriesGuessed[1].amount})` : "None";
        this.topCountriesGuessed3 = this.countriesGuessed.length >= 3 ? `${this.countriesGuessed[2].cou_name_en} (${this.countriesGuessed[2].amount})` : "None";
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
            this.#toObj("Total Population guessed", this.populationGuessedPercent),
            this.#toObj("Most Guessed Country", this.topCountriesGuessed1),
            this.#toObj("2nd most", this.topCountriesGuessed2),
            this.#toObj("3rd most", this.topCountriesGuessed3)
        ];
    }
}

module.exports = Stats;
