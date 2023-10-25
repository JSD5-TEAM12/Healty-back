// const jwt = require('jsonwebtoken');

// const authenticateToken =  (req, res, next) =>{
//     try {
//         const tokenWithBearer =  req.headers['authorization'];
//         // console.log(tokenWithBearer);
//         const token = tokenWithBearer.split(' ')[1];
//         console.log(token)
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     if (!tokenWithBearer) {

//         console.log('not token')
//         return res.sendStatus(401);
//     }

//     req.user = decoded.payload
//     next()
//     // jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//     //     if (err) {
//     //         console.log('Have authen')
//     //         return res.status(200);
//     //     }

//     //     req.user = decoded;
//     //     next();
//     // });

//     } catch (error) {
//         console.log(error);
//         res.status(401)
//     }
// }

// module.exports = {authenticateToken}


const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const tokenWithBearer = req.headers.authorization;
        // console.log('req tokenWithBearer :>> ', tokenWithBearer);
        // console.log('req.headers :>> ', req.headers);
        if (!tokenWithBearer) {
            console.log('No token provided');
            return res.sendStatus(401);
        }
        const token = tokenWithBearer.split(' ')[2];
        // console.log('token :>> ', token);

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log('Invalid token');
                return res.sendStatus(403);
            }
            req.user = decoded.payload;
            // console.log('jwt in middleware :>> ');

            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};

module.exports = { authenticateToken };