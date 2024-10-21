const express = require('express');
const path = require('node:path');
const { errorHandlers } = require('./middleware');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use(express.static(path.resolve(process.env.STATIC_FOLDER)));

app.use('/api', router);

app.use(errorHandlers.errorHandler);

module.exports = app;
