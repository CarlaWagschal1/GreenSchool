const {
    getUsersController,
    createUsersController,
    loginController
} = require('../controllers/userController');

const {
    getChildrenController,
    createChildrenController,
    getChildrenByUserIdController
} = require('../controllers/childrenController');



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
            case '/api/users':
                if (method === 'GET') {
                    await getUsersController(request, response);
                } else {
                    response.status(405).send('Method not allowed');
                }
                break;
            case '/api/signin':
                console.log('Signin')
                if (method === 'POST') {
                    console.log('Post')
                    await createUsersController(request, response);
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
            case '/api/children':
                if(method === 'GET' && 'userId' in params){
                    await getChildrenByUserIdController(request, response);
                } else if (method === 'GET') {
                    await getChildrenController(request, response);
                } else if (method === 'POST') {
                    await createChildrenController(request, response);
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