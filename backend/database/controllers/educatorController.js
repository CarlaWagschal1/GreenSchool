const {
    getEducators,
    emailAlreadyExists,
    createEducator,
    loginEducator,
    getEducatorById,
    changeChildrenLogoutPassword
} = require('../collections/educators');




async function getEducatorsController(request, response) {
    try {
        const educators = await getEducators(request, response);
        response.status(200).json(educators);
    }
    catch (error) {
        console.log("Error in get Educators controller:", error)
        response.status(500).send('Internal server error');
    }
}

async function createEducatorsController(request, response) {
    const {name, email, password} = request.body;
    if (!name || !email || !password) {
        response.status(400).send('Name, email, and password are required');
        return;
    }
    const educatorExist = await emailAlreadyExists(response, email);
    console.log('After find')
    if (educatorExist) {
        console.log("Educator:", educatorExist)
        response.status(400).send('Educator with that email already exists');
        return;
    }

    try {
        await createEducator(name, email, password, response);
        response.status(201).send('Educator created');
    }
    catch (error) {
        console.log("Error in create Educators controller:", error)
        response.status(500).send('Internal server error');
    }
}

async function changeChildrenLogoutPasswordController(request, response) {
    const {password, newChildrenLogoutPassword} = request.body;
    const educatorId = request.query.educatorId;
    if(!password){
        response.status(400).send('Password is required');
        return;
    }

    if (!newChildrenLogoutPassword || !educatorId) {
        response.status(400).send('New password and EducatorId are required');
        return;
    }
    if(!await getEducatorById(response, educatorId)){
        response.status(400).send('Educator does not exist');
        return;
    }
    try {
        await changeChildrenLogoutPassword(response, educatorId, password, newChildrenLogoutPassword);
        response.status(200).send('Password changed');
    }
    catch (error) {
        console.log("Error in change children logout password controller:", error)
        response.status(500).send('Internal server error');
    }

}

async function loginController(request, response) {
    const {email, password} = request.body;
    if (!email || !password) {
        response.status(400).send('Email and password are required');
        return;
    }

    const educatorExist = await emailAlreadyExists(response, email);
    if (!educatorExist) {
        response.status(400).send('Invalid credentials');
        return;
    }

    try {
        await loginEducator(request, response);
        console.log('Login successful')
        response.status(200).send('Login successful');
    }
    catch (error) {
        console.log("Error in login controller:", error)
        response.status(500).send('Internal server error');
    }
}

module.exports = {
    getEducatorsController,
    createEducatorsController,
    loginController,
    changeChildrenLogoutPasswordController
}