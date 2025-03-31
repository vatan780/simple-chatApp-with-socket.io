const express = require('express')
const { registerUser, authUser, allUser } = require('../controlllers/userController')
const { protect } = require('../middleware/authMiddleWare')

const router = express.Router()

router.route('/').post(registerUser).get(protect,allUser)
router.route("/login").post(authUser)   

module.exports = router