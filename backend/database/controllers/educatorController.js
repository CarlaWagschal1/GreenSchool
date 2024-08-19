const {
    getEducators,
    emailAlreadyExists,
    createEducator,
    loginEducator,
    getEducatorById,
    changeChildrenLogoutPassword,
    getEducatorByEmail,
    logoutChildren,
    changePassword,
    changeEmail,
    changeUsername
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

async function getEducatorByIdController(request, response) {
    const id = request.user.id;
    if (!id) {
        response.status(400).json({message: 'Id is required'});
        return;
    }

    try {
        const educator = await getEducatorById(id);
        if (!educator) {
            response.status(400).json({message: 'Educator does not exist'});
            return;
        }
        response.status(200).json(educator);
    }
    catch (error) {
        console.log("Error in get Educator by id controller:", error)
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
    const educatorId = request.user;
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


async function changePasswordController(request, response) {
    console.log("In change password controller")
    const {password, newPassword} = request.body;
    if (!password || !newPassword) {
        console.log("Password, new password and token are required")
        response.status(400).json({message: 'Password, new password and token are required'});
        return;
    }
    const id = request.user;
    try {
        const educator = await getEducatorById(id);
        if (!educator) {
            console.log("Invalid credentials get educator by id change password controller")
            response.status(400).json({message: 'Invalid credentials'});
            return;
        }
        await changePassword(id, password, newPassword);
        response.status(200).json({message: 'Password changed'});
    }
    catch (error) {
        console.log("Error in change password controller:", error)
        response.status(500).json({message: 'Internal server error'});
    }
}

async function changeEmailController(request, response) {
    const {newEmail, password} = request.body;
    if (!newEmail || !password) {
        response.status(400).json({message: 'Email, new email, password and token are required'});
        return;
    }
    const id = request.user;
    if (!id) {
        response.status(400).json({message: 'Invalid token'});
        return;
    }
    try {
        const educator = await getEducatorById(id);
        if (!educator) {
            response.status(400).json({message: 'Invalid credentials'});
            return;
        }
        await changeEmail(id, newEmail, password);
        response.status(200).json({message: 'Email changed'});
    }
    catch (error) {
        console.log("Error in change email controller:", error)
        response.status(500).json({message: 'Internal server error'});
    }
}

async function changeUsernameController(request, response) {
    console.log("In change username controller")
    const {newUsername, password} = request.body;
    if (!newUsername || !password) {
        console.log("New username and password are required")
        response.status(400).json({message: 'New username and password are required'});
        return;
    }
    const id = request.user;
    if (!id) {
        console.log("Invalid token")
        response.status(400).json({message: 'Invalid token'});
        return;
    }
    try {
        const educator = await getEducatorById(id);
        if (!educator) {
            console.log("Invalid credentials get educator by id change username controller")
            response.status(400).json({message: 'Invalid credentials'});
            return;
        }
        await changeUsername(id, password, newUsername);
        response.status(200).json({message: 'Username changed'});
    }
    catch (error) {
        console.log("Error in change username controller:", error)
        response.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    getEducatorsController,
    getEducatorByIdController,
    createEducatorsController,
    loginController,
    changeChildrenLogoutPasswordController,
    logoutChildrenController,
    changePasswordController,
    changeEmailController,
    changeUsernameController
};
