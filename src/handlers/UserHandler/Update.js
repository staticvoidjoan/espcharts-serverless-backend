
const connectDatabase = require("../../database/dbConfig");
const User = require("../../models/User");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const userId = event.pathParameters.id;

    const updatedData = JSON.parse(event.body);
    const updatedPlayer = await User.findByIdAndUpdate(
      userId,
      updatedData,
      {
        new: true, // This option returns the updated document
      }
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Replace with your frontend's URL
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(updatedPlayer),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
