const connectDatabase = require('../../database/dbConfig');
const Team = require('../../models/Team');

module.exports.handler = async (event, context) => {
  try {
    await connectDatabase();
    const teamObj = await Team.findByIdAndDelete(event.pathParameters.id);
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 201,
      body: JSON.stringify(teamObj,null, 2),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
