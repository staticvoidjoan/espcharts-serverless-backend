  const mongoose = require("mongoose");
  const tournamentSchema = mongoose.Schema({
    tournamentName: {
      type: String,
      min: [5,"The minimum length of the tournament name"],
      max : [30,"The maximum length of the tournament name"],
      required: true,
      
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
      ]
    },
    participatingTeams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
      },
    ],
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date
    },
    matches:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match" 
    }],
    location: {
      type: String,
    },
    pricePool: {
      type: Number,
    },
    organizer: {
      type: String,
      min: [3, "The minimum length of the tournament organizer"],
      max: [30, "The maximum length of the tournament organizer"],
    
    },
  });

  const Tournament = mongoose.model("Tournament", tournamentSchema);
  module.exports = Tournament;
