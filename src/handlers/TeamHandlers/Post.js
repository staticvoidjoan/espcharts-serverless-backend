const mongoose = require("mongoose");
const connectDatabase = require("../../database/dbConfig");
const Team = require("../../models/Team");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();
    const { teamName, teamCaptain, players, teamOrigin } = JSON.parse(
      event.body
    );

    let teamObj = {
      teamName,
      teamCaptain,
      players,
      teamOrigin,
    };

    teamObj = await Team.create(teamObj);
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(teamObj),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
