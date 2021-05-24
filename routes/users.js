const express = require('express')
const usersController = require("../controllers/user.controller")

const router = express.Router();
router.post("/signup", usersController.signUp)
/* router.post("/signin", usersController.signIn) */


module.exports = router