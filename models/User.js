const db = require('../db');
const APIError = require('../helpers/APIErrors');
// helper function to do the sql

const BCRYPT_WORK_FACTOR = 10;

/* related functions to users */

class User {
  /* authenticate users with username, password. returns user or throw err. */
  static async anthenticate(data) {
    //check the user
    const result = await db.query(
      `SELECT username, 
              password, 
              first_name, 
              last_name, 
              email,
              phone,
              photo_url, 
      FROM users 
      WHERE username = $1`,
      [data.username]
    );
  }
}

module.exports = User;
