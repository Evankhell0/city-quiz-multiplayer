function processResult(result) {
    switch(result.msg) {
        case "incorrect":
            createLogElement(`[${result.guesser.username}] Wrong Guess :(`);
            break;
        case "duplicate":
            createLogElement(`[${result.guesser.username}] Already Guessed (${result.city.name})`);
            break;
        case "correct":
            createLogElement(`[${result.guesser.username}] Correct Guess! (${result.city.name})`);
            createCityElement(result.city);
            break;
        default:
            createLogElement(`[ERROR] unidentified result.msg: (${result.msg})`);
    }
}

function reloadCityList(newCities) {
    cities.innerHTML = "";
    newCities.forEach(c => createCityElement(c));
}

function reloadStats(newStats) {
    stats.innerHTML = "";
    newStats.forEach(s => createStatElement(s));
}

function createCityElement(city) {
    const item = document.createElement('li');
    item.textContent = `${city.id}. ${city.name}, ${city.cou_name_en} (${city.population?.toLocaleString("en-US")})`;
    cities.appendChild(item);
}

function createStatElement(stat) {
    const item = document.createElement('li');
    item.textContent = `${stat.name}: ${stat.current}`;
    if(stat.total != null) {
        item.textContent += ` / ${stat.total}`;
    }
    stats.appendChild(item);
}

function createLogElement(message) {
    const item = document.createElement('li');
    item.textContent = message;
    log.appendChild(item);
}
