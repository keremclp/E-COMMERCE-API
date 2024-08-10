const CustomError = require('../errors')
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

const authorizePermissions = (req,res,next) =>{
    if(req.user.role !== 'admin'){
        throw new CustomError.UnauthorizedError('You are not authorized to perform this route')
    }
    console.log('admin route');
    next()
}


module.exports = {
  authenticateUser,
  authorizePermissions,
};
