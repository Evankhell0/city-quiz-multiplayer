const socket = io();
window.onload = function(e) {
    document.getElementById("submitButton").onclick = () => {
        


        const username = document.getElementById("nameInput").value;
        const password = document.getElementById("passwordInput").value;

        if (username === "" || password === "") {
            alert("Please enter both a username and a password.");
            return;
        }

        const loginInfo = {
            username: username,
            password: password
         }

        socket.emit("login", loginInfo);
    }
    document.getElementById("ref").onclick = () =>{
        window.location.href = `/register`;
    }
}

socket.on("loginSuccess", () => {
    window.location.href = `/lobbies`;
});

socket.on("loginFailed", (reason) => {
    alert("Login Failed:", reason);
});
