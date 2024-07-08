const {getDB} = require('../db');
const bcryptjs = require("bcryptjs");

async function getUsers(request, response) {
    const db = getDB();
    try {
        return await db.collection('users').find().toArray();
    }
    catch (error) {
        console.log("Error in get users:", error)
        response.status(500).send('Internal server error');
    }
}

async function getUserByEmail(response, email) {
    const db = getDB();
    try {
        const user = await db.collection('users').findOne({email});
        console.log('User by email:', user)
        return user;
    }
    catch (error) {
        console.log("Error in get user by email:", error)
        response.status(500).send('Internal server error');
    }
}

async function emailAlreadyExists(response, email) {
    if (await getUserByEmail(response, email)) {
        return true;
    }
    return false;
}

async function createUser(name, email, password, response) {
    const db = getDB();
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        await db.collection('users').insertOne({
            name,
            email,
            password: hashedPassword
        });

    }
    catch (error) {
        console.log("Error in create user:", error)
        response.status(500).send('Internal server error');
    }
}

async function loginUser(request, response) {
    const body = request.body;
    const {email, password} = body;
    console.log('Login body:', body)
    console.log('Login email:', email)
    console.log('Login password:', password)
    try {
        const user = await getUserByEmail(response, email);
        console.log('User:', user)
        console.log('User password', user.password)
        const isMatch = await bcryptjs.compare(password, user.password);
        console.log('Is match:', isMatch)
        if (!isMatch) {
            response.status(400).send('Invalid credentials');
            return;
        }
    }
    catch (error) {
        console.log("Error in login:", error)
        response.status(500).send('Internal server error');
    }

}

module.exports = {
    getUsers,
    emailAlreadyExists,
    getUserByEmail,
    createUser,
    loginUser
};