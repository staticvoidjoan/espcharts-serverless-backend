const connectDatabase = require('../../database/dbConfig');
const Player = require('../../models/Player');

module.exports.handler = async (event, context) => {
  try {
    await connectDatabase();
    const playerId = event.pathParameters.id;
    const playerObj = await Player.findByIdAndDelete(event.pathParameters.id);
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 201,
      body: JSON.stringify(playerObj,null, 2),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
