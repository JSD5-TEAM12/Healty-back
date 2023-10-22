const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) =>{
    const token = req.headers.authorization;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = decoded;
        next();
    });
}

module.exports = {authenticateToken}
