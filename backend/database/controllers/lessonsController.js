const {
    getLessons,
    getLessonById,
    createLesson,
    getLessonsByEducatorId,
    deleteLesson
} = require('../collections/lessons');

const {getEducatorById} = require('../collections/educators');
const {
    deleteChaptersByLessonId
} = require('../collections/chapters');

async function getLessonsController(request, response) {
    try {
        const lessons = await getLessons();
        response.status(200).json(lessons);
    }
    catch (error) {
        console.log("Error in get lessons controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function getLessonByIdController(request, response) {
    const {lessonId} = request.params;
    console.log("Id:", lessonId)
    if (!lessonId) {
        response.status(400).json({message: 'Id is required'})
        return;
    }

    try {
        const lesson = await getLessonById(lessonId);
        response.status(200).json(lesson);
    }
    catch (error) {
        console.log("Error in get lesson by id controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function createLessonController(request, response) {
    const {name, description} = request.body;
    const educatorId = request.user.id;
    const imageUrl = request.file ? `/uploads/${request.file.filename}` : null;

    if (!name || !description || !imageUrl || !educatorId) {
        response.status(400).json({message: 'Name, description, image url, and educator id are required'})
        return;
    }
    const educator = await getEducatorById(educatorId);
    if (!educator) {
        response.status(400).json({message: 'Educator does not exist'});
        return;
    }

    try {
        await createLesson(educatorId, name, description, imageUrl);
        const newLesson = await getLessonsByEducatorId(educatorId);
        const newLessonId = newLesson[newLesson.length - 1]._id;
        response.status(201).json({message: 'Lesson created', lessonId: newLessonId});
    }
    catch (error) {
        console.log("Error in create lesson controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function deleteLessonController(request, response) {
    const {lessonId} = request.params;
    if (!lessonId) {
        response.status(400).json({message: 'Id is required'})
        return;
    }

    try {
        await deleteChaptersByLessonId(lessonId);
        await deleteLesson(lessonId);
        response.status(200).json({message: 'Lesson deleted'});
    }
    catch (error) {
        console.log("Error in delete lesson controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

module.exports = {
    getLessonsController,
    getLessonByIdController,
    createLessonController,
    deleteLessonController
}