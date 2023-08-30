const connectDatabase = require("../../database/dbConfig");
const Player = require("../../models/Player");
const countries = require("iso-3166-1");
const axios = require("axios");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();

    const { firstName, lastName, userName, country } = JSON.parse(event.body);
    console.log("Event body:", event.body);

    //Check if the first and last name are in the correct format
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "First and last name must be alphanumeric",
        }),
      };
    }

    //Check if the username is in the correct format
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,29}$/;
    if (!usernameRegex.test(userName)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message:
            "Format is incorrect. Usernames must start with a letter and can only contain letters (uppercase or lowercase), numbers, underscores, and hyphens.",
        }),
      };
    }

    //Check if the country is a real country
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${country}`
      );

      if (response.data.length === 0) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: `${country} is an invalid country` }),
        };
      }
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message})
      };
    }

    //Check if the username already exists
    const existingPlayer = await Player.findOne({ userName }).exec();
    if (existingPlayer) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `${userName} is already taken please use another username`,
        }),
      };
    }

    const playerData = JSON.parse(event.body);

    const updatedPlayer = await Player.create(playerData);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Replace with your frontend's URL
        "Access-Control-Allow-Credentials": false,
      },
      body: JSON.stringify(updatedPlayer),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
