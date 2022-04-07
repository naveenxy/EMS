const express=require('express')
const {hashValidator}=require('../middleware/hashing')
const {finduser,createUser,saveToken,changepassword}=require('../dao/userDao')
const {accessTokenGenerator}=require('../middleware/token')

exports.register=async(req,res,next)=>
{
    try{
        const existingUsername=await finduser(req,res)
        if(existingUsername)
        {
             res.send('UserName already taken,choose another UserName')
        }
        else{
        await createUser(req,res)
        res.send("user created")
       }
}
catch(e)
 {
console.log('Error in userservice')
 }}
exports.login=async(req,res)=>
{
    try{
        const existingUser=await finduser(req,res)
         if(!existingUser)
          {
        res.send("Username does not exist,Please create one")
         }
          else{
        const checkUser=await hashValidator(req.body.password,existingUser.password)
        if(!checkUser)
        {
            res.send("The Password you've entered is  invalid,Please enter your correct password")
        }
        else
        {
            const access_token= accessTokenGenerator(existingUser.RegisterNumber)
            await saveToken(req,res,existingUser.RegisterNumber,access_token)
            res.json({
               message:'User login successful',
               access_token:access_token
           })
               
        }}
}
    catch(e){
        res.status(400).send('error logging ')
            }
    }
exports.changepassword=async(req,res)=>{
    try{
const result =await changepassword(req,res)
res.send("password changed")
    }
    catch(e){
        console.log(e)
    }
}