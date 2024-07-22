const {
    getEducators,
    emailAlreadyExists,
    createEducator,
    loginEducator,
    getEducatorById,
    changeChildrenLogoutPassword,
    getEducatorByEmail,
    logoutChildren
} = require('../collections/educators');

const jwt = require('jsonwebtoken');

async function getEducatorsController(request, response) {
    try {
        const educators = await getEducators();
        response.status(200).json(educators);
    }
    catch (error) {
        console.log("Error in get Educators controller:", error)
        response.status(500).json({message: 'Internal server error'});
    }
}

async function createEducatorsController(request, response) {
    const {name, email, password} = request.body;
    if (!name || !email || !password) {
        response.status(400).json({message: "Name, email and password are required"});
        return;
    }
    const educatorExist = await emailAlreadyExists(email);
    if (educatorExist) {
        response.status(400).json({message: "Educator already exists"});
        return;
    }

    try {
        await createEducator(name, email, password);
        const educator = await getEducatorByEmail(email);
        const token = jwt.sign({id: educator._id, email: educator.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        console.log("Token:", token);
        response.status(201).json({token: token});
    }
    catch (error) {
        console.log("Error in create Educators controller:", error)
        response.status(500).json({message: "Internal server error"});
    }
}

async function changeChildrenLogoutPasswordController(request, response) {
    const {password, newChildrenLogoutPassword} = request.body;
    const educatorId = request.query.educatorId;
    if (!password || !newChildrenLogoutPassword || !educatorId) {
        response.status(400).json({message: 'Password, new password, and EducatorId are required'});
        return;
    }

    if (!await getEducatorById(educatorId)) {
        response.status(400).json({message: 'Educator does not exist'});
        return;
    }
    try {
        await changeChildrenLogoutPassword(educatorId, password, newChildrenLogoutPassword);
        response.status(200).json({message: 'Password changed'});
    }
    catch (error) {
        console.log("Error in change children logout password controller:", error)
        response.status(500).json({message: 'Internal server error'});
    }
}

async function loginController(request, response) {
    const {email, password} = request.body;
    if (!email || !password) {
        response.status(400).json({message: 'Email and password are required'});
        return;
    }

    try {
        const educatorExist = await emailAlreadyExists(email);
        if (!educatorExist) {
            response.status(400).json({message: 'Invalid credentials'});
            return;
        }

        await loginEducator(request, response);
        const educator = await getEducatorByEmail(email);
        const token = jwt.sign({id: educator._id, email: educator.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        response.status(200).json({token: token});
    }
    catch (error) {
        console.log("Error in login controller:", error)
        response.status(500).json({message: 'Internal server error'});
    }
}

async function logoutChildrenController(request, response) {
    const {password, token} = request.body;
    console.log(password);
    console.log(token)
    if (!password || !token) {
        response.status(400).json({message: 'Password and token are required'});
        return;
    }
    const id = jwt.verify(token, process.env.JWT_SECRET).id;
    console.log('id :', id)
    if (!id) {
        response.status(400).json({message: 'Invalid token'});
        return;
    }
    try {
        const educator = await getEducatorById(id);
        console.log(educator)
        if (!educator) {
            response.status(400).json({message: 'Invalid credentials'});
            return;
        }
        const isMatch = await logoutChildren(id, password);
        console.log(isMatch)
        if (!isMatch) {
            response.status(400).json({message: 'Invalid credentials'});
            return;
        }
        response.status(200).json({message: 'Logged out'});
    }
    catch (error) {
        console.log("Error in logout children controller:", error)
        response.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    getEducatorsController,
    createEducatorsController,
    loginController,
    changeChildrenLogoutPasswordController,
    logoutChildrenController
};
