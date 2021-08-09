// required external libraries including for unique ID
const route = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// other required files, including database and other modules
const { notes } = require('../../db/db');
const { createNewNote, findById, editNote, removeNote } = require('../../js/notes');

route.get('/notes', (req, res) => {
    res.json(notes);
});

route.post('/notes', (req, res) => {

    // create a new note, or edit existing note
    if (!req.body.id) {
        req.body.id = uuidv4();
        createNewNote(req.body, notes);
    } else {
        editNote(req.body, notes);
    }

    res.json(req.body);
});

// route to delete a note via its ID
route.delete('/notes/:id', (req, res) => {
    const note = findById(req.params.id, notes);

    removeNote(note, notes);
    res.json();
});

module.exports = route;