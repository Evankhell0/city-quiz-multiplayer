const socket = io();

window.onload = function(e) {
    socket.emit("personalPage");
}

socket.on("playerData", (data) => {
    // Todo
        document.body.append(JSON.stringify(data));

    // also send/show total cities guessed
    const SAMPLE_LOBBIES = [
        {id: 534, name: "Nikola's Lobby", type: 0},
        {id: 727, name: "Evankhell's Lobby", type: 0},
        {id: 999, name: "Cityquizzing", type: 1}
    ];

    data.lobbies.forEach(x => createLobbyDiv(x));
});

const createLobbyDiv = (lobby) => {
    const lobbyContainer = document.getElementById("lobbyContainer");
    const item = document.createElement('div');

    const span = document.createElement('span');
    span.textContent = `[${lobby.LobbyID}] ${lobby.LobbyName} (${lobby.Lobbytype})`;

    const button = document.createElement('button');
    button.innerHTML = "Join Lobby";
    button.onclick = () => {
        location.href = `/lobby/${lobby.LobbyID}`;
    }

    item.appendChild(span);
    item.appendChild(button);
    lobbyContainer.appendChild(item);
}
