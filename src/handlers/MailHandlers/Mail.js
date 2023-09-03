const nodemailer = require("nodemailer");
const Newsletter = require("../../models/Newsletter");
const { v4: uuidv4 } = require("uuid");
const { google } = require("googleapis");
const { get } = require("mongoose");
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const getAccessToken = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    return accessToken;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};


const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreply.espnews@gmail.com",
    pass: "mafia200190200",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: getAccessToken(),
  },
});

module.exports.sendConfirmEmailfromServer = async (event) => {
  console.log( CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI, REFRESH_TOKEN, getAccessToken())
 try {
  const { email } = JSON.parse(event.body);
  console.log("email", email)
  //Generate confirmation token
  const confirmationToken = uuidv4();
  console.log("confirm", confirmationToken)
  //Save the email and token to the database
  const newsletter = new Newsletter({ email, confirmationToken });
  await newsletter.save();
  console.log(newsletter)

  //Send the confirmation email with the link containing the token
  const confirmationLink = `https://krgl0umfsc.execute-api.eu-north-1.amazonaws.com/dev/espcharts/${confirmationToken}`;
  sendConfirmEmail(email, confirmationLink);
  return {
    statusCode: 201,
    body: JSON.stringify({message: "Email sent"})
  };
 } catch (error) {
  return{
    statusCode: 500,
    body: JSON.stringify({ error : error.message})
  }
 }
};

module.exports.confirmToken = async (event) => {
  const { token } = JSON.parse(event.pathParameters);
  const subscriber = await Newsletter.findOne({ confirmToken: token });

  if (!subscriber) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Subscriber not found" }),
    };
  }

  subscriber.isSubscribed = true;
  subscriber.confirmToken = null;
  await subscriber.save();

  return {
    statusCode: 302, // 302 Found: Indicates a temporary redirect
    headers: {
      Location: "http://localhost:3000",
    },
    body: JSON.stringify({}),
  };
};

function sendConfirmEmail(email,confirmationLink) {
    const mailOptions = {
        from: "noreply.espnews@gmail.com",
        to: email,
        subject: "Confirm Your ESPCHARTS Newsletter Subscription",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>ESPCharts Newsletter Subscription</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                }
        
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: transparent; /* Remove background color */
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                }
        
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #000000; /* Change text color to black */
                    font-weight: bold; /* Add bold font weight */
                }
        
                .logo {
                    width: 100px;
                    height: auto;
                    display: block;
                    margin: 0 auto; /* Center the logo */
                }
        
                .content {
                    margin-bottom: 20px;
                    color: #000000; /* Change text color to black */
                    text-align: center; /* Center-align content */
                }
        
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
                }
        
                .footer {
                    text-align: center;
                    color: #000000; /* Change text color to black */
                    font-size: 14px;
                }
        
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Confirm Your ESPCharts Newsletter Subscription</h2>
                </div> zd 
                <div class="content">
                    <p>Thank you for subscribing to the ESPCharts newsletter!</p>
                    <p>To confirm your subscription, please click the button below:</p>
                    <a class="button" href="${confirmationLink}">Confirm Subscription</a>
                </div>
                <div class="footer">
                    <p>If you have any questions or need assistance, please contact us.</p>
                    <p>Follow us on <a href="http://bit.ly/47praYe">YouTube</a> for the latest updates!</p>
                    <p>If you do not wish to receive newsletters from us, please ignore this email.</p>
                </div>
            </div>
        </body>
        </html>
        
        `,
            }
            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
      };