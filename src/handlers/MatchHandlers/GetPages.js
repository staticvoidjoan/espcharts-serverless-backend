const connectDatabase = require('../../database/dbConfig');
const Match = require('../../models/Match');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();

    const { page, limit } = event.queryStringParameters || {};
    const skip = (parseInt(page) || 1 - 1) * (parseInt(limit) || 10);

    const matchObj = await Match.find({})
      .skip(skip)
      .limit(parseInt(limit) || 10);

    if (matchObj.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No players have been added to the database" }),
      };
    }

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",

    },
      statusCode: 200,
      body: JSON.stringify(matchObj,null, 2),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
