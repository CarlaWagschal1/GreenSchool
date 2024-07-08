const {
    getUsers,
    emailAlreadyExists,
    createUser,
    loginUser
} = require('../collections/users');




async function getUsersController(request, response) {
    try {
        const users = await getUsers(request, response);
        response.status(200).json(users);
    }
    catch (error) {
        console.log("Error in get users controller:", error)
        response.status(500).send('Internal server error');
    }
}

async function createUsersController(request, response) {
    const {name, email, password} = request.body;
    if (!name || !email || !password) {
        response.status(400).send('Name, email, and password are required');
        return;
    }
    const userExist = await emailAlreadyExists(response, email);
    console.log('After find')
    if (userExist) {
        console.log("user:", userExist)
        response.status(400).send('User with that email already exists');
        return;
    }

    try {
        await createUser(name, email, password, response);
        response.status(201).send('User created');
    }
    catch (error) {
        console.log("Error in create users controller:", error)
        response.status(500).send('Internal server error');
    }
}

async function loginController(request, response) {
    const {email, password} = request.body;
    if (!email || !password) {
        response.status(400).send('Email and password are required');
        return;
    }

    const userExist = await emailAlreadyExists(response, email);
    if (!userExist) {
        response.status(400).send('Invalid credentials');
        return;
    }

    try {
        await loginUser(request, response);
        console.log('Login successful')
        response.status(200).send('Login successful');
    }
    catch (error) {
        console.log("Error in login controller:", error)
        response.status(500).send('Internal server error');
    }
}

module.exports = {
    getUsersController,
    createUsersController,
    loginController
}