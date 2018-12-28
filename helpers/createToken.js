const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

// return signed Json Web Token fron user data

function createToken(user){
  let payload = {
    username: user.username;
  };
  return jwt.sign(payload, SECRET)
}

module.exports = createToken;
