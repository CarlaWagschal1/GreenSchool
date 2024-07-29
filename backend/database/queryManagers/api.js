const {
    getEducatorsController,
    createEducatorsController,
    loginController,
    changeChildrenLogoutPasswordController,
    logoutChildrenController
} = require('../controllers/educatorController');

const {
    getChildrenController,
    createChildrenController,
    getChildrenByEducatorIdController,
    playChildrenController
} = require('../controllers/childrenController');

const {
    addScoreController,
    getScoresByChildrenIdController,
    getScoresByChildrenIdAndGameIdController
} = require('../controllers/scoreController');

const {
    getLessonsController,
    createLessonController
} = require('../controllers/lessonsController');

const {
    getChaptersController,
    createChapterController,
    getChaptersByLessonIdController
} = require("../controllers/chaptersController");

const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

async function manageAPI(request, response) {
    console.log('Request received:', request.method, request.url);
    const url = request.url.split('?')[0];
    const method = request.method;
    const params = request.query;
    console.log('Params:', params)
    console.log('Body:', request.body)
    console.log('Method:', method)
    console.log('URL:', url)


    try {
        if (url.startsWith('/api/scores/children') && method === 'GET') {
            const pathParts = url.split('/');
            console.log('Path parts:', pathParts);
            if (pathParts.length === 7 && pathParts[5] === 'game') {
                const childrenId = pathParts[4];
                const gameId = pathParts[6];
                request.params = { childrenId, gameId };
                await getScoresByChildrenIdAndGameIdController(request, response);
                return;
            } else if (pathParts.length === 5) {
                const childrenId = pathParts[4];
                request.params = { childrenId };
                await getScoresByChildrenIdController(request, response);
                return;
            }
        }


        switch (url) {
            case '/api/educators':
                if (method === 'GET') {
                    await getEducatorsController(request, response);
                } else if (method === 'PATCH') {
                    if (params.educatorId && 'newChildrenLogoutPassword' in request.body) {
                        await changeChildrenLogoutPasswordController(request, response);
                    }
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/signin':
                console.log('Signin')
                if (method === 'POST') {
                    console.log('Post')
                    await createEducatorsController(request, response);
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/login':
                if (method === 'POST') {
                    await loginController(request, response);
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/children/educator':
                if(method === 'GET'){
                    await getChildrenByEducatorIdController(request, response);
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/children':
                if (method === 'GET') {
                    await getChildrenController(request, response);
                } else if (method === 'POST') {
                    await createChildrenController(request, response);
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/children/play':
                if (method === 'POST') {
                    console.log('Play')
                    await playChildrenController(request, response);
                    console.log('Play end')
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/children/logout':
                if (method === 'POST') {
                    console.log('Logout')
                    await logoutChildrenController(request, response);
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/scores':
                if(method === 'POST') {
                    await addScoreController(request, response);
                }
                else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/lessons':
                if (method === 'GET') {
                    await getLessonsController(request, response);
                } else if (method === 'POST') {
                    upload.single('files')(request, response, async (err) => {
                        console.log('Request file:', request.file);
                        if (err) {
                            console.error('Multer error:', err);
                            return response.status(500).json({ message: 'File upload error', error: err.message });
                        }
                        try {
                            await createLessonController(request, response);
                        } catch (createLessonError) {
                            console.error('Create lesson error:', createLessonError);
                            return response.status(500).json({ message: 'Lesson creation error', error: createLessonError.message });
                        }
                    });
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/chapters':
                if (method === 'GET') {
                    await getChaptersController(request, response);
                } else if (method === 'POST') {
                    await createChapterController(request, response);
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/chapters/lesson':
                if (method === 'GET') {
                    await getChaptersByLessonIdController(request, response);
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;

            default:
                console.log('Request not found')
                response.status(404).send('Not found');

        }
    }
    catch (error) {
        console.error('Error handling request:', error);
        response.status(500).send('Server Error');
    }
}


module.exports = manageAPI;