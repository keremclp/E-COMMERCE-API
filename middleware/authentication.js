const CustomError =require('../errors')
const { isTokenValid } = require('../utils')

const authenticateUser = async (req,res,next)=>{
    const token = req.signedCookies.token 
    if(!token){
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }
    try {
        const payload = isTokenValid({ token });
        // console.log("PAYLOAD:",payload);
        req.user = { name: payload.name, userId: payload.userId, role: payload.role };

        next()
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }
}

module.exports = {
    authenticateUser
}
