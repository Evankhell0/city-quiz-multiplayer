const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const fs = require('fs');

const SQL_CREATE_TABLE_LOBBY = `CREATE TABLE if not exists "Lobby" (
		"LobbyID"    INTEGER NOT NULL UNIQUE,
		"LobbyName"  TEXT NOT NULL,
		"Host"        TEXT NOT NULL,
		"Lobbytype"    INTEGER,
		PRIMARY KEY("LobbyID" AUTOINCREMENT)
);`;

const SQL_CREATE_TABLE_USER = `CREATE TABLE if not exists "User" (
		"UserID"	INTEGER NOT NULL,
	    "Username"	TEXT NOT NULL UNIQUE,
	    "Password"	TEXT NOT NULL,
	    PRIMARY KEY("UserID" AUTOINCREMENT)
);`;

const SQL_CREATE_TABLE_USER_LOBBY_XREF = `CREATE TABLE if not exists "User_Lobby_Xref" (
		"LobbyID"	INTEGER,
	    "UserID"	INTEGER,
		FOREIGN KEY("LobbyID") REFERENCES "Lobby"("LobbyID")
);`;

const SQL_REGISTER_USER = `INSERT INTO User (Username,Password) VALUES (?,?)`;
const SQL_CREATE_LOBBY = `INSERT INTO Lobby (LobbyName,Host,Lobbytype) VALUES (?,?,?)`;
const SQL_VALIDATE_LOGIN = `SELECT Password FROM User WHERE Username = ?`;
const SQL_GET_LOBBIES = `SELECT * FROM Lobby`;
const SQL_GET_USERS = `SELECT UserID,Username FROM User`;
const SQL_JOIN_LOBBY = `INSERT INTO User_Lobby_Xref VALUES (?,?)`;
const SQL_GET_LOBBIES_BY_USER_ID = `SELECT * FROM User_Lobby_Xref WHERE UserID = ?`;
const SQL_GET_LOBBY_BY_LOBBY_ID = `SELECT * FROM Lobby WHERE LobbyID = ?`;
const SQL_REMOVE_PLAYER_FROM_LOBBY = `DELETE FROM "User_Lobby_Xref" WHERE "LobbyID" = ? AND "UserID" = ?;`;
const SQL_DELETE_LOBBY_XREF = `DELETE FROM "User_Lobby_Xref" WHERE "LobbyID" = ?;`;
const SQL_DELETE_LOBBY = `DELETE FROM "Lobby" WHERE "LobbyID" = ?;`;
const SQL_GET_ALL_XREF = `SELECT * FROM User_Lobby_Xref`;
const SQL_GET_USERS_IN_LOBBY = `SELECT DISTINCT * FROM User_Lobby_Xref WHERE "LobbyID" = ?;`
class Database {
   static {
      if (!fs.existsSync("./data/database.db")) {
         if (!fs.existsSync("./data/")) {
            fs.mkdir("./data/", (err) => {
               if (err) return console.log(err);
            });
         }
         fs.writeFileSync("./data/database.db", "");
      }
      this.db = new sqlite3.Database("./data/database.db", sqlite3.OPEN_READWRITE, (err) => {
         if (err) return console.log(err);
      });
      this.db.run(SQL_CREATE_TABLE_LOBBY);
      this.db.run(SQL_CREATE_TABLE_USER);
      this.db.run(SQL_CREATE_TABLE_USER_LOBBY_XREF);
   }

   static async registerUser(username, password) {
      	    try {
      	        const hashedPassword = await bcrypt.hash(password, 10);
      	        return new Promise((resolve, reject) => {
      	            this.db.run(SQL_REGISTER_USER, [username, hashedPassword], (err) => {
                      if (err) {
      	                    reject(err);
      	                } else {
      	                    resolve("success");
      	                }
      	            });
      	        });
      	    } catch (error) {
      	        throw error;
      	    }
      	}
   static async validateLogin(username, password) {
      return new Promise((resolve, reject) => {
         this.db.get(SQL_VALIDATE_LOGIN, [username], (err, rows) => {
			 if(err) {
				 reject({ message: "Unknown Error" });
			 } else if(!rows) {
				 reject({ message: "Username not found" });
			 } else {
				 const result = bcrypt.compare(password, rows.Password);
				 resolve(result);
			 }
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

   static async getLobbiesByUserID(userID) {
      return new Promise((resolve, reject) => {
         this.db.all(SQL_GET_LOBBIES_BY_USER_ID, [userID], (err, rows) => {
            if (rows) {
               resolve(Promise.all(rows.map(x => this.getLobbyByLobbyID(x.LobbyID))));
            } else {
               resolve([]);
            }
         })
      })
   }

   static async getLobbyByLobbyID(lobbyID) {
      return new Promise((resolve, reject) => {
         this.db.get("SELECT * FROM Lobby WHERE LobbyID = ?", [lobbyID], (err, rows) => {
            resolve(rows)
         })
      })
   }

   static createLobby(lobbyName, hostID, lobbyType = 0) {
      this.db.run(SQL_CREATE_LOBBY, [lobbyName, hostID, lobbyType], (err) => {
         if (err) return console.log(err);
      });
   }

   static async removePlayerFromLobby(lobbyID, userID) {
      return new Promise((resolve, reject) => {
         this.db.run(SQL_REMOVE_PLAYER_FROM_LOBBY, [lobbyID, userID], (err) => {
            if (err) {
               reject(err);
            } else {
               resolve("success");
            }
         })
      })
   }

   static async deleteLobby(lobbyID) {
      return new Promise((resolve, reject) => {
         this.db.all(SQL_DELETE_LOBBY_XREF, [lobbyID], (err) => {
            if (err) reject(err);
            this.db.all(SQL_DELETE_LOBBY, [lobbyID], (err) => {
               if (err) reject(err);
               else resolve("success");
            });
         });
      });
   }

   static async getAllXref() {
      return new Promise((resolve, reject) => {
         this.db.all(SQL_GET_ALL_XREF, [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
         });
      });
   }
   static async getUsersInLobby(lobbyID) {
      return new Promise((resolve, reject) => {
         this.db.all(SQL_GET_USERS_IN_LOBBY, [lobbyID], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
         });
      });
   }


}

module.exports = Database;
