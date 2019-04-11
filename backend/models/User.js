/* API managing users */

const db = require('../db');
const bcrypt = require('bcrypt');
const APIError = require('../helpers/APIError');

const sqlPartialUpdate = require('../helpers/partialUpdateSql');
// helper function to do the sql

const { TWILIO } = require('../config');
const accountSid = TWILIO.accountSid;
const authToken = TWILIO.authToken;
const client = require('twilio')(accountSid, authToken);

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
        return user;
      }
    }

    throw new APIError(401, 'Invalid PW');
  }

  /* register with data */
  static async register(data) {
    const checkDuplicateUser = await db.query(
      `SELECT username from users WHERE username = $1`,
      [data.username]
    );
    // need to refactor
    if (checkDuplicateUser.rows.length != 0) {
      throw new APIError(
        409,
        `There already exists a user with username '${data.username}`
      );
    }

    // verify the twilio phone number
    const checkDuplicatePhone = await db.query(
      `SELECT phone from users WHERE phone = $1`,
      [data.phone]
    );
    if (checkDuplicatePhone.rows.length === 0) {
      const validatedNum = '+1' + data.phone;
      await client.validationRequests.create({
        friendlyName: `${data.username}`,
        phoneNumber: validatedNum
      });
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

  //find all users
  static async findAll() {
    const result = await db.query(
      `SELECT username, first_name, last_name FROM users ORDER BY username`
    );
    return result.rows;
  }

  // find one user and its realted goals
  static async findOne(username) {
    const result = await db.query(
      `SELECT username, first_name, last_name, phone FROM users WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];
    if (!user) {
      throw new APIError(404, `There is no ${username}`);
    }
    // add all the goals realted to the user

    const userGoalsRes = await db.query(
      `SELECT g.id, g.title, g.description, g.state, g.date_posted, g.due_date FROM users AS u LEFT JOIN goals AS g on u.username = g.username WHERE u.username = $1`,
      [username]
    );
    if (userGoalsRes.rows[0].id === null) {
      user.goals = [];
    } else {
      user.goals = userGoalsRes.rows;
    }
    for (let goal of user.goals) {
      const goalStepRes = await db.query(
        `SELECT s.id, s.goal_id, s.step_content, s.date_posted 
        FROM steps AS s
          JOIN goals AS g ON g.id = s.goal_id
        WHERE g.id = $1`,
        [goal.id]
      );
      goal.steps = goalStepRes.rows;
    }
    console.log(user);
    return user;
  }

  //update a user;
  static async update(username, data) {
    await User.findOne(username);
    // if the user wants to update password, hash it and record it in the DB
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    let { query, values } = sqlPartialUpdate(
      'users',
      data,
      'username',
      username
    );
    const result = await db.query(query, values);
    const updatedUser = result.rows[0];

    delete updatedUser.password;
    return updatedUser;
  }

  // delete a user
  static async remove(username) {
    let result = await db.query(
      `DELETE FROM users WHERE username = $1 RETURNING username`,
      [username]
    );
    if (result.rows.length === 0) {
      throw APIError(404, `There is no ${username}`);
    }
  }
}

module.exports = User;
