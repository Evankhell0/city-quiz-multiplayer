let guessedCities = [];

function processResult(result) {
    switch(result.msg) {
        case "incorrect":
            createLogElement(`[${result.guesser.username}] Wrong Guess :(`);
            break;
        case "duplicate":
            createLogElement(`[${result.guesser.username}] Already Guessed (${result.city.name})`);
            break;
        case "correct":
            guessedCities.push(result.city);
            createLogElement(`[${result.guesser.username}] Correct Guess! (${result.city.name})`);
            createCityElement(result.city);
            break;
        default:
            createLogElement(`[ERROR] unidentified result.msg: (${result.msg})`);
    }
}

function resetCityList(newCities) {
    cities.innerHTML = "";
    newCities.forEach(c => createCityElement(c));
}

function createCityElement(city) {
    const item = document.createElement('li');
    item.textContent = `${city.id}. ${city.name} (${city.population.toLocaleString("en-US")})`;
    cities.appendChild(item);
}

function createLogElement(message) {
    const item = document.createElement('li');
    item.textContent = message;
    log.appendChild(item);
}
