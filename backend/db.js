const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async () => {
    try {
        await client.connect();
        console.log('MongoDB connected');
        return client.db('mydatabase');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
