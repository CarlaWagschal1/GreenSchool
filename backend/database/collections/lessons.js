const {getDB} = require('../db');


async function getLessons() {
    const db = getDB();
    try {
        const lessons = await db.collection('lessons').find().toArray();
        console.log('Lessons:', lessons);
        return lessons;
    }
    catch (error) {
        console.log("Error in get Lessons:", error);
        throw new Error('Internal server error');
    }
}

async function getLessonById(lessonId) {
    const db = getDB();
    try {
        return await db.collection('lessons').findOne({ _id: lessonId });
    }
    catch (error) {
        console.log("Error in get Lesson by id:", error);
        throw new Error('Internal server error');
    }
}

async function createLesson(educatorId, name, description, imageUrl) {
    const db = getDB();
    try {
        await db.collection('lessons').insertOne({
            educatorId,
            name,
            description,
            imageUrl
        });
        console.log("Lesson created successfully");
        console.log("image url:", imageUrl);
    }
    catch (error) {
        console.log("Error in create Lesson:", error);
        throw new Error('Internal server error');
    }
}

module.exports = {
    getLessons,
    getLessonById,
    createLesson
}