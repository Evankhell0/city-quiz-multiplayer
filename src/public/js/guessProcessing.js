function processResult(result) {
    switch(result.msg) {
        case "incorrect":
            createLogElement(`[${result.guesser.username}] Wrong Guess :(`, 'text-danger');
            break;
        case "duplicate":
            createLogElement(`[${result.guesser.username}] Already Guessed (${result.city.name})`, 'text-warning');
            break;
        case "correct":
            createLogElement(`[${result.guesser.username}] Correct Guess! (${result.city.name})`, 'text-success');
            createCityElement(result.city);
            if(result.guesser.id == socket.id)
                playSuccess();
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
    if(city.capital == true) {
        item.textContent += " ★";
    }
    cities.insertBefore(item, cities.childNodes[0]);
    addCircle(city.coordinates.lat, city.coordinates.lon, city.population);
}

function createStatElement(stat) {
    const item = document.createElement('li');
    item.textContent = `${stat.name}: ${stat.current}`;
    if(stat.total != null) {
        item.textContent += ` / ${stat.total}`;
    }
    stats.appendChild(item);
}

function createLogElement(message, ...cssClasses) {
    const item = document.createElement('li');
    item.textContent = message;
    if (cssClasses && cssClasses.length > 0) {
        item.classList.add(...cssClasses);
    }
    log.insertBefore(item, log.childNodes[0]);
}

const playSuccess = () => {
    const context = new window.AudioContext();
    const successNoise = context.createOscillator();
    successNoise.frequency = "600";
    successNoise.type = "sine";
    successNoise.frequency.exponentialRampToValueAtTime(
        800,
        context.currentTime + 0.05
    );
    successNoise.frequency.exponentialRampToValueAtTime(
        1000,
        context.currentTime + 0.15
    );

    successGain = context.createGain();
    successGain.gain.exponentialRampToValueAtTime(
        0.01,
        context.currentTime + 0.3
    );

    successFilter = context.createBiquadFilter("bandpass");
    successFilter.Q = 0.01;

    successNoise
        .connect(successFilter)
        .connect(successGain)
        .connect(context.destination);
    successNoise.start();
    successNoise.stop(context.currentTime + 0.2);
}
