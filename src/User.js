class User {
    constructor(id = 0, username = "Unnamed") {
        this.id = id;
        this.username = username;
        this.online = true;
    }
}

module.exports = User;
