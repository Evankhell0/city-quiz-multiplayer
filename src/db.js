const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");

const SQL_CREATE_TABLE_LOBBY = `CREATE TABLE if not exists "Lobby" (
	   "LobbyID"    INTEGER NOT NULL UNIQUE,
      "LobbyName"  TEXT NOT NULL,
	    "Host"        TEXT NOT NULL,
	    "Lobbytype"    INTEGER,
	    PRIMARY KEY("LobbyID" AUTOINCREMENT)
	);`

const SQL_CREATE_TABLE_USER = `CREATE TABLE if not exists "User" (
	    "UserID"	INTEGER NOT NULL,
	    "Username"	TEXT NOT NULL UNIQUE,
	    "Password"	TEXT NOT NULL,
	    PRIMARY KEY("UserID" AUTOINCREMENT)
);`
const SQL_CREATE_TABLE_USER_LOBBY_XREF = `CREATE TABLE if not exists "User_Lobby_Xref" (
	    "LobbyID"	INTEGER,
	    "UserID"	INTEGER,
	    FOREIGN KEY("LobbyID") REFERENCES "Lobby"("LobbyID")
);`

const SQL_REGISTER_USER = `INSERT INTO User (Username,Password) VALUES (?,?)`;
const SQL_CREATE_LOBBY = `INSERT INTO Lobby (LobbyName,Host,Lobbytype) VALUES (?,?,?)`;
const SQL_VALIDATE_LOGIN = `SELECT Password FROM User WHERE Username = ?`; 
const SQL_GET_LOBBIES = `SELECT * FROM Lobby`;
const SQL_GET_USERS = `SELECT UserID,Username FROM User`;
const SQL_JOIN_LOBBY = `INSERT INTO User_Lobby_Xref VALUES (?,?)`;


class Database {
   static {
      this.db = new sqlite3.Database("./data/database.db", sqlite3.OPEN_READWRITE, (err) => {
         if (err) return console.log(err);
      })
      this.db.run(SQL_CREATE_TABLE_LOBBY);
      this.db.run(SQL_CREATE_TABLE_USER);
      this.db.run(SQL_CREATE_TABLE_USER_LOBBY_XREF);
   }

   static async registerUser(username, password) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        this.db.run(SQL_REGISTER_USER, [username, hashedPassword]);
      } catch (err) {
        console.error(err);
      }
    }

   static async validateLogin(username) {
      return new Promise((resolve, reject) => {
         this.db.get(SQL_VALIDATE_LOGIN, [username], (err, rows) => {
            resolve(rows);
         })
      })
   }

   static async getLobbies() {
      return new Promise((resolve, reject) => {
         this.db.all(SQL_GET_LOBBIES, [], (err, rows) => {
            resolve(rows);
         })
      })
   }

   static async getUsers() {
      return new Promise((resolve, reject) => {
         this.db.all(SQL_GET_USERS, [], (err, rows) => {
            resolve(rows);
         })
      })
   }

   static joinLobby(lobbyID, userID) {
      this.db.run(SQL_JOIN_LOBBY, [lobbyID, userID]);
   }
}

module.exports = Database;
