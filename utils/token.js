const jwt = require('jsonwebtoken');

const genToken = (payload) =>{
const secretKey = process.env.JWT_SECRET_KEY;
const option = { expiresIn: 60*60*24 } // 24 hr
const token = jwt.sign(payload, secretKey, option);
return token;
};
module.exports = { genToken };
