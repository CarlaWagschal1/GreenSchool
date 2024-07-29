const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');


dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let _db;

const connectDB = async (callback) => {
    try {
        await client.connect();
        _db = client.db();

        console.log("Connect to db : ", uri);
        await _db.createCollection('educators');
        console.log("Collection 'educators' created");
        await _db.createCollection('children');
        console.log("Collection 'children' created");
        await _db.createCollection('scores');
        console.log("Collection 'scores' created");
        await _db.createCollection('lessons');
        console.log("Collection 'lessons' created");
        await _db.createCollection('chapters');
        console.log("Collection 'chapters' created");

        console.log('MongoDB connected');
        return callback(null);
    } catch (err) {
        return(callback(err));
    }
};

const getDB = () => _db

const disconnectDB = () => _db.close()

module.exports = { connectDB, getDB, disconnectDB }
