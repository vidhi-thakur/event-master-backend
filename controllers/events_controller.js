const { client, db } = require("../db/connection")

const getAllEvents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        await client.connect();
        const events = await db.collection("events").find().skip(skip).limit(limit).toArray();
        const hasMore = await db.collection("events").countDocuments() > (page * limit);
        res.send({ success: true, events, hasMore })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'Failed to fetch events' });
    } finally {
        await client.close();
    }
}

module.exports = { getAllEvents }