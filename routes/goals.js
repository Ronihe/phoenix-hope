// API for managing goals in the system

const Goal = require('../models/goal');
const express = require('express');
const router = new express.Router();
const APIError = require('../helpers/APIError');
const { authRequired, ensureCorrectUser } = require('../middleware/auth');

//get all the goals
router.get(`/`, async function(req, res, next) {
  try {
    const goals = await Goal.getAll();
    return res.json({ goals });
  } catch (error) {
    return next(erro);
  }
});

// see the steps for one goal, only the user can see
router.post('/:username/:id', ensureCorrectUser, async function(
  req,
  res,
  next
) {
  try {
    const goal = await Goal.getOneByUsernameAndId(
      req.params.username,
      req.params.id
    );
    return res.json({ goal });
  } catch (error) {
    return next(error);
  }
});

// post a goal, only the user
router.post('/:username', ensureCorrectUser, async function(req, res, next) {
  try {
    const goal = await Goal.create(req.params.username, req.body);
    return res.status(201).json({ goal }); // 201 CREATED
  } catch (error) {
    return next(error);
  }
});

// patch a goal
router.patch('/:username/:id', ensureCorrectUser, async function(
  req,
  res,
  next
) {
  try {
    const goal = await Goal.update(
      req.params.username,
      req.params.id,
      req.body
    );
    return res.json({ goal });
  } catch (error) {
    return next(error);
  }
});

// delete a goal
router.delete('/:username/:id', ensureCorrectUser, async function(
  req,
  res,
  next
) {
  try {
    await Goal.remove(req.params.username, req.params.id);
    return res.json({ message: `${req.params.id} is deleted` });
  } catch (error) {
    return next(error);
  }
});

// complete a goal
router.post('/:username/:id/complete', ensureCorrectUser, async function(
  req,
  res,
  next
) {
  try {
    await Goal.complete(req.params.username, req.params.id);
    return res.json({ message: `${req.params.id} is completed!` });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
