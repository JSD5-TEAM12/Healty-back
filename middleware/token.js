const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) =>{
    const tokenWithBearer = await req.body.authorization;
    console.log(tokenWithBearer)
    if (!tokenWithBearer) {
        console.log('not token')
        return res.sendStatus(401);
    }
    const token = tokenWithBearer.split(' ')[1];
    console.log(token)

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log('Have authen')
            return res.sendStatus(403);
            
        }

        req.user = decoded;
        next();
    });
}

module.exports = {authenticateToken}
