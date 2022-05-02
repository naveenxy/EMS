const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/userModel");
const { hashGenerate } = require("../middleware/hashing");
const req = require("express/lib/request");
const _ = require("lodash");
const squad = require("../model/squad");
const holiday = require("../model/holiday");
const { findOne } = require("../model/userModel");
exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await hashGenerate(req.body.password);
    const user = new User({
      Name: req.body.Name,
      RegisterNumber: req.body.RegisterNumber,
      EmailId: req.body.EmailId,
      PhoneNumber: req.body.PhoneNumber,
      password: hashedPassword,
    });
    res.user = user;
    const result = await user.save();
    return result;
  } catch (e) {
    return e;
  }
};
exports.finduser = async (req, res) => {
  try {
    return await User.findOne({ RegisterNumber: req.body.RegisterNumber });
  } catch {
    console.log("error in db");
  }
};

exports.updateLeaveId = async (req, res, id, leaveid) => {
  try {
    return await User.updateOne({ _id: id }, { $push: { leaveId: leaveid } });
  } catch {
    console.log("error in db");
  }
};
exports.changepassword = async (req, res) => {
  try {
    
    
      const hashedPassword = await hashGenerate(req.body.newpassword);
      return await User.updateOne(
        { _id: res.acc },
        { $set: { password: hashedPassword } }
      );
    
    
    
  } catch {
    console.log("error in db");
  }
};
exports.saveexcel = async (req, res, obj) => {
  try {
    await squad.deleteMany({});
    for (var i = 0; i < obj.length; i++) {
      var sheet = obj[i];

      const fileuploaddata = new squad({
        EMPLOYEE_NAME: sheet.name,
        BLOOD_GROUP: sheet.bloodgroup,
        EMERGENCY_CONTACT_NUMBER: sheet.phone,
        EMERGENCY_CONTACT_PERSON: sheet.contactperson,
      });
      await fileuploaddata.save();
    }
  } catch {
    console.log("error in db");
  }
};
exports.oursquad = async (req, res) => {
  try {
    return await squad
      .find({})
      .select({ _id: 0, __v: 0 })
      .sort({ EMPLOYEE_NAME: 1 });
  } catch {
    console.log("error in db");
  }
};
exports.saveholidays = async (req, res, obj) => {
  try {
    await holiday.deleteMany({});
    for (var i = 0; i < obj.length; i++) {
      var sheet = obj[i];
      //console.log(sheet)
      let date = new Date(Date.UTC(0, 0, sheet.date - 1));
    //  let date=new Date((sheet.date - (25567 + 1))*86400*1000)

      const fileuploaddata = new holiday({
        Holiday_Name: sheet.holiday_name,
        Date: date,
      });

      await fileuploaddata.save();
    }
  } catch {
    console.log("error in db");
  }
};
exports.finduserbyId=async(req,res)=>{
  return await User.findOne({_id:res.acc})
}