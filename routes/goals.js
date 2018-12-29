// API for managing goals in the system

const User = require('../models/goal');
const express = require('express');
const router = new express.Router();
const createToken = require('../helpers/createToken');
const APIError = require('../helpers/APIError');
const { authRequired, ensureCorrectUser } = require('../middleware/auth');

module.exports = router;
