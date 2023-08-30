const connectDatabase = require('../../database/dbConfig');
const Player = require('../../models/Player');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  try {
    await connectDatabase();
    const {teamOrigin, teamName} = JSON.parse(event.body);
    const teamId = event.pathParameters.id;
    
    //Check if the Team Name is of the correct format 
    const nameRegex = /^[a-zA-Z0-9 _-]+$/;
    if (!nameRegex.test(teamName)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid team name please use only alphanumeric values",
        }),
      };
    }

    //Check if the country is an actual country
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${teamOrigin}`
      );

      if (response.data.length === 0) {
        return {
          stausCode: 400,
          body: JSON.stringify({ message: `${teamOrigin} is an invalid country` }),
        };
      }
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500, 
        body: JSON.stringify({ error: error.message }),
      };
    }

    const existingTeam = await Team.findOne({
      _id: {$ne: teamId},
      $or : [{teamName}]
    }).exec();
    if (existingTeam){
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `You are already using ${teamName} or that name is taken`,
        }),
    }
  }    
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
