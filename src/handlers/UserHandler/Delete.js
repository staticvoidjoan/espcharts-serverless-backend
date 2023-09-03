const connectDatabase = require("../../database/dbConfig");
const User = require("../../models/User")

module.exports.handler = async(event, context) =>{
    context.callbackWaitForEmptyEventLoop = false;
    try {
        await connectDatabase();
        const userId = event.pathParameters.id
        const userObj = await User.findByIdAndDelete(userId);
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(userObj),
          };
    } catch (error) {
        
    }
} 