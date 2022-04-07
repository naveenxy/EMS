const express=require('express')
const mongoose = require('mongoose')
const {updateleave,countLeave}=require('../dao/leaveDao')
const {updateLeaveId}=require('../dao/userDao')
const _ = require('lodash')
exports.update=async(req,res)=>{
  try{
 const result= await updateleave(req,res,req.acc)
 await updateLeaveId(req,res,req.acc,result._id)
 res.send("Leave applied")
  }
  catch(e){
    console.log(e)
  }
}
exports.filteredleave=async(req,res)=>{
 try{
   var filterwithmatch=[ {UserID:req.acc._id}]
   if(!_.isEmpty(req.query.type) ) filterwithmatch.push({'leaveType':req.query.type})
   const result=await filter(req,res,filterwithmatch)
   res.send(result)
 }
 catch(e){
   console.log(e)
 }
}
exports.leaveCount=async(req,res)=>{
  try{
var AvailableLeave=[{leaveType:'CL'},{leaveType:'EL'}]
 const result=await countLeave(req,res,req.acc._id,AvailableLeave)
 res.send(result[0])
  }
  catch(e){
    console.log(e)
  }
}