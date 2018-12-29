/* goal model  */
const db = require('../db');
const APIError = require('../helpers/APIError');
const sqlPartialUpdate = require('../helpers/partialUpdateSql');
const User = require('./User');

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
    await User.findOne(username);

    const result = await db.query(
      `INSERT INTO goals (username, title, description, due_date, category) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [username, data.title, data.description, data.due_date, data.category]
    );
    return result.rows[0];
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
      `SELECT s.id, s.goal_id, s.step_content, s.date_posted, g.state 
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
    await Goal.getOneByUsernameAndId(username, id);
    await db.query(`UPDATE goals SET state = 'completed' WHERE id = ${id}`);
  }

  // get a clap
}

module.exports = Goal;
