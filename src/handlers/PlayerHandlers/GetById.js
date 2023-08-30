const connectDatabase = require('../../database/dbConfig');
const Player = require('../../models/Player');

module.exports.handler = async (event, context) => {
  try {
    await connectDatabase();
    const playerObj = await Player.findById(event.pathParameters.id);
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
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
