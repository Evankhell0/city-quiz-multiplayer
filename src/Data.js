const Lobby = require("./Lobby.js");
const User = require("./User.js");

const randomUserNames = [
  "SunnyDaze",
  "PixelPirate",
  "RainbowNinja",
  "StarGazer",
  "MoonWalker",
  "CrimsonScribe",
  "LuckyLion",
  "ElectricJolt",
  "RubyRider",
  "SilverFox",
  "AquaWhisper",
  "GoldenSnitch",
  "MysticWanderer",
  "ShadowPulse",
  "CeruleanDream",
  "VelvetVoyager",
  "NeonNomad",
  "CopperCrafter",
  "JadeJester",
  "AmberAlchemy",
  "EmeraldEnigma",
  "ObsidianOracle",
  "PlatinumPioneer",
  "TopazTinkerer",
  "OnyxOpus",
  "CrystalCaster",
  "MarbleMaestro",
  "QuasarQuest",
  "GalacticGlider"
];

class Data {
    static lobbies = [];
    static users = [];

    static {
        // call DB stuff here instead of hardcoding the data
        //this.lobbies.push(new Lobby(727), new Lobby(999));
        this.registerUser();
        //this.getLobby(727).addPlayer(this.users[0]);
    }

    static registerUser(id, username) {
        const placeholderName = randomUserNames.pop() ?? "Unnamed";
        this.users.push(new User(0, placeholderName));
    }

    static getUser() {
        return this.users[0];
    }

    static getLobby(id) {
        const lobby = this.lobbies.find(x => x.id == id);
        if(lobby) {
            return lobby;
        }
        const newLobby = new Lobby(id);
        return newLobby;
    }
}

module.exports = Data;
