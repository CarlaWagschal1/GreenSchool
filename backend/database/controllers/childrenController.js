const {
    getChildren,
    getChildrenById,
    createChildren,
    getChildrenByEducatorId,
    verifyEducatorWithChildren,
    updateChildren,
    deleteChildren
} = require('../collections/children');

const {deleteScoresByChildrenId} = require("../collections/scores");

const {getEducatorById} = require('../collections/educators');
const jwt = require('jsonwebtoken');

async function getChildrenController(request, response) {
    try {
        const children = await getChildren(request, response);
        response.status(200).json(children);
    }
    catch (error) {
        console.log("Error in get children controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function createChildrenController(request, response) {
    const {name, lastName, age} = request.body;
    const educatorId = request.user.id;
    if(!name || !lastName || !age || !educatorId) {
        response.status(400).json({message: 'Name, last name, age, and educator id are required'})
        return;
    }
    const educator = await getEducatorById(educatorId);
    if (!educator) {
        response.status(400).json({message: 'Educator does not exist'});
        return;
    }

    try {
        await createChildren(name, lastName, age, educatorId, response);
        response.status(201).json({message: 'Child created'});
    }
    catch (error) {
        console.log("Error in create children controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function getChildrenByEducatorIdController(request, response) {
    const educatorId = request.user.id;
    if (!educatorId) {
        response.status(400).json({message: 'Educator id is required'})
        return;
    }

    const educator = await getEducatorById(educatorId);
    if (!educator) {
        response.status(400).json({message: 'Educator does not exist'})
        return;
    }

    try {
        const children = await getChildrenByEducatorId(response, educatorId);
        response.status(200).json(children);
    }
    catch (error) {
        console.log("Error in get children by Educator id controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}


async function playChildrenController(request, response) {
    const {childrenId, educatorToken} = request.body;

    const decoded = jwt.verify(educatorToken, process.env.JWT_SECRET);
    const educatorId = decoded.id;


    if (!childrenId || !educatorId) {
        response.status(400).json({message: 'Children id and educator id are required'})
        return;
    }

    const educator = await getEducatorById(educatorId);

    if (!educator) {
        response.status(400).json({message: 'Educator does not exist'})
        return;
    }

    const children = await getChildrenById(childrenId);

    if (!children) {
        response.status(400).json({message: 'Children does not exist'})
        return;
    }


    try {
        await verifyEducatorWithChildren(educatorId, childrenId);
        const childrenToken = jwt.sign({id: children._id, educatorId: educatorId}, process.env.JWT_SECRET, {expiresIn: '1h'});
        response.status(200).json({childrenToken: childrenToken})
    }
    catch (error) {
        console.log("Error in connect children controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function getChildrenByIdController(request, response) {
    const childrenId = request.params.childrenId;
    if(!childrenId) {
        response.status(400).json({message: 'Children id is required'})
        return;
    }
    try {
        const children = await getChildrenById(childrenId);
        response.status(200).json(children);
    }
    catch (error) {
        console.log("Error in get children by id controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function updateChildrenController(request, response) {
    const childrenId = request.params.childrenId;
    const {name, lastName, age} = request.body;
    if(!childrenId) {
        response.status(400).json({message: 'Children id is required'})
        return;
    }
    try {
        await updateChildren(childrenId, name, lastName, age);
        response.status(200).json({message: 'Children updated'});
    }
    catch (error) {
        console.log("Error in update children controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}

async function deleteChildrenController(request, response) {
    const childrenId = request.params.childrenId;
    if(!childrenId) {
        response.status(400).json({message: 'Children id is required'})
        return;
    }
    try {
        await deleteScoresByChildrenId(childrenId);
        await deleteChildren(childrenId);
        response.status(200).json({message: 'Children deleted'});
    }
    catch (error) {
        console.log("Error in delete children controller:", error)
        response.status(500).json({message: 'Internal server error'})
    }
}


module.exports = {
    getChildrenController,
    createChildrenController,
    getChildrenByEducatorIdController,
    playChildrenController,
    getChildrenByIdController,
    updateChildrenController,
    deleteChildrenController
}