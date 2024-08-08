const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors') 

const login = (req,res) =>{
    res.send('Login')
}
const register = async (req,res) =>{
    const { email } = req.body
    const emailAlreadyExist = await User.findOne({ email })
    if(emailAlreadyExist){
        throw new CustomError.BadRequestError('Email already exist')
    }
    const user = await User.create(req.body)
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