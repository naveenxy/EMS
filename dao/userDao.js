const express=require('express')
const mongoose = require('mongoose')
const User=require('../model/userModel')
const {hashGenerate}=require('../middleware/hashing')
const req = require('express/lib/request')
const _ =require('lodash')
exports.createUser=async(req,res)=>{
  try{
    const hashedPassword= await hashGenerate(req.body.password)
      const user =new User({
       Name:req.body.Name, 
       RegisterNumber:req.body.RegisterNumber,
       EmailId: req.body.EmailId,
       PhoneNumber:req.body.PhoneNumber,
       password:hashedPassword,
         })
        res.user=user
       const result= await  user.save()
      return result
         // console.log(err)
      
     
        }
        catch(e){
        return e
        }
  }
exports.saveToken=async(req,res,reg,token)=>{
     return await User.updateOne({RegisterNumber:reg},{$set: {Token:token}})
}
exports.finduser=async(req,res)=>{return await User.findOne({RegisterNumber:req.body.RegisterNumber})}
exports.finduserbytoken=async(req,res,token)=>
{
   return await User.findOne({Token:token})
}


exports.updateLeaveId=async(req,res,id,leaveid)=>
{
     return await User.updateOne({_id:id},{$push: {leaveId: leaveid}})

}
exports.changepassword=async(req,res)=>
{
    const hashedPassword= await hashGenerate(req.body.password)
    return await User.updateOne({_id:res.acc},{$set:{password:hashedPassword}})
}