var socket = io();

var form = document.getElementById("form");
var input = document.getElementById("Eingabe");
var select = document.getElementById("countrySelection");
var cities = document.getElementById('cities');
var log = document.getElementById('log');
var userlist = document.getElementById('userlist');

form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit("guess", input.value);
        input.value = "";
    }
});

socket.on("guessResult", function(result) {
    processResult(result);
});

socket.on("guessedCities", function(array) {
    guessedCities = array;
    resetCityList(guessedCities);
});

socket.on("userlist", function(users) {
    userlist.innerHTML = "";
    users.forEach(u => {
        const item = document.createElement('li');
        item.textContent = u;
        userlist.appendChild(item);
    })
});
