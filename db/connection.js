const { MongoClient, ServerApiVersion } = require("mongodb")
const dotenv = require("dotenv").config()

const uri = process.env.DATABASE_CONNECTION_STRING || "";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        autoSelectFamily: false,
    },
});

let db = client.db("event_master");

module.exports = { db, client };