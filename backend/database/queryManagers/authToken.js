const jwt = require("jsonwebtoken");


async function manageToken(request, response) {

    const url = request.url.split('?')[0];
    const method = request.method;
    //const params = request.query;
    if(method === 'POST' && url === '/api/auth/validate-token') {
        const req = request;
        const res = response;
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded:', decoded);
            res.json({isValid: true});
        } catch (error) {
            res.json({isValid: false});
        }
    }
}

module.exports = manageToken;