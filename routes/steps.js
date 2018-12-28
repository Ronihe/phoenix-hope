// API for authentication, return a token

const User = require('../models/User');
const express = require('express');
const router = new express.Router();
const createToken = require('../helpers/createToken');

module.exports = router;
