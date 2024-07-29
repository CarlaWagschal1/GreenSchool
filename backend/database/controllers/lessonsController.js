const {
    getLessons,
    getLessonById,
    createLesson
} = require('../collections/lessons');

const {getEducatorById} = require('../collections/educators');

async function getLessonsController(request, response) {
    try {
        const lessons = await getLessons();
        console.log("Lessons in controller:", lessons);
        response.status(200).json(lessons);
    }
    catch (error) {
        console.log("Error in get lessons controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function getLessonByIdController(request, response) {
    const {id} = request.params;
    if (!id) {
        response.status(400).json({message: 'Id is required'})
        return;
    }

    try {
        const lesson = await getLessonById(id);
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
    console.log("name", name, "description", description, "imageUrl", imageUrl, "educatorId", educatorId);
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
        response.status(201).json({message: 'Lesson created'});
    }
    catch (error) {
        console.log("Error in create lesson controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

module.exports = {
    getLessonsController,
    getLessonByIdController,
    createLessonController
}