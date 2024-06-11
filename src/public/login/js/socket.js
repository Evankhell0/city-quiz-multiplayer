const socket = io();

window.onload = function(e) {
    document.getElementById("submitButton").onclick = () => {
        const SAMPLE_LOGIN_INFO = {
           username: "niko123",
           password: "passwort656437896"
        }

        socket.emit("login", SAMPLE_LOGIN_INFO);
    }
}

socket.on("loginSuccess", () => {

})

socket.on("loginFailed", () => {

})
