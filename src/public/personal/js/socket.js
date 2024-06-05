const socket = io();

window.onload = function(e) {
    socket.emit("personalPage");
}

socket.on("playerData", (data) => {
    // Todo
        document.body.append(JSON.stringify(data));
});
