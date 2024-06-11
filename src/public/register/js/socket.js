const socket = io();

window.onload = function(e) {
    document.getElementById("submitButton").onclick = () => {
        const SAMPLE_REGISTER_INFO = {
           username: "niko123",
           password: "passwort656437896"
        }

        socket.emit("register", SAMPLE_REGISTER_INFO);
    }
}

socket.on("registerSuccess", () => {

});

socket.on("registerFailed", () => {
    // could fail if username is already taken etc.
});
