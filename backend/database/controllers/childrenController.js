const {
    getChildren,
    createChildren,
    getChildrenByEducatorId
} = require('../collections/children');
const {getEducatorById} = require('../collections/educators');

async function getChildrenController(request, response) {
    try {
        const children = await getChildren(request, response);
        response.status(200).json(children);
    }
    catch (error) {
        console.log("Error in get children controller:", error)
        response.status(500).send('Internal server error');
    }
}

async function createChildrenController(request, response) {
    const {name, lastName, age, educatorId} = request.body;
    if(!name || !lastName || !age || !educatorId) {
        response.status(400).send('Name, lastName, age, and EducatorId are required');
        return;
    }
    const educator = await getEducatorById(response, educatorId);
    if (!educator) {
        response.status(400).send('Educator does not exist');
        return;
    }

    try {
        await createChildren(name, lastName, age, educatorId, response);
        response.status(201).send('Children created');
    }
    catch (error) {
        console.log("Error in create children controller:", error)
        response.status(500).send('Internal server error');
    }
}

async function getChildrenByEducatorIdController(request, response) {
    const educatorId = request.query.educatorId;
    if (!educatorId) {
        response.status(400).send('Educator id is required');
        return;
    }

    if (!await getEducatorById(response, educatorId)) {
        response.status(400).send('Educator does not exist');
        return;
    }

    try {
        const children = await getChildrenByEducatorId(response, educatorId);
        response.status(200).json(children);
    }
    catch (error) {
        console.log("Error in get children by Educator id controller:", error)
        response.status(500).send('Internal server error');
    }
}

module.exports = {
    getChildrenController,
    createChildrenController,
    getChildrenByEducatorIdController
}