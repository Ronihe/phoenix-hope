// API for authentication, return a token

const User = require('../models/User');
const express = require('express');
const router = new express.Router();
const createToken = require('../helpers/createToken');

router.post('/login', async function(req, res, next) {
  try {
    const user = await User.authenticate(req.body);
    console.log(user);
    const token = createToken(user);
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
});

router.post('/register', async function(req, res, next) {
  try {
    const user = await User.register(req.body);
    const token = createToken(user);
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;