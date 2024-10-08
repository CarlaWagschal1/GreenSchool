const {getDB} = require('../db');
const {ObjectId} = require("mongodb");

async function getChildren() {
    const db = getDB();
    try {
        return await db.collection('children').find().toArray();
    }
    catch (error) {
        console.log("Error in get children:", error)
        throw new Error('Internal server error');
    }
}

async function getChildrenById(childrenId) {
    const db = getDB();
    try {
        const childrenObjId = new ObjectId(childrenId);
        return await db.collection('children').findOne({_id: childrenObjId})
    }
    catch (error) {
        console.log("Error in get children by id:", error)
        throw new Error('Internal server error');
    }
}

async function createChildren(name, lastName, age, educatorId, fontSize) {
    const db = getDB();
    try {
        await db.collection('children').insertOne({
            name,
            lastName,
            age,
            educatorId,
            fontSize
        });
    }
    catch (error) {
        console.log("Error in create children:", error)
        throw new Error('Internal server error');
    }
}

async function getChildrenByEducatorId(response, educatorId) {
    const db = getDB();
    try {
        return await db.collection('children').find({educatorId}).toArray();
    }
    catch (error) {
        console.log("Error in get children by Educator id:", error)
        throw new Error('Internal server error');
    }
}

async function verifyEducatorWithChildren(educatorId, childId) {
    const db = getDB();
    try {
        const child = await db.collection('children').findOne({_id: childId});
        if (!child) {
            return false;
        }
        return child.educatorId === educatorId;
    }
    catch (error) {
        console.log("Error in verify educator with children:", error)
        throw new Error('Internal server error');
    }
}

async function updateChildren(childrenId, name, lastName, age, fontSize) {
    const db = getDB();
    try {
        const childrenObjId = new ObjectId(childrenId);
        await db.collection('children').updateOne({_id: childrenObjId}, {$set: {name, lastName, age, fontSize}});
    }
    catch (error) {
        console.log("Error in update children:", error)
        throw new Error('Internal server error');
    }
}

async function deleteChildren(childrenId) {
    const db = getDB();
    try {
        const childrenObjId = new ObjectId(childrenId);
        await db.collection('children').deleteOne({_id: childrenObjId});
    }
    catch (error) {
        console.log("Error in delete children:", error)
        throw new Error('Internal server error');
    }
}

module.exports = {
    getChildren,
    getChildrenById,
    createChildren,
    getChildrenByEducatorId,
    verifyEducatorWithChildren,
    updateChildren,
    deleteChildren
}