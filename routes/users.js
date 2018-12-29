// API for authentication, return a token

const User = require('../models/User');
const express = require('express');
const createToken = require('../helpers/createToken');
const { authRequired, ensureCorrectUser } = require('../middleware/auth');
const APIError = require('../helpers/APIError');

const router = new express.Router();

// you logged in and can see all the other people's goal
/** GET / => {users: [user, ...]} */
router.get('/', authRequired, async function(req, res, next) {
  try {
    const users = await User.finaAll();
    return res.json({ users });
  } catch (error) {
    return next(error);
  }
});

/** GET /[username] => {user: user} */
//as a user, logged in you can see other people's profile
router.get('/:username', authRequired, async function(req, res, next) {
  try {
    const user = await User.findOne(req.params.username);
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

/** PATCH /[handle] {userData} => {user: updatedUser} */
// only the user him/herself can change his.her user
router.patch('/:username', ensureCorrectUser, async function(req, res, next) {
  try {
    // user cannot change the username
    if ('username' in req.body) {
      throw new APIError(400, 'You are not allowed to change username');
    }
    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

router.delete('/:username', ensureCorrectUser, async function(req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ message: `${username} is deleted!` });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
