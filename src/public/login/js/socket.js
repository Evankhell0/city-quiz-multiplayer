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

        socket.emit("register", loginInfo);
    }
    document.getElementById("ref").onclick = () =>{
        window.location.href = `/register`;
    }
}

socket.on("registerSuccess", () => {
    window.location.href = `/lobbies`;
});

socket.on("registerFailed", (reason) => {
    alert("Register Failed:", reason);
});
