const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    teamName: {
        type: String,
        min: [3,"Minimum team name length"],
        max: [30,"Maximum team name length"],
        required:true
    },
    teamCaptain: {
        type: mongoose.Schema.Types.ObjectId
    },
    players:[{
        type: mongoose.Schema.Types.ObjectId
    }],
    teamOrigin: {
        type: String,
        required: true
    }
})

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;