const {getDB} = require('../db');
const bcryptjs = require("bcryptjs");
const ObjectId = require('mongodb').ObjectId;

async function getEducators() {
    const db = getDB();
    try {
        return await db.collection('educators').find().toArray();
    }
    catch (error) {
        console.log("Error in get Educators:", error);
        throw new Error('Internal server error');
    }
}

async function getEducatorByEmail(email) {
    const db = getDB();
    try {
        const educator = await db.collection('educators').findOne({ email });
        console.log("Educator by email:", educator)
        return educator;
    }
    catch (error) {
        console.log("Error in get Educator by email:", error);
        throw new Error('Internal server error');
    }
}

async function emailAlreadyExists(email) {
    const educator = await getEducatorByEmail(email);
    return !!educator;
}

async function createEducator(name, email, password) {
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
        console.log("Error in create Educator:", error);
        throw new Error('Internal server error');
    }
}

async function changeChildrenLogoutPassword(educatorId, password, newChildrenLogoutPassword) {
    const db = getDB();
    try {
        const isMatch = await checkPassword(educatorId, password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newChildrenLogoutPassword, salt);
        await db.collection('educators').updateOne({_id: new ObjectId(educatorId)}, {
            $set: {
                childrenLogoutPassword: hashedPassword
            }
        });
    }
    catch (error) {
        console.log("Error in change children logout password:", error);
        throw new Error('Internal server error');
    }
}

async function checkPassword(educatorId, password) {
    const db = getDB();
    try {
        const educator = await db.collection('educators').findOne({_id: new ObjectId(educatorId)});
        const isMatch = await bcryptjs.compare(password, educator.password);
        console.log('Is match:', isMatch)
        return isMatch;
    }
    catch (error) {
        console.log("Error in check password:", error);
        throw new Error('Internal server error');
    }
}

async function loginEducator(request, response) {
    const {email, password} = request.body;
    try {
        const educator = await getEducatorByEmail(email);
        if (!educator) {
            response.status(400).send('Invalid credentials');
            return;
        }
        const isMatch = await bcryptjs.compare(password, educator.password);
        if (!isMatch) {
            response.status(400).send('Invalid credentials');
        }
    }
    catch (error) {
        console.log("Error in login:", error);
        throw new Error('Internal server error');
    }
}

async function getEducatorById(id) {
    const db = getDB();
    try {
        console.log("ID:", id)

        const objectId = new ObjectId(id);
        const educator = await db.collection('educators').findOne({_id: objectId});
        console.log('Educator by id:', educator)
        return educator;
    }
    catch (error) {
        console.log("Error in get Educator by id:", error);
        throw new Error('Internal server error');
    }
}


async function logoutChildren(id, password) {
    const db = getDB();
    try {
        const educator = await db.collection('educators').findOne({_id: new ObjectId(id)});
        return await bcryptjs.compare(password, educator.childrenLogoutPassword);
    }
    catch (error) {
        console.log("Error in logout children:", error);
        throw new Error('Internal server error');
    }
}

module.exports = {
    getEducators,
    emailAlreadyExists,
    getEducatorByEmail,
    createEducator,
    changeChildrenLogoutPassword,
    loginEducator,
    getEducatorById,
    logoutChildren
};
