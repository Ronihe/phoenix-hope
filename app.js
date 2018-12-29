/* express app for goals */

const express = require('express');

const APIError = require('./helpers/APIError');

const usersRoutes = require('./routes/users');
const goalsRoutes = require('./routes/goals');
const stepsRoutes = require('./routes/steps');
const authRoutes = require('./routes/auth');

/* add logging system */
const morgan = require('morgan');

const app = express();

//middlewares
app.use(express.json());

app.use(morgan('tiny'));

app.use('/goals', goalsRoutes);
app.use('/steps', stepsRoutes);
app.use('/users', usersRoutes);
app.use('/', authRoutes);

/* 404 error handler */
app.get('*', function(req, res, next) {
  const err = new APIError(404, `${req.path} is not found`);
  return next(err);
});

/* general error handler */
app.use(function(err, req, res, next) {
  // all errors that get to here get coerced into API Errors
  if (!(err instanceof APIError)) {
    err = new APIError(err.status, err.message);
  }
  return res.status(err.status).json(err);
});
module.exports = app;
