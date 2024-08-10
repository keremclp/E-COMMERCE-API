const getAllUser = async (res,req) =>{
    res.send('getAllUser')
}
const getSingleUser = async (res,req) =>{
    res.send('getSingleUser')
}
const showCurrentUser = async (res,req) =>{
    res.send('showCurrentUser')
}
const updateUser = async (res,req) =>{
    res.send('updateUser')
}
const updateUserPassword = async (res,req) =>{
    res.send("updateUserPassword");
}

module.exports = {
    getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}