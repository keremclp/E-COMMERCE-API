const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const getAllUser = async (req,res) =>{
    // console.log(req.user); // sent from authenticateUser by suing next()
    // remove the password by select func
    const users = await User.find({ role:'user' }).select('-password')
    if(!users){
        throw new CustomError.NotFoundError("No user found");
    }
    users.forEach(user => delete user.password)
    res.status(StatusCodes.OK).json({ user:users })
}
const getSingleUser = async (req,res) =>{
    const userId = req.params.id
    const user = await User.findOne({ _id: userId }).select('-password')
    if(!user){
        throw new CustomError.NotFoundError("User not found");
    }

    res.status(StatusCodes.OK).json({ user })
}
const showCurrentUser = async (req,res) =>{
    res.send('showCurrentUser')
}
const updateUser = async (req,res) =>{
    res.send('updateUser')
}
const updateUserPassword = async (req,res) =>{
    res.send("updateUserPassword");
}

module.exports = {
    getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}