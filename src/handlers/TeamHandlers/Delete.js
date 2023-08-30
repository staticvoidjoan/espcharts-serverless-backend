const connectDatabase = require('../../database/dbConfig');
const Team = require('../../models/Team');

module.exports.handler = async (event, context) => {
  try {
    await connectDatabase();

    const teamId =  event.pathParameters.id;
    const existingTeam = await Team.findById(teamId);
    if (!existingTeam) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Could not find team or team does not exist",
        }),
      };
    }
    const teamObj = await Team.findByIdAndDelete(teamId);
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 201,
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
