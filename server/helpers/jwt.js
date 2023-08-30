const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET

function generateAccessToken(user) {
    const { id, email } = user;
    return jwt.sign({ id, email }, jwt_secret, { expiresIn: "60h" })
}

function verifyAccessToken(access_token) {
    return jwt.verify(access_token, jwt_secret);
}

module.exports = { generateAccessToken, verifyAccessToken };