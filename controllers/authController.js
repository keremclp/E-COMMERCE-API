const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors') 

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
    res.status(StatusCodes.CREATED).json({ user })
}
const logout = (req,res) =>{
    res.send('logout')
}

module.exports = {
    login,
    register,
    logout
}