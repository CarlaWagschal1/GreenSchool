const {
    getScores,
    addScore,
    getScoresByChildrenId
}
= require('../collections/scores');

const {
    getChildrenById
} = require('../collections/children');

const jwt = require('jsonwebtoken');


async function getScoresController(request, response) {
    try {
        const scores = await getScores();
        response.status(200).json(scores);
    }
    catch (error) {
        console.log("Error in get Scores controller:", error)
        response.status(500).json({message: 'Internal server error'});
    }
}

async function addScoreController(request, response) {
    const {childrenToken, gameID, score, date, errors, elapsedTime} = request.body;

    if (!childrenToken || !score || !date || !errors || !elapsedTime) {
        response.status(400).json({message: 'Children token, score, date, false results and time are required'});
        return;
    }
    const childrenId = jwt.verify(childrenToken, process.env.JWT_SECRET).id;
    if (!childrenId) {
        response.status(400).json({message: 'Invalid token'});
        return;
    }
    const existChildren = await getChildrenById(childrenId);
    if (!existChildren) {
        response.status(400).json({message: 'Invalid children'});
        return;
    }

    try {
        await addScore(childrenId, gameID, score, date, errors, elapsedTime);
        response.status(200).json({message: 'Score added'});
    }
    catch (error) {
        console.log("Error in add score controller:", error)
        response.status(500).json({message: 'Internal server error'});
    }
}

async function getScoresByChildrenIdController(request, response) {
    const {childrenToken} = request.body;
    if (!childrenToken) {
        response.status(400).json({message: 'Children token is required'});
        return;
    }
    const childrenId = jwt.verify(childrenToken, process.env.JWT_SECRET).id;
    if (!childrenId) {
        response.status(400).json({message: 'Invalid token'});
        return;
    }
    try {
        const scores = await getScoresByChildrenId(childrenId);
        response.status(200).json(scores);
    }
    catch (error) {
        console.log("Error in get Scores by children id controller:", error)
        response.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    getScoresController,
    addScoreController,
    getScoresByChildrenIdController
}