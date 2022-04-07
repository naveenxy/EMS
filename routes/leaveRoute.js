const express=require('express')
const router =express.Router()
const {update,filteredleave,leaveCount}= require('../service/LeaveService')
const {accessTokenVerify}= require('../middleware/token')
router.post('/updateleave',accessTokenVerify,update)
router.get('/filterleave',accessTokenVerify,filteredleave)
router.get('/countleaves',accessTokenVerify,leaveCount)
 module.exports=router