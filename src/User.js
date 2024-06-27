const DB = require("./db.js");

class User {
    constructor(userID = 0, username = "Unnamed") {
        this.userID = userID;
        this.username = username;
        this.online = true;
        this.lobbies = [];
        DB.getLobbiesByUserID(this.userID).then(lobbies => {
            this.lobbies = lobbies;
        });
    }
}

module.exports = User;
