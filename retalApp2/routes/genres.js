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

router.post('/',  async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

module.exports = router;