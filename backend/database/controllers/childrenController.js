const {
    getChildren,
    createChildren,
    getChildrenByUserId
} = require('../collections/children');
const {getUserById} = require('../collections/users');

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
    const {name, lastName, age, userId} = request.body;
    if(!name || !lastName || !age || !userId) {
        response.status(400).send('Name, lastName, age, and userId are required');
        return;
    }
    const user = await getUserById(response, userId);
    if (!user) {
        response.status(400).send('User does not exist');
        return;
    }

    try {
        await createChildren(name, lastName, age, userId, response);
        response.status(201).send('Children created');
    }
    catch (error) {
        console.log("Error in create children controller:", error)
        response.status(500).send('Internal server error');
    }
}

async function getChildrenByUserIdController(request, response) {
    const userId = request.query.userId;
    if (!userId) {
        response.status(400).send('User id is required');
        return;
    }

    if (!await getUserById(response, userId)) {
        response.status(400).send('User does not exist');
        return;
    }

    try {
        const children = await getChildrenByUserId(response, userId);
        response.status(200).json(children);
    }
    catch (error) {
        console.log("Error in get children by user id controller:", error)
        response.status(500).send('Internal server error');
    }
}

module.exports = {
    getChildrenController,
    createChildrenController,
    getChildrenByUserIdController
}