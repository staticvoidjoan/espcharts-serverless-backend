const connectDatabase = require("../../database/dbConfig");
const Team = require("../../models/Team");

module.exports.handler = async (event, context) => {
  //   context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const teamObj = await Team.find();

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 200,
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
