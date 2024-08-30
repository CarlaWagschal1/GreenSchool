const {getDB} = require('../db');
const ObjectId = require('mongodb').ObjectId;

async function getQuestions() {
    const db = getDB();
    try {
        return await db.collection('questions').find().toArray();
    }
    catch (error) {
        console.log("Error in get Questions:", error);
        throw new Error('Internal server error');
    }
}

async function getQuestionById(questionId) {
    const db = getDB();
    try {
        const objectId = new ObjectId(questionId);
        return await db.collection('questions').findOne({ _id: objectId });
    }
    catch (error) {
        console.log("Error in get Question by id:", error);
        throw new Error('Internal server error');
    }
}

async function createQuestion(quizId, question, options, correctOption, imageUrl) {
    const db = getDB();
    try {
        await db.collection('questions').insertOne({
            quizId,
            question,
            options,
            correctOption,
            imageUrl
        });
    }
    catch (error) {
        console.log("Error in create Question:", error);
        throw new Error('Internal server error');
    }
}

async function getQuestionsByQuizId(quizId) {
    const db = getDB();
    try {
        return await db.collection('questions').find({ quizId }).toArray();
    }
    catch (error) {
        console.log("Error in get Questions by quiz id:", error);
        throw new Error('Internal server error');
    }
}

async function deleteQuestion(questionId) {
    const db = getDB();
    try {
        const objectId = new ObjectId(questionId);
        await db.collection('questions').deleteOne({ _id: objectId });
    }
    catch (error) {
        console.log("Error in delete Question:", error);
        throw new Error('Internal server error');
    }
}

async function deleteQuestionsByQuizId(quizId) {
    const db = getDB();
    try {
        await db.collection('questions').deleteMany({ quizId });
    }
    catch (error) {
        console.log("Error in delete Questions by quiz id:", error);
        throw new Error('Internal server error');
    }
}

async function updateQuestion(questionId, question, options, correctOption, imageUrl) {
    const db = getDB();
    try {
        const objectId = new ObjectId(questionId);
        await db.collection('questions').updateOne({ _id: objectId }, {
            $set: {
                question,
                options,
                correctOption,
                imageUrl
            }
        });
    }
    catch (error) {
        console.log("Error in update Question:", error);
        throw new Error('Internal server error');
    }
}

module.exports = {
    getQuestions,
    getQuestionById,
    createQuestion,
    getQuestionsByQuizId,
    deleteQuestion,
    deleteQuestionsByQuizId,
    updateQuestion
}