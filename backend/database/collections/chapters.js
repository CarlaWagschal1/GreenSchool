const {getDB} = require('../db');
const ObjectId = require('mongodb').ObjectId;


async function getChapters() {
    const db = getDB();
    try {
        return await db.collection('chapters').find().toArray();
    }
    catch (error) {
        console.log("Error in get Chapters:", error);
        throw new Error('Internal server error');
    }
}

async function getChapterById(chapterId) {
    const db = getDB();
    try {
        return await db.collection('chapters').findOne({ _id: chapterId });
    }
    catch (error) {
        console.log("Error in get Chapter by id:", error);
        throw new Error('Internal server error');
    }
}

async function createChapter(lessonId, name, description, imageUrl) {
    const db = getDB();
    try {
        await db.collection('chapters').insertOne({
            lessonId,
            name,
            description,
            imageUrl
        });
    }
    catch (error) {
        console.log("Error in create Chapter:", error);
        throw new Error('Internal server error');
    }
}

async function getChaptersByLessonId(lessonId) {
    const db = getDB();
    try {
        return await db.collection('chapters').find({ lessonId }).toArray();
    }
    catch (error) {
        console.log("Error in get Chapters by lesson id:", error);
        throw new Error('Internal server error');
    }
}

async function deleteChapter(chapterId) {
    const db = getDB();
    try {
        const objectId = new ObjectId(chapterId);
        await db.collection('chapters').deleteOne({ _id: objectId });
    }
    catch (error) {
        console.log("Error in delete Chapter:", error);
        throw new Error('Internal server error');
    }
}

async function deleteChaptersByLessonId(lessonId) {
    const db = getDB();
    try {
        await db.collection('chapters').deleteMany({ lessonId });
    }
    catch (error) {
        console.log("Error in delete Chapters by lesson id:", error);
        throw new Error('Internal server error');
    }
}

module.exports = {
    getChapters,
    getChapterById,
    createChapter,
    getChaptersByLessonId,
    deleteChapter,
    deleteChaptersByLessonId
}
