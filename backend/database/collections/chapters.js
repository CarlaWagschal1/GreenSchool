const {getDB} = require('../db');


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

async function createChapter(lessonId, name, description) {
    const db = getDB();
    try {
        await db.collection('chapters').insertOne({
            lessonId,
            name,
            description
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

module.exports = {
    getChapters,
    getChapterById,
    createChapter,
    getChaptersByLessonId
}
