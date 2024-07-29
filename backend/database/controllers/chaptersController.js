const {
    getChapters,
    getChapterById,
    createChapter,
    getChaptersByLessonId
} = require('../collections/chapters');

const {getLessonById} = require('../collections/lessons');

async function getChaptersController(request, response) {
    try {
        const chapters = await getChapters();
        response.status(200).json(chapters);
    }
    catch (error) {
        console.log("Error in get chapters controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function getChapterByIdController(request, response) {
    const {id} = request.params;
    if (!id) {
        response.status(400).json({message: 'Id is required'})
        return;
    }

    try {
        const chapter = await getChapterById(id);
        response.status(200).json(chapter);
    }
    catch (error) {
        console.log("Error in get chapter by id controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function createChapterController(request, response) {
    const {lessonId, name, description} = request.body;
    if (!lessonId || !name || !description) {
        response.status(400).json({message: 'Lesson id, name, and description are required'})
        return;
    }
    const lesson = await getLessonById(lessonId);
    if (!lesson) {
        response.status(400).json({message: 'Lesson does not exist'});
        return;
    }

    try {
        await createChapter(lessonId, name, description);
        response.status(201).json({message: 'Chapter created'});
    }
    catch (error) {
        console.log("Error in create chapter controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function getChaptersByLessonIdController(request, response) {
    const {lessonId} = request.params;
    if (!lessonId) {
        response.status(400).json({message: 'Lesson id is required'})
        return;
    }

    const lesson = await getLessonById(lessonId);
    if (!lesson) {
        response.status(400).json({message: 'Lesson does not exist'})
        return;
    }

    try {
        const chapters = await getChaptersByLessonId(lessonId);
        response.status(200).json(chapters);
    }
    catch (error) {
        console.log("Error in get chapters by lesson id controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

module.exports = {
    getChaptersController,
    getChapterByIdController,
    createChapterController,
    getChaptersByLessonIdController
}

