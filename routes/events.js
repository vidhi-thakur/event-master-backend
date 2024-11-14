const express = require('express')
const router = express.Router();

const { getAllEvents } = require("../controllers/events_controller")

router.route('/').get(getAllEvents)

module.exports = router