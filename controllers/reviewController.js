const createReview = async (req,res) => {
    res.send("createReview");
}
const getAllReviews = async (req,res) => {
    res.send("getAllReviews");
}
const getSingleReviews = async (req,res) => {
    res.send("getSingleReviews");
}
const updateReview = async (req,res) => {
    res.send("updateReview");
}
const deleteReview = async (req,res) => {
    res.send("deleteReview");
}

module.exports = {
    createReview,
    getAllReviews,
    getSingleReviews,
    updateReview,
    deleteReview
}