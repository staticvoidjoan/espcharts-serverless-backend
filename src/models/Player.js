const mongoose = require("mongoose");
const playerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please insert first name"],
    min: [3, "First name must be at least 3 characters"],
    max: [30, "Maximum number of characters can only be 30"],
    trim:true
    
  },
  lastName: {
    type: String,
    required: [true, "Please insert last name"],
    min: [3, "Last name must be at least 3 characters"],
    max: [30, "Maximum number of characters can only be 30"],
    trim:true
  },
  userName: {
    type: String,
    required: [true, "Please insert last name"],
    min: [3, "Last name must be at least 3 characters"],
    max: [30, "Maximum number of characters can only be 30"],
    unique: [true, "Username must be unique"],
    trim:true
  },
  gameTitle: {
    type: String,
    enum: [
      "Counter Strike: Global Offensive",
      "League of Legends",
      "Rainbow Six Siege",
      "Valorant",
      "Overwatch",
      "Call Of Duty",
    ],
    required: [true,"Game title must be selected"],
    trim:true
  },
  gameRole: {
    type: String,
    enum: [
      "Entry Frag",
      "Lurker",
      "AWPer",
      "Support",
      "In-Game Leader (IGL)",
      "Rifler",
      "Assault Rifle (AR)",
      "Submachine Gun (SMG)",
      "Sniper",
      "Shotgunner",
      "LMG",
      "Coach",
      "Top Laner",
      "Jungler",
      "Mid Laner",
      "Bot Laner (ADC)",
      "Support",
      "Fragger",
      "Support",
      "Entry Fragger",
      "Anchor",
      "Roamer",
      "Coach",
      "Duelist",
      "Initiator",
      "Controller",
      "Sentinel",
      "Coach",
      "Tank",
      "DPS",
      "Support",
      "Flex",
      "Coach",
    ],
    required: [true,"Game role must be selected"],
    trim:true
  },
  age: {
    type: Number,
    required: true,
    min: [15, "Minimum age of a player is 15"],
    max: [67, "Maximum age of a player is 67"],
  
  },
  country: {
    type: String,
    required: [true, "Country of the player must be provided"],
    min: [3, "Country of the player must be at least 3 characters"],
    max: [30, "Maximum number of characters can only be 30"],
  },
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
