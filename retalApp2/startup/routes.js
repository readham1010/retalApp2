const express = require('express');
const genres = require('../routes/genres');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/genres', genres);
   
}