const connectDatabase = require('../../database/dbConfig');
const Player = require('../../models/Player');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  try {
    await connectDatabase();
    const tournamentId = event.pathParameters.id;
    const updatedTournamentData = JSON.parse(event.body);

     //Check if name formats are correct
     const regexOne = /^[a-zA-Z0-9_-]+$/;
     if (!regexOne.test(tournamentName)) {
       return{
         statusCode: 400,
         body: JSON.stringify({message: "Invalid tournament name please use only alphanumeric"})
       }
     }
     const regexTwo = /^[A-Za-z]+$/;
     if (!regexTwo.test(location) || !regexTwo.test(organizer)) {
       return{
         statusCode: 400,
         body: JSON.stringify({message: "Invalid, please use only alphanumeric"})
       }
     }
 
     const existingTournament = await Tournament.findOne({
      _id: {$ne: tournamentId},
      $or:[{
       tournamentName,
       startDate,
       gameTitle,
       location}]
     }).exec();
     if (existingTournament) {
       return{
         statusCode: 400,
         body: JSON.stringify({message: "Tournament already exists"})
       }
     }


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
