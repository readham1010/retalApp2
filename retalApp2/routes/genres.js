const auth = require('../middleware/auth');
const { Genre, validate } = require('../models/genre');
const { validateId } = require('../models/id');
const express = require('express');
const router = express.Router();


// anyone can list genres. No need to check authontication nor authorization
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    if (!genres) { res.status(404).send('no genries found'); return; }
    if (genres.length < 1) { res.status(200).send('No Genres'); return; }
    res.send(genres);
});

// only authonticated users can add new Genres
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

// only authonticated users can update current Genres
router.put('/:id', auth, async (req, res) => {
    
    if (!validateId(req.params.id)) return res.status(400).send("Invalid object id");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findOneAndUpdate(req.params.id, { name: req.body.name }, {
        new: true,
        useFindAndModify:false
    });

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.delete('/:id', async (req, res) => {

    if (!validateId(req.params.id)) return res.status(400).send("Invalid object id");
    const genre = await Genre.findByIdAndRemove(req.params.id, { useFindAndModify:false});

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.get('/:id', async (req, res) => {
    if (!validateId(req.params.id)) return res.status(400).send("Invalid object id");
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});
module.exports = router;