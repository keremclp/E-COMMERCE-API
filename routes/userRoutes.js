const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router.route('/').get(getAllUser)
router.route('/showMe').get(showCurrentUser)
router.route('/:id').get(getSingleUser)
router.route('/updateUser').post(updateUser)
router.route("/updateUserPassword").post(updateUserPassword);


module.exports = router;
