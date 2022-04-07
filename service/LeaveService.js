const express=require('express')
const mongoose = require('mongoose')
const {updateleave,getallleaves,filter,countCL}=require('../dao/leaveDao')
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
   await filter(req,res,filterwithmatch)
 }
 catch(e){
   console.log(e)
 }
}
exports.leaveCount=async(req,res)=>{
  try{

  
 var AvailableLeave=[{leaveType:'CL'},{leaveType:'EL'}]
 await countCL(req,res,req.acc._id,AvailableLeave)
  }
  catch(e){
    console.log(e)
  }
}