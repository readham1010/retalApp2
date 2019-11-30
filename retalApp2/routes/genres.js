const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();

// anyone can list genres. No need to check authontication nor authorization
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    if (!genres) { res.status(404).send('no genries found'); return; }
    if (genres.length < 1) { res.status(200).send('No Genres'); return; }
    res.send(genres);
});

module.exports = router;