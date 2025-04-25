const express = require("express");
const { register, login } = require("../services/authService");
const router = express.Router()
// routes 

router.post('/register', register)
router.post('/login', login)
module.exports=router
