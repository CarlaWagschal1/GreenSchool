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
async function createChildren(name, lastName, age, educatorId, response) {
    const db = getDB();
    try {
        await db.collection('children').insertOne({
            name,
            lastName,
            age,
            educatorId
        });
    }
    catch (error) {
        console.log("Error in create children:", error)
        response.status(500).send('Internal server error');
    }
}

async function getChildrenByEducatorId(response, educatorId) {
    const db = getDB();
    try {
        return await db.collection('children').find({educatorId}).toArray();
    }
    catch (error) {
        console.log("Error in get children by Educator id:", error)
        response.status(500).send('Internal server error');
    }
}

module.exports = {
    getChildren,
    createChildren,
    getChildrenByEducatorId
}