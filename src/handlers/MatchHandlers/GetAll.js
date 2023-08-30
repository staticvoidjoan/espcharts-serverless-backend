const connectDatabase = require("../../database/dbConfig");
const Match = require("../../models/Match");

module.exports.handler = async (event, context) => {
  //   context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const matchObj = await Match.find();

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 200,
      body: JSON.stringify(matchObj),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
