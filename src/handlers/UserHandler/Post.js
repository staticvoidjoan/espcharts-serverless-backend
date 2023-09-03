const connectDatabase = require("../../database/dbConfig");
const User = require("../../models/User");


module.exports.handler = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectDatabase();
        userObj = await User.create(JSON.parse(event.body));
        return{
            statausCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
              },
              body: JSON.stringify(userObj),
            };
    } catch (error) {
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({ error: error.message }),
          };
    }
}