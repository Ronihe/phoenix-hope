/* Step model  */
const db = require('../db');
const APIError = require('../helpers/APIError');
const sqlPartialUpdate = require('../helpers/partialUpdateSql');
const Goal = require('./Goal');

class Step {
  // get a step by username, goal_id and step id, only the user can see the step
  static async getStepByUsernameGidSid(username, goal_id, step_id) {
    const goal = await Goal.getOneByUsernameAndId(username, goal_id);

    const goalStepArr = goal.steps.map(step => step.id);
    if (!goalStepArr.includes(+step_id)) {
      throw new APIError(
        404,
        `this step ${step_id} doesn't belong to this goal ${goal_id}.`
      );
    }

    const stepRes = await db.query(`SELECT * FROM steps WHERE id = ${step_id}`);
    return stepRes.rows[0];
  }

  // post a step to a specific goal, username
  static async create(username, goal_id, data) {
    //check if the goal exists and belong to the user
    await Goal.getOneByUsernameAndId(username, goal_id);
    // create a new step
    const result = await db.query(
      `INSERT INTO steps (goal_id, step_content) VALUES ($1, $2) RETURNING *`,
      [goal_id, data.step_content]
    );
    return result.rows[0];
  }

  //patch a step
  static async update(username, goal_id, step_id, data) {
    //check the validation of username, goal_id, step_id
    await Step.getStepByUsernameGidSid(username, goal_id, step_id);

    const { query, values } = sqlPartialUpdate('steps', data, 'id', step_id);
    const result = await db.query(query, values);
    return result.rows[0];
  }

  //delete a step
  static async remove(username, goal_id, step_id) {
    //check the validation of username, goal_id, step_id
    await Step.getStepByUsernameGidSid(username, goal_id, step_id);
    //delte the step
    await db.query(`DELETE FROM steps WHERE id = $1`, [step_id]);
  }
}

module.exports = Step;
