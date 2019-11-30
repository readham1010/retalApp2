const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();

// anyone can list genres. No need to check authontication nor authorization
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    if (!genres) res.status(404).send('no genries found');
    res.send(genres);
});

module.exports = router;