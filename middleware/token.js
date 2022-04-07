const req = require('express/lib/request')
const jwt=require('jsonwebtoken')
const {finduserbytoken}=require('../dao/userDao')

exports.accessTokenGenerator = (username)=>{
    const token =jwt.sign(
        {username},
        'secretkey',
     {expiresIn:"180seconds"}
    )
    return token
}
const accessTokenValidator =(req,res,token)=>{
    try{
     const data= jwt.verify(token,'secretkey')
    return true
          }
    catch(error)
    {
    return false
    }
}
//format of token: bearer<access token>
exports.accessTokenVerify=async (req,res,next)=>{
 const bearerHeader =req.headers['authorization']
 if(typeof bearerHeader !== 'undefined') {
 const bearer =bearerHeader.split(' ')
 const bearerToken = bearer[1]
req.token=bearerToken
const valid = accessTokenValidator(req,res,req.token)
     if (valid){
       const accountdetails=await finduserbytoken(req,res,req.token)
      req.acc=accountdetails
     next()
    }
     else{
        res.send("access token expired")
    }
 }
 else{
     res.send("No token")
 }
    }

   