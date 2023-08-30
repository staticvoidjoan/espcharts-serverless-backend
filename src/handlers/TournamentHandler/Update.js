const connectDatabase = require('../../database/dbConfig');
const Player = require('../../models/Player');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  try {
    await connectDatabase();
    const tournamentId = event.pathParameters.id;
    const updatedTournamentData = JSON.parse(event.body);

    const updatedTournament = await Player.findByIdAndUpdate(tournamentId, updatedTournamentData, {
      new: true, // This option returns the updated document
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Replace with your frontend's URL
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(updatedTournament),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
