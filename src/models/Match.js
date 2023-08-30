const mongoose = require("mongoose");
const matchSchema = mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
  },
  team1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  team2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  startDate: {
    type: Date,
  },
  playedMaps: [
    {
      type: String,
      min: [3,"Minimum length of map name"],
      max: [30,"Maximum length of map name"]
    },
  ],
  matchMVPs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  winningTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
});

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
