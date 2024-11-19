const express = require('express')
const dotenv = require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with specific origins if needed
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

app.use('/api/event', require('./api/event.js'));
app.use('/api/allevents', require('./api/allevents.js'));

app.listen(PORT, () => {
    console.log("listening to port ", PORT);
})

module.exports = app;