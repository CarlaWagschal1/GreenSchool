const {
    getQuestions,
    getQuestionById,
    createQuestion,
    getQuestionsByQuizId,
    deleteQuestion,
    updateQuestion
} = require('../collections/questions');

async function getQuestionsController(request, response) {
    try {
        const questions = await getQuestions();
        response.status(200).json(questions);
    }
    catch (error) {
        console.log("Error in get questions controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function getQuestionByIdController(request, response) {
    const {questionId} = request.params;
    console.log("Id:", questionId)

    if (!questionId) {
        response.status(400).json({message: 'Id is required'})
        return;
    }

    try {
        const question = await getQuestionById(questionId);
        response.status(200).json(question);
    }
    catch (error) {
        console.log("Error in get question by id controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function createQuestionController(request, response) {
    const {quizId, question, options, correctOption} = request.body;
    const imageUrl = request.file ? `/uploads/${request.file.filename}` : null;

    if (!quizId || !question || !options || !correctOption || !imageUrl) {
        response.status(400).json({message: 'Quiz id, question, options, and correct option are required'})
        return;
    }

    try {
        await createQuestion(quizId, question, options, correctOption, imageUrl);
        response.status(201).json({message: 'Question created'});
    }
    catch (error) {
        console.log("Error in create question controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function getQuestionsByQuizIdController(request, response) {
    const {quizId} = request.params;
    if (!quizId) {
        response.status(400).json({message: 'Quiz id is required'})
        return;
    }

    try {
        const questions = await getQuestionsByQuizId(quizId);
        response.status(200).json(questions);
    }
    catch (error) {
        console.log("Error in get questions by quiz id controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function deleteQuestionController(request, response) {
    const {questionId} = request.params;
    if (!questionId) {
        response.status(400).json({message: 'Id is required'})
        return;
    }

    try {
        await deleteQuestion(questionId);
        response.status(200).json({message: 'Question deleted'});
    }
    catch (error) {
        console.log("Error in delete question controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function updateQuestionController(request, response) {
    const {questionId} = request.params;
    const {question, options, correctOption} = request.body;
    const imageUrl = request.file ? `/uploads/${request.file.filename}` : null;

    if (!questionId || !question || !options || !correctOption || !imageUrl) {
        response.status(400).json({message: 'Id, question, options, and correct option are required'})
        return;
    }

    try {
        await updateQuestion(questionId, question, options, correctOption);
        response.status(200).json({message: 'Question updated'});
    }
    catch (error) {
        console.log("Error in update question controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

module.exports = {
    getQuestionsController,
    getQuestionByIdController,
    createQuestionController,
    getQuestionsByQuizIdController,
    deleteQuestionController,
    updateQuestionController
};