const mongoose = require("mongoose");
const connectDatabase = require("../../database/dbConfig");
const Team = require("../../models/Team");
const axios = require("axios");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();
    const { teamOrigin, teamName } = JSON.parse(event.body);

    //Check if the Team Name is of the correct format
    const nameRegex = /^[a-zA-Z0-9 _-]+$/;
    if (!nameRegex.test(teamName)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid team name please use only alphanumeric values",
        }),
      };
    }

    //Check if the country is an actual country
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${teamOrigin}`
      );

      if (response.data.length === 0) {
        return {
          stausCode: 400,
          body: JSON.stringify({ message: `${teamOrigin} is an invalid country` }),
        };
      }
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500, 
        body: JSON.stringify({ error: error.message }),
      };
    }

    //Check if the team already exists
    const existingTeam = await Team.findOne({teamName}).exec();
    if (existingTeam) {
      return{
        statusCode: 400,
        body: JSON.stringify({ message:`${existingTeam} already exists`})
      }
    }

    teamObj = await Team.create(JSON.parse(event.body));
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
