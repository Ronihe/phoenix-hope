// API for managing steps in the system

const Step = require('../models/Step');
const express = require('express');
const router = new express.Router();
const createToken = require('../helpers/createToken');
const APIError = require('../helpers/APIError');
const { authRequired, ensureCorrectUser } = require('../middleware/auth');

module.exports = router;

// get all steps for one goal which is the same for getting one goal, in goals route

// get one step for one goal
router.post('/:username/:goal_id/:step_id', ensureCorrectUser, async function(
  req,
  res,
  next
) {
  try {
    const step = await Step.getStepByUsernameGidSid(
      req.params.username,
      req.params.goal_id,
      req.params.step_id
    );
    res.json({ step });
  } catch (error) {
    return next(error);
  }
});

// post a step
router.post('/:username/:goal_id', ensureCorrectUser, async function(
  req,
  res,
  next
) {
  try {
    const step = await Step.create(
      req.params.username,
      req.params.goal_id,
      req.body
    );
    res.json({ step });
  } catch (error) {
    return next(error);
  }
});

// patch a step
router.patch('/:username/:goal_id/:step_id', ensureCorrectUser, async function(
  req,
  res,
  next
) {
  try {
    const updatedStep = await Step.update(
      req.params.username,
      req.params.goal_id,
      req.params.step_id,
      req.body
    );
    return res.json({ updatedStep });
  } catch (error) {
    return next(error);
  }
});

// delete a step
router.delete('/:username/:goal_id/:step_id', ensureCorrectUser, async function(
  req,
  res,
  next
) {
  try {
    await Step.remove(
      req.params.username,
      req.params.goal_id,
      req.params.step_id
    );
    return res.json({ message: `${req.params.step_id} is deleted` });
  } catch (error) {
    return next(error);
  }
});
