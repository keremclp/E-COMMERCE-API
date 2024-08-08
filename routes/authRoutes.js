const express = require('express')
const router = express.Router()

const { login,register,logout } = require('../controllers/authController')

router.post('/login')
router.post('/register')
router.get('/logout')

module.exports = router