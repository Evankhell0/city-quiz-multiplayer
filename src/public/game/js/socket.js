const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("Eingabe");
const select = document.getElementById("countrySelection");
const cities = document.getElementById('cities');
const stats = document.getElementById('stats');
const log = document.getElementById('log');
const userlist = document.getElementById('userlist');

window.onload = function(e) {
    const lobbyId = window.location.pathname.split("/").pop();
    socket.emit("joinLobby", lobbyId);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(input.value) {
        socket.emit("guess", {
            "city": input.value,
            "country": getCountryCode(select.value)
        });
        input.value = "";
    }
});

socket.on("guessResult", (result) => {
    processResult(result);
});

socket.on("guessedCities", (cities) => {
    reloadCityList(cities);
});

socket.on("stats", (stats) => {
    reloadStats(stats);
});

socket.on("userlist", (users) => {
    userlist.innerHTML = "";
    users.forEach(u => {
        const item = document.createElement('li');
        item.textContent = `${u.username} ${u.online ? "(Online)" : ""}`;
        userlist.appendChild(item);
    })
});
