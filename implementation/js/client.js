let guessedCities = [];

function processGuess(playerInput) {
    // access server.js guess method somehow
    let guessResult = guess(playerInput);
    if (guessResult == false) {
        // incorrect guess
        console.log("incorrect guess")
    } else {
        // correct guess
        if (checkIfGuessed(guessedCities, guessResult)) {
            // => check if already guessed
            console.log("already guessed");
        } else {
            // if not add to local storage and array
            guessResult.push(guessResult);
            console.log("correct guess");
        }
    }
}

function checkIfGuessed(cityArray, city) {
    for (let i = 0; i < cityArray.length; i++) {
        if (cityArray[i].id == city.id) {
            return true;
        }
    }
    return false;
}
