const {getDB} = require('../db');

async function getChildren(request, response) {
    const db = getDB();
    try {
        return await db.collection('children').find().toArray();
    }
    catch (error) {
        console.log("Error in get children:", error)
        response.status(500).send('Internal server error');
    }
}
async function createChildren(name, lastName, age, userId, response) {
    const db = getDB();
    try {
        await db.collection('children').insertOne({
            name,
            lastName,
            age,
            userId
        });
    }
    catch (error) {
        console.log("Error in create children:", error)
        response.status(500).send('Internal server error');
    }
}

async function getChildrenByUserId(response, userId) {
    const db = getDB();
    try {
        return await db.collection('children').find({userId}).toArray();
    }
    catch (error) {
        console.log("Error in get children by user id:", error)
        response.status(500).send('Internal server error');
    }
}

module.exports = {
    getChildren,
    createChildren,
    getChildrenByUserId
}