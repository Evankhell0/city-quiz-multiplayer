// responsible for loading the list of all cities and processing guesses from the player
const LineByLineReader = require("line-by-line");
const lr = new LineByLineReader("citydata/cities15000.txt");

let allCities = [];
let i = 0;

lr.on("error", function(err) {
    console.log("LineByLineReader Error:\n" + err);
});

lr.on("line", function(line) {
    // split txt file along commas and \t
    let split = line.split(/,|\t/);
    // filter empty strings from result
    split = split.filter(e => e);
    // convert array result to a city object and push to array
    let city = convertToCity(split);
    allCities.push(city);

    // every 10k lines write progress in console
    if (++i % 10000 == 0) {
        console.log(i);
    }
});

lr.on("end", function() {
    console.log("done");
    console.log(guess("yerevan"));
});

function convertToCity(arr) {
    let names = arr.slice(1, arr.length - 10);
    let city = new City(arr[0], arr[arr.length - 9], arr[arr.length - 4], arr[arr.length - 10], arr[arr.length - 9], names);
    return city;
}

// process guesses coming from players, return city object if correct, return false if not
function guess(cityName) {
    for (var i = 0; i < allCities.length; i++) {
        if (allCities[i].checkName(cityName) == true) {
            return allCities[i];
        }
    }
    return false;
}

class City {
    constructor(id, ccode, population, latitude, longitude, names, guessed) {
        this.id = id;
        this.ccode = ccode;
        this.population = population;
        this.latitude = latitude;
        this.longitude = longitude;
        this.names = names;
    }

    checkName(name) {
        if (this.names.includes(name)) {
            return true;
        }
        return false;
    }
}
