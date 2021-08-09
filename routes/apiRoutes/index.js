const route = require('express').Router();
const notesRoutes = require('./notesRoutes');

// use the other file
route.use(notesRoutes);

module.exports = route;