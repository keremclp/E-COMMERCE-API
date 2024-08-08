const jwt = require("jsonwebtoken");


const createJWT = ({payload}) =>{
    // check the why do we have to send like this {}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME,});
    return token;
}

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)

module.exports = {
    createJWT,
    isTokenValid
}