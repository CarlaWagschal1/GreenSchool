const {getDB} = require('../db');

async function getScores() {
    const db = getDB();
    try {
        return await db.collection('scores').find().toArray();
    }
    catch (error) {
        console.log("Error in get Scores:", error);
        throw new Error('Internal server error');
    }
}

async function addScore(childrenId, gameId, score, date, errors, elapsedTime) {
    const db = getDB();
    try {
        await db.collection('scores').insertOne({
            childrenId,
            gameId,
            score,
            date,
            errors,
            elapsedTime
        });
    }
    catch (error) {
        console.log("Error in add Score:", error);
        throw new Error('Internal server error');
    }

}

async function getScoresByChildrenId(childrenId) {
    const db = getDB();
    try {
        return await db.collection('scores').find({childrenId}).toArray();
    }
    catch (error) {
        console.log("Error in get Scores by children id:", error);
        throw new Error('Internal server error');
    }
}

async function getScoresByChildrenIdAndGameId(childrenId, gameId) {
    const db = getDB();
    try {
        return await db.collection('scores').find({childrenId, gameId}).toArray();
    }
    catch (error) {
        console.log("Error in get Scores by children id and game id:", error);
        throw new Error('Internal server error');
    }
}

async function deleteScoresByChildrenId(childrenId) {
    const db = getDB();
    try {
        await db.collection('scores').deleteMany({childrenId});
    }
    catch (error) {
        console.log("Error in delete Scores by children id:", error);
        throw new Error('Internal server error');
    }
}

module.exports = {
    getScores,
    addScore,
    getScoresByChildrenId,
    getScoresByChildrenIdAndGameId,
    deleteScoresByChildrenId
}