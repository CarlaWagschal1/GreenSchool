const {getDB} = require('../db');
const ObjectId = require('mongodb').ObjectId;

async function getQuizs() {
    const db = getDB();
    try {
        return await db.collection('quizs').find().toArray();
    }
    catch (error) {
        console.log("Error in get Quizs:", error);
        throw new Error('Internal server error');
    }
}

async function getQuizById(quizId) {
    const db = getDB();
    try {
        const objectId = new ObjectId(quizId);
        return await db.collection('quizs').findOne({ _id: objectId });
    }
    catch (error) {
        console.log("Error in get Quiz by id:", error);
        throw new Error('Internal server error');
    }
}

async function createQuiz(educatorId, name, description, imageUrl) {
    const db = getDB();
    try {
        await db.collection('quizs').insertOne({
            educatorId,
            name,
            description,
            imageUrl
        });
    }
    catch (error) {
        console.log("Error in create Quiz:", error);
        throw new Error('Internal server error');
    }
}

async function getQuizsByEducatorId(educatorId) {
    const db = getDB();
    try {
        return await db.collection('quizs').find({ educatorId }).toArray();
    }
    catch (error) {
        console.log("Error in get Quizs by educator id:", error);
        throw new Error('Internal server error');
    }
}

async function deleteQuiz(quizId) {
    const db = getDB();
    try {
        const objectId = new ObjectId(quizId);
        await db.collection('quizs').deleteOne({ _id: objectId });
    }
    catch (error) {
        console.log("Error in delete Quiz:", error);
        throw new Error('Internal server error');
    }
}

async function updateQuiz(quizId, name, description, imageUrl) {
    const db = getDB();
    try {
        const objectId = new ObjectId(quizId);
        await db.collection('quizs').updateOne({ _id: objectId },
            { $set: {
                name,
                description,
                imageUrl
            }
        });
    }
    catch (error) {
        console.log("Error in update Quiz:", error);
        throw new Error('Internal server error');
    }
}

module.exports = {
    getQuizs,
    getQuizById,
    createQuiz,
    getQuizsByEducatorId,
    deleteQuiz,
    updateQuiz
}