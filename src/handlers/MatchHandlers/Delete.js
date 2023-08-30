const connectDatabase = require('../../database/dbConfig');
const Match = require('../../models/Match');

module.exports.handler = async (event, context) => {
  try {
    await connectDatabase();
    const matchObj = await Player.findByIdAndDelete(event.pathParameters.id);
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 201,
      body: JSON.stringify(matchObj.null, 2),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
