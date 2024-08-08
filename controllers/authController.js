const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors') 
const { createJWT } = require('../utils')
const login = (req,res) =>{
    res.send('Login')
}
const register = async (req,res) =>{
    const { email,name,password } = req.body

    const emailAlreadyExist = await User.findOne({ email })
    if(emailAlreadyExist){
        throw new CustomError.BadRequestError('Email already exist')
    }

    // first registered user is an admin
    const isFirstAccount = await User.countDocuments({}) === 0;
    const role = isFirstAccount ? 'admin' : 'user'
    const user = await User.create({ name,email,password,role }) // for security, we can only change on MongoDB
    //  once the user is created, now the issue is JWT 
    // we are going to send the id, role(role-based authentication)
    const tokenUser = { name:user.name, userId:user._id, role:user.role }
    const token = createJWT({ payload:tokenUser })
    res.status(StatusCodes.CREATED).json({ user:tokenUser, token })
}
const logout = (req,res) =>{
    res.send('logout')
}

module.exports = {
    login,
    register,
    logout
}