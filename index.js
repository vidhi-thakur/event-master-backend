const express = require('express')
const dotenv = require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());

app.use('/api/event', require('./routes/single_event.js'));
app.use('/api/events', require('./routes/events.js'));

app.listen(PORT, () => {
    console.log("listening to port ", PORT);
})

module.exports = app;