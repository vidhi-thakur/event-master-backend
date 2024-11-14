const { client, db } = require("../db/connection")
const { ObjectId } = require('mongodb');

const fetchEvent = async (req, res) => {
    try {
        const eventId = new ObjectId(req.params.id);

        await client.connect();
        const event = await db.collection("events").findOne({ _id: eventId });

        if (!event) {
            console.log("Event not found for _id:", eventId);
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        return res.json({ success: true, event });
    } catch (error) {
        console.error("Error fetching event:", error);
        return res.status(500).send({ error: 'Failed to fetch event' });
    } finally {
        await client.close();
    }
}

const updateEvent = async (req, res) => {
    try {
        const eventId = new ObjectId(req.params.id);
        const updatedData = {
            "title": "Test camp 2",
        };
        await client.connect();
        const event = await db.collection("events").updateOne({ _id: eventId }, { $set: updatedData });
        return res.json({ success: true, event })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Failed to fetch event' });
    } finally {
        await client.close();
    }
}

const createEvent = async (req, res) => {
    try {
        const data = req.body

        await client.connect()
        const event = await db.collection("events").insertOne(data)
        return res.json({ success: true, eventId: event.insertedId })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Failed to create event' });
    } finally {
        await client.close();
    }
}

const deleteEvent = async (req, res) => {
    try {
        const eventId = new ObjectId(req.params.id);

        await client.connect()
        const result = await db.collection("events").deleteOne({ _id: eventId });
        if (result.deletedCount === 1) {
            return res.send({ success: true, message: 'Event deleted successfully' });
        } else {
            return res.status(404).send({ error: 'Event not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Failed to fetch event' });
    } finally {
        await client.close();
    }
}

module.exports = { fetchEvent, updateEvent, createEvent, deleteEvent }
