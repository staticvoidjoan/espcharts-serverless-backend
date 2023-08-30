const connectDatabase = require('../../database/dbConfig');
const Team = require('../../models/Team');

module.exports.handler = async (event, context) => {
  try {
    await connectDatabase();
    const teamObj = await Team.findById(event.pathParameters.id);
    if (!teamObj) {
      return{
        statusCode: 404,
        body: JSON.stringify({message: "Could not find team or team does not exist"})
      }
    }
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 201,
      body: JSON.stringify(teamObj,),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
