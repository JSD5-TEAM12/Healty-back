const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const tokenWithBearer = req.headers.authorization;
        if (!tokenWithBearer) {
            console.log('No token provided');
            return res.sendStatus(401);
        }
        const token = tokenWithBearer.split(' ')[2];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log('Invalid token');
                return res.sendStatus(403);
            }
            req.user = decoded.payload;

            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};

module.exports = { authenticateToken };