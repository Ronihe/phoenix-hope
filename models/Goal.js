/* goal model  */
const db = require('../db');
const APIError = require('../helpers/APIError');
const sqlPartialUpdate = require('../helpers/partialUpdateSql');
const User = require('./User');
const Twilio = require('../models/Twilio');

class Goal {
  // get all the goals
  static async getAll() {
    const allGoalsRes = await db.query(
      `SELECT id, title, category, claps from goals ORDER BY category`
    );
    return allGoalsRes.rows;
  }

  // post a goal

  static async create(username, data) {
    // check if the user exists
    const user = await User.findOne(username);
    const phone = user.phone;
    console.log(user);
    console.log(phone);

    const result = await db.query(
      `INSERT INTO goals (username, title, description, due_date, category) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [username, data.title, data.description, data.due_date, data.category]
    );
    const newGoal = result.rows[0];

    // notify the user that their due is approaching the next day
    const hours = (newGoal.due_date - newGoal.date_posted) / 3600000 - 24;
    await Twilio.sendMsg(
      `Congrats!, ${username}! you created a new goal ${newGoal.title}!`,
      phone
    );
    await Twilio.setDailyReminder(
      `Don't forget your ${newGoal.title}, keep the hardwork!`,
      hours,
      phone
    );
    await Twilio.sendDueMsg(
      `Your ${newGoal.title} is due on ${
        newGoal.due_date
      }. Did you complete it? Hurry Up!`,
      hours,
      phone
    );

    return newGoal;
  }

  // get one goal by goal id with its related steps

  static async getOneById(id) {
    const goalRes = await db.query(`SELECT * FROM goals WHERE id = $1`, [id]);
    const goal = goalRes.rows[0];
    if (!goal) {
      throw new APIError(404, `There exists no goal '${id}'`);
    }
    return goal;
  }

  //get one goal by goal id and username with all its steps
  static async getOneByUsernameAndId(username, id) {
    const goal = await Goal.getOneById(id);

    //check if the goal belongs to the user
    if (username !== goal.username) {
      throw new APIError(
        404,
        `this user ${username} did not create this goal ${id}.`
      );
    }

    const goalStepRes = await db.query(
      `SELECT s.id, s.goal_id, s.step_content, s.date_posted 
      FROM steps AS s
        JOIN goals AS g ON g.id = s.goal_id
      WHERE g.id = $1`,
      [id]
    );
    goal.steps = goalStepRes.rows;
    return goal;
  }

  // update a goal
  static async update(username, id, data) {
    // check the if the id exists and belongs to the user
    await Goal.getOneByUsernameAndId(username, id);
    const { query, values } = sqlPartialUpdate('goals', data, 'id', id);
    const result = await db.query(query, values);
    return result.rows[0];
  }

  // remove a goal
  static async remove(username, id) {
    // check the if the id exists and belongs to the user
    await Goal.getOneByUsernameAndId(username, id);
    await db.query(`DELETE FROM goals WHERE id = $1`, [id]);
  }

  // complete a goal
  static async complete(username, id) {
    // check the if the id exists and belongs to the user
    const goal = await Goal.getOneByUsernameAndId(username, id);
    if (goal.state === 'completed') {
      throw new APIError(409, 'This is goal is already completed.');
    }
    const user = await User.findOne(username);
    const phone = user.phone;
    const completedGoalRes = await db.query(
      `UPDATE goals SET state = 'completed' WHERE id = ${id} returning *`
    );
    const completedGoal = completedGoalRes.rows[0];
    await Twilio.sendMsg(
      `Congrats!, ${username}! you completed ${completedGoal.title}!`,
      phone
    );
  }

  // get a clap
  // static async clap

  // support a goal
  static async support(goal_id, username) {
    //check if the goal_id exists
    await Goal.getOneById(goal_id);
    //check if the match already exists
    const supportRes = await db.query(
      `SELECT supporter_username FROM supports WHERE goal_id = ${goal_id}`
    );
    console.log(supportRes.rows[0].username, username);
    if (supportRes.rows[0].username === username) {
      throw new APIError(
        409,
        `user ${username} already supported this goal ${goal_id}`
      );
    }
    const result = await db.query(
      `INSERT INTO supports (goal_id, supporter_username) VALUES ($1, $2) RETURNING *`,
      [goal_id, username]
    );
    return result.rows[0];
  }
}

module.exports = Goal;
