const connectDatabase = require('../../database/dbConfig');
const Player = require('../../models/Player');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  try {
    await connectDatabase();
    const teamId = event.pathParameters.id;
    const updatedTeamData = JSON.parse(event.body);

    const updatedTeam = await Player.findByIdAndUpdate(teamId, updatedTeamData, {
      new: true, // This option returns the updated document
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Replace with your frontend's URL
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(updatedTeam),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
