const CustomError =require('../errors')
const { isTokenValid } = require('../utils')

const authenticateUser = async (req,res,next)=>{
    const token = req.signedCookies.token 
    if(!token){
        console.log('error');
    }
    else{
        console.log('token is present');
    }
    next()
}

module.exports = {
    authenticateUser
}
