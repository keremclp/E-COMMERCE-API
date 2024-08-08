const validator = require('validator')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema ({
    name:{
        type: String,
        required: [true, 'Please provide a name'],
        minlength:3,
        maxlength:50,
    },
    email:{
        type: String,
        unique:true,
        required:[true, 'Please provide a email'],
        validate:{
            validator:validator.isEmail, // better approach than the other email usage
            message:'Please provide valid email'
        }
        
    },
    password:{
        type: String,
        required:[true, 'Please provide a password'],
        minlength:6
    },
    role:{
        type:String,
        enum: ['admin', 'user'],
        default: 'user'
    },
})

module.exports = mongoose.model('User',UserSchema)