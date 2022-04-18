const express=require('express')
const leave=require('../model/leaveModel')
const User=require('../model/userModel')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');
exports.updateleave=async(req,res,userid)=>{
   const leavemodel=new leave(
       {
        leaveType:req.body.leaveType,
        FromDate:new Date(req.body.FromDate),
        ToDate:new Date(req.body.ToDate),
        reason:req.body.reason,
        UserID:userid
       }
   )
   console.log(userid)
    return await leavemodel.save()
}

exports.filter=async(req,res,leavewithmatch)=>{
    return await leave.aggregate([
         { 
            $match:
                {$and:  
                    leavewithmatch
                 }
          },
        {
            $addFields:
            {
                Duration:
                     {
                        $dateDiff:
                           {
                              startDate: "$FromDate",
                              endDate: "$ToDate",
                              unit: "day"
                           }
                     },   
              }
        },
    {
            $project:{
                _id:0,
                LeaveType:"$leaveType",
                "From Date":{ $dateToString: { format: "%d-%m-%Y", date: "$FromDate" } },
                "To Date":{ $dateToString: { format: "%d-%m-%Y", date: "$ToDate" } },
                "Duration(days)":
                    { $add: [ "$Duration", 1]},
                    Status:"Approved"
            }
        }])
   
}
exports.countLeave=async(req,res,accc,availableLeave)=>{
    const acc = ObjectId(accc);
   return await leave.aggregate([
   {
       $facet:{
 "Total count CL":  [ {
        $match:{UserID:acc,leaveType:'CL'}
    },
{$count:"Total"},

],
"Total count EL":  [ {
    $match:{UserID:acc,leaveType:'EL'}
},
{$count:"Total"}
],
"Total count WFH":  [ {
    $match:{UserID:acc,leaveType:'WFH'}
},
{$count:"Total"}
],
"Total count LOP":  [ {
    $match:{UserID:acc,leaveType:'LOP'}
},
{$count:"Total"}
],
"Available leave":  [ {
    $match:{
        $and:[{UserID:acc}],  $or:availableLeave
    }
},
{$count:"Total"}
]}},
{
    $project: {
    ' CL  Availble': {$subtract:[12,{$ifNull:[{ $arrayElemAt: ['$Total count CL.Total', 0]},0] }]},
    'EL  Availble': {$subtract:[20,{$ifNull:[{ $arrayElemAt: ['$Total count EL.Total', 0]},0] }]},
    'Total WFH Taken': {$ifNull:[{ $arrayElemAt: ['$Total count WFH.Total', 0]},0] },
    'Total LOP Taken': {$ifNull:[{ $arrayElemAt: ['$Total count LOP.Total', 0]},0] },
    'Available leave': {$subtract:[32,{$ifNull:[{ $arrayElemAt: ['$Available leave.Total', 0]},0] }]},
    }
},
//{ $out : { db: "EMS", coll: "info" } }
])
      
   } 
   