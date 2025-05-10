const socket = io();

window.onload = function(e) {
    socket.emit("personalPage");
}

socket.on("playerData", (data) => {
    // Todo
        document.body.append(JSON.stringify(data));

    // also send/show total cities guessed

    data.lobbies.forEach(x => createLobbyDiv(x));
});

const createLobbyDiv = (lobby) => {
    const lobbyContainer = document.getElementById("lobbyContainer");

    // Create card div
    const card = document.createElement('div');
    card.className = 'card';

    // Create card header
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';

    // Create header left and right sections
    const headerLeft = document.createElement('div');
    headerLeft.className = 'card-header-left';
    headerLeft.textContent = `User: [${lobby.LobbyID}] ${lobby.LobbyName}`;

    const headerRight = document.createElement('div');
    headerRight.className = 'card-header-right';
    headerRight.textContent = `Type: ${lobby.Lobbytype}`;

    cardHeader.appendChild(headerLeft);
    cardHeader.appendChild(headerRight);

    // Create card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Create body left and right sections
    const bodyLeft = document.createElement('div');
    bodyLeft.className = 'card-body-left';
    bodyLeft.textContent = `Players: ${lobby.Players}`;

    const bodyRight = document.createElement('div');
    bodyRight.className = 'card-body-right';
    bodyRight.textContent = `Cities guessed: ${lobby.CityGuessed}`;

    cardBody.appendChild(bodyLeft);
    cardBody.appendChild(bodyRight);

    // Create card footer
    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';

    // Join button
    const joinButton = document.createElement('button');
    joinButton.className = 'btn btn-primary';
    joinButton.innerHTML = "Join Lobby";
    joinButton.onclick = () => {
        location.href = `/lobby/${lobby.LobbyID}`;
    };

    // Leave button
    const leaveButton = document.createElement('button');
    leaveButton.className = 'btn btn-secondary';
    leaveButton.innerHTML = "Leave Lobby";
    leaveButton.onclick = () => {
        // Add functionality to leave the lobby
        alert(`Leaving lobby ${lobby.LobbyID}`);
    };

    // Append buttons to the footer
    cardFooter.appendChild(joinButton);
    cardFooter.appendChild(leaveButton);

    // Append elements to the card
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    // Append the card to the lobby container
    lobbyContainer.appendChild(card);
};
