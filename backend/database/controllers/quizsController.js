const {
    getQuizs,
    getQuizById,
    createQuiz,
    getQuizsByEducatorId,
    deleteQuiz,
    updateQuiz
} = require('../collections/quizs');

const {
    deleteQuestionsByQuizId
} = require("../collections/questions");

async function getQuizsController(request, response) {
    try {
        const quizs = await getQuizs();
        response.status(200).json(quizs);
    }
    catch (error) {
        console.log("Error in get quizs controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function getQuizByIdController(request, response) {
    const {quizId} = request.params;
    console.log("Id:", quizId)

    if (!quizId) {
        response.status(400).json({message: 'Id is required'})
        return;
    }

    try {
        const quiz = await getQuizById(quizId);
        response.status(200).json(quiz);
    }
    catch (error) {
        console.log("Error in get quiz by id controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function createQuizController(request, response) {
    const {name, description} = request.body;
    const educatorId = request.user.id;
    const imageUrl = request.file ? `/uploads/${request.file.filename}` : null;

    if (!name || !description || !imageUrl || !educatorId) {
        response.status(400).json({message: 'Name, description, image url, and educator id are required'})
        return;
    }

    try {
        await createQuiz(educatorId, name, description, imageUrl);
        const newQuiz = await getQuizsByEducatorId(educatorId);
        response.status(200).json(newQuiz);
    }
    catch (error) {
        console.log("Error in create quiz controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function getQuizsByEducatorIdController(request, response) {
    const educatorId = request.user.id;
    if (!educatorId) {
        response.status(400).json({message: 'Educator id is required'})
        return;
    }

    try {
        const quizs = await getQuizsByEducatorId(educatorId);
        response.status(200).json(quizs);
    }
    catch (error) {
        console.log("Error in get quizs by educator id controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function deleteQuizController(request, response) {
    const {quizId} = request.params;
    if (!quizId) {
        response.status(400).json({message: 'Id is required'})
        return;
    }

    try {
        await deleteQuestionsByQuizId(quizId);
        await deleteQuiz(quizId);
        response.status(200).json({message: 'Quiz deleted successfully'});
    }
    catch (error) {
        console.log("Error in delete quiz controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function updateQuizController(request, response) {
    const {quizId} = request.params;
    const {name, description} = request.body;
    const imageUrl = request.file ? `/uploads/${request.file.filename}` : null;

    if (!quizId || !name || !description || !imageUrl) {
        response.status(400).json({message: 'Id, name, description, and image url are required'})
        return;
    }

    try {
        await updateQuiz(quizId, name, description, imageUrl);
        response.status(200).json({message: 'Quiz updated successfully'});
    }
    catch (error) {
        console.log("Error in update quiz controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

module.exports = {
    getQuizsController,
    getQuizByIdController,
    createQuizController,
    getQuizsByEducatorIdController,
    deleteQuizController,
    updateQuizController
}
