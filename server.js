const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// point to the right folders for route data
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// use the public folder
app.use(express.static('public'));

// parse POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});