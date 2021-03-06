// API for authentication, return a token

const User = require('../models/User');
const express = require('express');
const router = new express.Router();
const createToken = require('../helpers/createToken');
const Twilio = require('../models/Twilio');
const { validate } = require('jsonschema');
const registrationSchema = require('../schema/registrationSchema');
const APIError = require('../helpers/APIError');

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
    const result = validate(req.body, registrationSchema);
    if (!result.valid) {
      let message = result.errors.map(error => error.stack);
      let status = 400;
      let error = new APIError(message, status);
      return next(error);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    const phone = req.body.phone;
    await Twilio.sendMsg('Goal do it! Welcome to our big family!', phone);
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
