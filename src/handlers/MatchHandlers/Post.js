const mongoose = require('mongoose');
const connectDatabase = require('../../database/dbConfig');
const Player = require('../../models/Player');
const cors = require('cors'); // Import the cors package

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  // Use the cors middleware
  const corsMiddleware = cors({
    origin: '*', // Replace with your frontend's URL
    credentials: true,
  });

  try {
    // Apply the cors middleware
    const corsHandler = corsMiddleware(event, context, () => {});

    if (corsHandler) {
      return corsHandler;
    }

    await connectDatabase();
    const { firstName, lastName, userName, gameTitle, gameRole, age, country } = JSON.parse(event.body);

    let playerObj = {
      firstName,
      lastName,
      userName,
      gameTitle,
      gameRole,
      age,
      country,
    };

    playerObj = await Player.create(playerObj);
    return {
      statusCode: 201,
      body: JSON.stringify(playerObj),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
