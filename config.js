// make local variables with dotenv, loads env variables form .env file and adds them to process.env
require('dotenv').config();
const SECRET = process.env.SECRET_KEY || 'test';
const PORT = +process.env.PORT || 3000;

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

module.exports = {
  SECRET,
  PORT,
  DB_URI
};
