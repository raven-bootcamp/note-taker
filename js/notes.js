// include required libraries
const fs = require('fs');
const path = require('path');

// create a new note by pushing it to an array and saving it to the file
const createNewNote = (note, notesArray) => {
    notesArray.push(note)
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
};

// find a certain note in the array by using its ID
const findById = (id, notesArray) => {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

// edit a note after having saved it previously, and save changes to the file
const editNote = (editedNote, notesArray) => {
    const index = notesArray.findIndex(note => note.id === editedNote.id);

    notesArray.splice(index, 1);
    notesArray.splice(index, 0, editedNote);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )
};

// remove a note from the array and write those changes to the file
const removeNote = (note, notesArray) => {
    const index = notesArray.indexOf(note);
    notesArray.splice(index, 1);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
};

module.exports = { createNewNote, findById, editNote, removeNote };