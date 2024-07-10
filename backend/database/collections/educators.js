const {getDB} = require('../db');
const bcryptjs = require("bcryptjs");
const ObjectId = require('mongodb').ObjectId;

async function getEducators(request, response) {
    const db = getDB();
    try {
        return await db.collection('educators').find().toArray();
    }
    catch (error) {
        console.log("Error in get Educators:", error)
        response.status(500).send('Internal server error');
    }
}

async function getEducatorByEmail(response, email) {
    const db = getDB();
    try {
        const educator = await db.collection('educators').findOne({email});
        console.log('Educator by email:', educator)
        return educator;
    }
    catch (error) {
        console.log("Error in get Educator by email:", error)
        response.status(500).send('Internal server error');
    }
}

async function emailAlreadyExists(response, email) {
    if (await getEducatorByEmail(response, email)) {
        return true;
    }
    return false;
}

async function createEducator(name, email, password, response) {
    const db = getDB();
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const childrenLogoutPassword = "1234";
        const hashedChildrenPassword = await bcryptjs.hash(childrenLogoutPassword, salt);

        await db.collection('educators').insertOne({
            name,
            email,
            password: hashedPassword,
            childrenLogoutPassword: hashedChildrenPassword
        });

    }
    catch (error) {
        console.log("Error in create Educator:", error)
        response.status(500).send('Internal server error');
    }
}

async function changeChildrenLogoutPassword(response, educatorId, password, newChildrenLogoutPassword) {
    console.log('Change children logout password')
    const db = getDB();
    try {
        const isMatch = await checkPassword(response, educatorId, password);
        if(!isMatch){
            response.status(400).send('Invalid password');
            return;
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newChildrenLogoutPassword, salt);
        await db.collection('educators').updateOne({_id: new ObjectId(educatorId)}, {
            $set: {
                childrenLogoutPassword: hashedPassword
            }
        });
        console.log('Children logout password changed')
    }
    catch (error) {
        console.log("Error in change children logout password:", error)
        response.status(500).send('Internal server error');
    }
}

async function checkPassword(response, educatorId, password) {
    console.log('Check password')
    const db = getDB();
    try {
        const educator = await db.collection('educators').findOne({_id: new ObjectId(educatorId)});
        const isMatch = await bcryptjs.compare(password, educator.password);
        console.log('Is match:', isMatch)
        return isMatch;

    }
    catch (error) {
        console.log("Error in check password:", error)
        response.status(500).send('Internal server error');
    }

}

async function loginEducator(request, response) {
    console.log('Login educator')
    const body = request.body;
    const {email, password} = body;
    try {
        const educator = await getEducatorByEmail(response, email);
        const isMatch = await checkPassword(response, educator._id, password);
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

async function getEducatorById(response, id) {
    const db = getDB();
    try {
        const educator = await db.collection('educators').findOne({_id: new ObjectId(id)});
        console.log('Educator by id:', educator)
        return educator;
    }
    catch (error) {
        console.log("Error in get Educator by id:", error)
        response.status(500).send('Internal server error');
    }
}

module.exports = {
    getEducators,
    emailAlreadyExists,
    getEducatorByEmail,
    createEducator,
    changeChildrenLogoutPassword,
    loginEducator,
    getEducatorById
};