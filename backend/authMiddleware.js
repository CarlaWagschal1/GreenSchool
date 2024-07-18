const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    console.log("in authenticateJWT")
    const authHeader = req.headers.authorization;

    if (authHeader) {
        console.log("in if authenticateJWT")
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            console.log("in jwt verify")
            if (err) {
                console.log("in err authenticateJWT")
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;