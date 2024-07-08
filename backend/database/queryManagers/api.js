const {
    getUsersController,
    createUsersController,
    loginController
} = require('../controllers/userController');



async function manageAPI(request, response) {
    console.log('Request received:', request.method, request.url);
    const url = request.url;
    const method = request.method;


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

        }
    }
    catch (error) {
        console.error('Error handling request:', error);
        response.status(500).send('Server Error');
    }
}


module.exports = manageAPI;