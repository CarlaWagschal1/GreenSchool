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
} = require('../controllers/scoreController');



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