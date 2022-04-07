const express=require('express')
const router =express.Router()
const {login,register,changepassword}=require('../service/userService')
const {accessTokenVerify}= require('../middleware/token')
router.post('/register',register)
router.post('/login',login)
router.patch('/changepassword',accessTokenVerify,changepassword)
module.exports=router