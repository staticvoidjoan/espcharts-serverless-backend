const connectDatabase = require("../../database/dbConfig");
const Player = require("../../models/Player");

module.exports.handler = async (event, context) => {
  //   context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const playerObj = await Player.find();
    if(playerObj.length == 0){
      return{
        statusCode: 404,
        body: JSON.stringify({message: "No players found"})
      }
    }
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 200,
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
