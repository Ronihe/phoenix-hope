/* API managing users */

const db = require('../db');
const bcrypt = require('bcrypt');
const APIError = require('../helpers/APIErrors');
// helper function to do the sql

const BCRYPT_WORK_FACTOR = 12;

/* related functions to users */

class User {
  /* authenticate users with username, password. returns user or throw err. */
  static async authenticate(data) {
    //check the user
    const result = await db.query(
      `SELECT username, 
              password, 
              first_name, 
              last_name, 
              email,
              phone,
              photo_url
      FROM users 
      WHERE username = $1`,
      [data.username]
    );
    const user = result.rows[0];
    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(data.password, user.password);
      if (isValid) {
        console.log('testing', isValid);
        return user;
      }
    }
    const invalidPass = new Error('Invalid PW');
    invalidPass.status = 401;
    throw invalidPass;
  }

  /* register with data */
  static async register(data) {
    const checkDuplicateUser = await db.query(
      `SELECT username from users WHERE username = $1`,
      [data.username]
    );
    // need to refactor
    if (checkDuplicateUser.rows.length != 0) {
      const err = new Error(
        `There already exists a user with username '${data.username}`
      );
      err.status = 409;
      console.log(err);
      throw err;
    }

    const hashedPw = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, email, phone, photo_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        data.username,
        hashedPw,
        data.first_name,
        data.last_name,
        data.email,
        data.phone,
        data.photo_url
      ]
    );
    return result.rows[0];
  }
}

module.exports = User;
