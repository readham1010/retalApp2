'use strict';
const { createLogger,  transports } = require('winston');
const express = require('express');
const app = express();

const logger = createLogger({
        transports: [new transports.Console()]
})

const port = process.env.PORT || 3000;

app.listen(port, () => logger.log({
    level: 'info',
    message: `Listening on port ${port}...`
}));