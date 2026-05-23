const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.TOKEN_SECRET;

const generateJwtToken = (userId) => {
    return jwt.sign({
        data: userId
    }, secret , { expiresIn: '30d' });
}

module.exports = generateJwtToken;
