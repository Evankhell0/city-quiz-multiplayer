const sqlite3 = require("sqlite3");

const SQL_CREATE_TABLES = `CREATE TABLE if not exists "Lobby" (
	    "LobbyID"    INTEGER NOT NULL UNIQUE,
      "LobbyName"  TEXT,NOT NULL,
	    "Host"        TEXT,NOT NULL,
	    "Lobbytype"    INTEGER,
	    PRIMARY KEY("LobbyID" AUTOINCREMENT)
	);
    CREATE TABLE if not exists "User" (
	    "UserID"	INTEGER NOT NULL,
	    "Username"	TEXT NOT NULL UNIQUE,
	    "Password"	TEXT NOT NULL,
	    PRIMARY KEY("UserID" AUTOINCREMENT)
);
    CREATE TABLE if not exists "User_Lobby_Xref" (
	    "LobbyID"	INTEGER,
	    "UserID"	INTEGER,
	    FOREIGN KEY("LobbyID") REFERENCES "Lobby"("LobbyID")
);`

const SQL_REGISTER_USER = `INSERT INTO User (Username,Password) VALUES (?,?)`;  
const SQL_CREATE_LOBBY = `INSERT INTO Lobby (LobbyName,Host,Lobbytype) VALUES (?,?,?)`
const SQL_VALIDATE_LOGIN = `SELECT Password FROM User WHERE Username = ?`
const SQL_GET_LOBBIES = `SELECT * FROM Lobby`
const SQL_GET_USERS = `SELECT UserID,Username FROM User`
const SQL_JOIN_LOBBY = `INSERT INTO User_Lobby_Xref VALUES (?,?)`


class Database {
    constructor() {
      this.db = new sqlite3.Database("./data/database.db", sqlite3.OPEN_READWRITE, (err) => {
          if(err) return console.log(err);
      })
      this.db.run(SQL_CREATE_TABLES);
    }

    registerUser() {
       this.db.run(SQL_REGISTER_USER,[Username,Password]);
    }

    validateLogin() {
       this.db.run(SQL_VALIDATE_LOGIN,[Username]);
    }
   
    getLobbies() {
       this.db.all(SQL_GET_LOBBIES);
    }   

    getUsers() {
       this.db.all(SQL_GET_USERS);
    }

    joinLobby() {
       this.db.run(SQL_JOIN_LOBBY,[LobbyID,UserID]);
    }

}

