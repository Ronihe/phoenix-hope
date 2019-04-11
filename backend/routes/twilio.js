const express = require('express');
const router = new express.Router();
const { TWILIO } = require('../config');
const User = require('../models/User');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { authRequired } = require(`../middleware/auth`);
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const moment = require('moment');

// router;

//twilio inbound message
router.post('/', async (req, res, next) => {
  // const tokenStr = req.body._token;
  // const token = jwt.verify(tokenStr, SECRET);
  // const username = token.username;
  const user = await User.findOne(TWILIO.username);
  const goals = user.goals;

  let goalsStr = '';
  goals.forEach(goal => {
    if (goal.state !== 'completed') {
      let due = moment(goal.due_date).format('L');
      goalsStr += `${goal.title} is due ${due}. `;
    }
  });

  // if (!goalsStr) {
  //   goalsStr = 'You dont have any goals. Set one goal now!';
  // }
  const twiml = new MessagingResponse();
  twiml.message(goalsStr);
  //twiml.message('test');

  const msgNotice = twiml.toString();
  res.writeHead(200, { 'Content-Type': 'text/xml' }); // the user will get the reply
  res.end(twiml.toString());
});

module.exports = router;
