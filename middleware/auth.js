/** convenience middleware to handle common auth cases in routes*/
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const APIError = require('../helpers/APIError');

/** authRequired middleware to use when the user provide a token,
 *  Add username onto req as a convenience for view function.
 *  if not raise unauthorized.
 *  In a word, the user needs to be logged in for the view functions
 */

function authRequired(req, res, next) {
  try {
    console.log(req.body);
    const tokenStr = req.body._token;
    const token = jwt.verify(tokenStr, SECRET);
    req.username = token.username;
    console.log(req.username);
    return next();
  } catch (err) {
    return next(new APIError(401, 'You must authenticate first'));
  }
}

/** ensureCorrectUser to use when they must provide a valid token & be user matching
 * username provided as route param
 * Add username onto req as convenience  for view functions
 * if not, raises Unauthorized.
 */

function ensureCorrectUser(req, res, next) {
  try {
    const tokenStr = req.body._token;
    let token = jwt.verify(tokenStr, SECRET);
    req.username = token.username;
    if (token.username === req.params.username) {
      return next();
    }
    // throw a new err, and we will catch it in the catch below
    throw new Error();
  } catch (err) {
    return next(new APIError(401, 'Unauthorized user!'));
  }
}

// logout

module.exports = {
  authRequired,
  ensureCorrectUser
};
