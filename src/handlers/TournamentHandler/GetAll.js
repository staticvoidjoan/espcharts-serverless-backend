const connectDatabase = require("../../database/dbConfig");
const Tournament = require("../../models/Tournament");

module.exports.handler = async (event, context) => {
  //   context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const tournamentObj = await Tournament.find();
    if (tournamentObj.length == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No tournaments found" }),
      };
    }
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 200,
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
