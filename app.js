/* express app for goals */

const express = require('express');

/* add logging system */
const morgan = require('morgan');

const app = express();

//middlewares
app.use(express.json());

app.use(morgan('tiny'));
