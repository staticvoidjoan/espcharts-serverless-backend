const connectDatabase = require('../../database/dbConfig');
const Tournament = require('../../models/Tournament');

module.exports.handler = async (event, context) => {
  try {
    await connectDatabase();
    const tournamentObj = await Tournament.findById(event.pathParameters.id);
    if (!tournamentObj) {
      return{
        statusCode: 404,
        body: JSON.stringify({message: "Could not find tournament or tournament does not exist"})
      }
    }
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      statusCode: 201,
      body: JSON.stringify(tournamentObj,null, 2),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
