const {
    getEducatorsController,
    getEducatorByIdController,
    createEducatorsController,
    loginController,
    changeChildrenLogoutPasswordController,
    logoutChildrenController,
    changePasswordController,
    changeEmailController,
    changeUsernameController
} = require('../controllers/educatorController');

const {
    getChildrenController,
    createChildrenController,
    getChildrenByEducatorIdController,
    playChildrenController,
    getChildrenByIdController,
    deleteChildrenController,
    updateChildrenController
} = require('../controllers/childrenController');

const {
    addScoreController,
    getScoresByChildrenIdController,
    getScoresByChildrenIdAndGameIdController
} = require('../controllers/scoreController');

const {
    getLessonsController,
    createLessonController,
    getLessonByIdController,
    deleteLessonController,
    getLessonsByEducatorIdController
} = require('../controllers/lessonsController');

const {
    getChaptersController,
    createChapterController,
    getChaptersByLessonIdController,
    getChapterByIdController,
    deleteChapterController
} = require("../controllers/chaptersController");

const {
    getQuizsController,
    getQuizByIdController,
    createQuizController,
    getQuizsByEducatorIdController,
    deleteQuizController,
    updateQuizController
} = require("../controllers/quizsController");

const {
    getQuestionsController,
    getQuestionByIdController,
    createQuestionController,
    getQuestionsByQuizIdController,
    deleteQuestionController,
    updateQuestionController
} = require("../controllers/questionsController");

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

        if(url.startsWith('/api/children') && method === 'GET') {
            const pathParts = url.split('/');
            if (pathParts.length === 4 && pathParts[3] !== 'educator') {
                const childrenId = pathParts[3];
                request.params = { childrenId };
                await getChildrenByIdController(request, response);
                return;
            }
        }

        if(url.startsWith('/api/children') && method === 'DELETE') {
            const pathParts = url.split('/');
            if(pathParts.length === 4) {
                const childrenId = pathParts[3];
                request.params = { childrenId };
                await deleteChildrenController(request, response);
                return;
            }
        }

        if(url.startsWith('/api/children') && method === 'PATCH') {
            const pathParts = url.split('/');
            if(pathParts.length === 4) {
                const childrenId = pathParts[3];
                request.params = { childrenId };
                await updateChildrenController(request, response);
                return;
            }
        }

        if(url.startsWith('/api/lessons') && method === 'GET') {
            const pathParts = url.split('/');
            if(pathParts.length === 4 && pathParts[3] !== 'educator') {
                console.log('Path parts:', pathParts)
                const lessonId = pathParts[3];
                console.log('Lesson id:', lessonId)
                request.params = { lessonId };
                console.log('Request params:', request.params)
                await getLessonByIdController(request, response);
                return;
            }
        }

        if(url.startsWith('/api/lessons') && method === 'DELETE') {
            const pathParts = url.split('/');
            if(pathParts.length === 4) {
                const lessonId = pathParts[3];
                request.params = { lessonId };
                await deleteLessonController(request, response);
                return;
            }
        }

        if(url.startsWith('/api/chapters') && method === 'GET') {
            const pathParts = url.split('/');
            if(pathParts.length === 4) {
                const chapterId = pathParts[3];
                request.params = { chapterId };
                await getChapterByIdController(request, response);
                return;
            }
        }

        if(url.startsWith('/api/chapters') && method === 'DELETE') {
            const pathParts = url.split('/');
            if(pathParts.length === 4) {
                const chapterId = pathParts[3];
                request.params = { chapterId };
                await deleteChapterController(request, response);
                return;
            }
        }

        if (url.startsWith('/api/chapters/lesson') && method === 'GET') {
            const pathParts = url.split('/');
            if (pathParts.length === 5) {
                const lessonId = pathParts[4];
                request.params = { lessonId };
                await getChaptersByLessonIdController(request, response);
                return;
            }
        }

        if(url.startsWith('/api/quizs') && method === 'GET') {
            const pathParts = url.split('/');
            if(pathParts.length === 4 && pathParts[3] !== 'educator') {
                const quizId = pathParts[3];
                request.params = { quizId };
                await getQuizByIdController(request, response);
                return;
            }
        }

        if(url.startsWith('/api/quizs') && method === 'DELETE') {
            const pathParts = url.split('/');
            if(pathParts.length === 4) {
                const quizId = pathParts[3];
                request.params = { quizId };
                await deleteQuizController(request, response);
                return;
            }
        }

        if(url.startsWith('/api/quizs') && method === 'PATCH') {
            const pathParts = url.split('/');
            if(pathParts.length === 4) {
                const quizId = pathParts[3];
                request.params = { quizId };
                await updateQuizController(request, response);
                return;
            }
        }


        if(url.startsWith('/api/questions') && method === 'GET') {
            const pathParts = url.split('/');
            if(pathParts.length === 4 && pathParts[3] !== 'quiz') {
                const questionId = pathParts[3];
                request.params = { questionId };
                await getQuestionByIdController(request, response);
                return;
            }
        }

        if(url.startsWith('/api/questions') && method === 'DELETE') {
            const pathParts = url.split('/');
            if(pathParts.length === 4) {
                const questionId = pathParts[3];
                request.params = { questionId };
                await deleteQuestionController(request, response);
                return;
            }
        }

        if(url.startsWith('/api/questions') && method === 'PATCH') {
            const pathParts = url.split('/');
            if(pathParts.length === 4) {
                const questionId = pathParts[3];
                request.params = { questionId };
                await updateQuestionController(request, response);
                return;
            }
        }

        if(url.startsWith('/api/questions/quiz') && method === 'GET') {
            const pathParts = url.split('/');
            if(pathParts.length === 5) {
                const quizId = pathParts[4];
                request.params = { quizId };
                await getQuestionsByQuizIdController(request, response);
                return;
            }
        }


        switch (url) {
            case '/api/educator':
                if (method === 'GET') {
                    await getEducatorByIdController(request, response);
                } else if (method === 'PATCH') {
                    if ('newChildrenLogoutPassword' in request.body) {
                        await changeChildrenLogoutPasswordController(request, response);
                    } else if ('newPassword' in request.body) {
                        await changePasswordController(request, response);
                    } else if('newEmail' in request.body) {
                        await changeEmailController(request, response);
                    } else if ('newUsername' in request.body) {
                        await changeUsernameController(request, response);
                    } else {
                        response.status(400).send('Bad request');
                    }
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/educators':
                if (method === 'GET') {
                    await getEducatorsController(request, response);
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/signin':
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
            case '/api/lessons/educator':
                if (method === 'GET') {
                    await getLessonsByEducatorIdController(request, response);
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/chapters':
                if (method === 'GET') {
                    await getChaptersController(request, response);
                } else if (method === 'POST') {
                    upload.single('files')(request, response, async (err) => {
                        if (err) {
                            console.error('Multer error:', err);
                            return response.status(500).json({ message: 'File upload error', error: err.message });
                        }
                        try {
                            await createChapterController(request, response);
                        } catch (createChapterError) {
                            console.error('Create chapter error:', createChapterError);
                            return response.status(500).json({ message: 'Chapter creation error', error: createChapterError.message });
                        }
                    });                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/quizs':
                if (method === 'GET') {
                    await getQuizsController(request, response);
                } else if (method === 'POST') {
                    upload.single('files')(request, response, async (err) => {
                        if (err) {
                            console.error('Multer error:', err);
                            return response.status(500).json({ message: 'File upload error', error: err.message });
                        }
                        try {
                            await createQuizController(request, response);
                        } catch (createQuizError) {
                            console.error('Create quiz error:', createQuizError);
                            return response.status(500).json({ message: 'Quiz creation error', error: createQuizError.message });
                        }
                    });
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;

            case '/api/quizs/educator':
                if (method === 'GET') {
                    await getQuizsByEducatorIdController(request, response);
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/questions':
                if (method === 'GET') {
                    await getQuestionsController(request, response);
                } else if (method === 'POST') {
                    upload.single('files')(request, response, async (err) => {
                        if (err) {
                            console.error('Multer error:', err);
                            return response.status(500).json({ message: 'File upload error', error: err.message });
                        }
                        try {
                            await createQuestionController(request, response);
                        } catch (createQuestionError) {
                            console.error('Create question error:', createQuestionError);
                            return response.status(500).json({ message: 'Question creation error', error: createQuestionError.message });
                        }
                    });
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