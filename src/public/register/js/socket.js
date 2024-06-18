const socket = io();

window.onload = function(e) {
    document.getElementById("submitButton").onclick = () => {
        const username = document.getElementById("nameInput").value;
        const password = document.getElementById("passwordInput").value;

        if (username === "" || password === "") {
            alert("Please enter both a username and a password.");
            return;
        }

        const registerInfo = {
            username: username,
            password: password
         }

        socket.emit("register", registerInfo);
    }
    document.getElementById("ref").onclick = () =>{
        window.location.href = `/login`;
        console.log("HSHDHSD")
    }
}

socket.on("registerSuccess", () => {
    window.location.href = `/login`;
});

socket.on("registerFailed", (reason) => {
    alert("Register Failed: " + reason);
});
