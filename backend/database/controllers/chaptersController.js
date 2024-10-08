const {
    getChapters,
    getChapterById,
    createChapter,
    getChaptersByLessonId,
    deleteChapter
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
    const imageUrl = request.file ? `/uploads/${request.file.filename}` : null;
    console.log('Request body:', request.body)
    console.log('Lesson id:', lessonId)
    console.log('Name:', name)
    console.log('Description:', description)
    console.log('Image URL:', imageUrl)

    if (!lessonId || !name || !description || !imageUrl) {
        response.status(400).json({message: 'Lesson id, name, and description are required'})
        return;
    }
    const lesson = await getLessonById(lessonId);
    if (!lesson) {
        response.status(400).json({message: 'Lesson does not exist'});
        return;
    }

    try {
        await createChapter(lessonId, name, description, imageUrl);
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

async function deleteChapterController(request, response) {
    const {chapterId} = request.params;
    if (!chapterId) {
        response.status(400).json({message: 'Id is required'})
        return;
    }

    try {
        await deleteChapter(chapterId);
        response.status(200).json({message: 'Chapter deleted'});
    }
    catch (error) {
        console.log("Error in delete chapter controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}



module.exports = {
    getChaptersController,
    getChapterByIdController,
    createChapterController,
    getChaptersByLessonIdController,
    deleteChapterController,
}

