const mongoose = require("mongoose");
const connectDatabase = require("../../database/dbConfig");
const Player = require("../../models/Player");


module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();
    const {
      tournamentName, location, organizer, startDate, gameTitle 
    } = JSON.parse(event.body);

    //Check if name formats are correct
    const regexOne = /^[a-zA-Z0-9_-]+$/;
    if (!regexOne.test(tournamentName)) {
      return{
        statusCode: 400,
        body: JSON.stringify({message: "Invalid tournament name please use only alphanumeric"})
      }
    }
    const regexTwo = /^[A-Za-z]+$/;
    if (!regexTwo.test(location) || !regexTwo.test(organizer)) {
      return{
        statusCode: 400,
        body: JSON.stringify({message: "Invalid, please use only alphanumeric"})
      }
    }

    const existingTournament = await Tournament.findOne({
      tournamentName,
      startDate,
      gameTitle,
      location,
    }).exec();
    if (existingTournament) {
      return{
        statusCode: 400,
        body: JSON.stringify({message: "Tournament already exists"})
      }
    }

    tournamentObj = await Player.create(JSON.parse(event.body));
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(tournamentObj),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
