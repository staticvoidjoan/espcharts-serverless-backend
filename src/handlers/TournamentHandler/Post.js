const mongoose = require("mongoose");
const connectDatabase = require("../../database/dbConfig");
const Player = require("../../models/Player");


module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();
    const {
      tournamentName,
      gameTitle,
      paricipatingTeams,
      startDate,
      endDate,
      matches,
      location,
      pricePool,
      organizer,
    } = JSON.parse(event.body);

    let tournamentObj = {
      tournamentName,
      gameTitle,
      paricipatingTeams,
      startDate,
      endDate,
      matches,
      location,
      pricePool,
      organizer,
    };

    tournamentObj = await Player.create(tournamentObj);
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
