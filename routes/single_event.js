const express = require('express')
const router = express.Router();
const { fetchEvent, updateEvent, createEvent, deleteEvent } = require('../controllers/single_event_controller')

router.route('/:id').get(fetchEvent).put(updateEvent).delete(deleteEvent)

router.route('/').post(createEvent)

module.exports = router;