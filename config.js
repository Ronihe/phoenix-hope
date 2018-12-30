// make local variables with dotenv, loads env variables form .env file and adds them to process.env
require('dotenv').config();
const APIError = require('./helpers/APIError');
const SECRET = process.env.SECRET_KEY || 'test';
const PORT = +process.env.PORT || 3000;
const TWILIO = {}; // store all the TWILIO account info inthe TWILIO object

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, 'goals-test'
// - else: 'goals'

let DB_URI;

if (process.env.NODE_ENV === 'test') {
  DB_URI = 'goals-test';
} else {
  DB_URI = process.env.DATABASE_URL || 'goals';
}

//TWILIO account info
TWILIO.accountSid = process.env.TWILIO_ACCOUNT_SID;
TWILIO.authToken = process.env.TWILIO_AUTH_TOKEN;
TWILIO.sendingNumber = process.env.TWILIO_NUMBER;

//ensure the .env has all the TWILIO account info
const requiredConfig = [
  TWILIO.accountSid,
  TWILIO.authToken,
  TWILIO.sendingNumber
];
const isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

  throw new APIError(errorMessage);
}
module.exports = {
  SECRET,
  PORT,
  DB_URI,
  TWILIO
};
