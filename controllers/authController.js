const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors') 
const { attachCookiesToResponse } = require("../utils");

const login = async (req,res) =>{
    const {email,password} = req.body;
    if( !email || !password ){
        throw new CustomError.UnauthenticatedError(
          "Please provide both email and password"
        );
    }
    const user = await User.findOne({email})
    console.log(user);
    
    if(!user){
        throw new CustomError.UnauthenticatedError("Invalid credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    console.log(isPasswordCorrect);
    
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError("Invalid credentials");
    }

    const tokenUser = { name:user.name, userId:user._id, role:user.role }
    attachCookiesToResponse({res,tokenUser}) 
    res.status(StatusCodes.OK).json({ user: tokenUser });
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
    attachCookiesToResponse({res,tokenUser}) 

    res.status(StatusCodes.CREATED).json({ user:tokenUser })
}
const logout = async (req,res) =>{
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({ msg:'user logout' })
}

module.exports = {
    login,
    register,
    logout
}