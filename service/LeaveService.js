const express = require("express");
const mongoose = require("mongoose");
const { updateleave, countLeave, filter } = require("../dao/leaveDao");
const { updateLeaveId } = require("../dao/userDao");
const _ = require("lodash");
const { ObjectId } = require("mongodb");
exports.update = async (req, res) => {
  try {
    const result = await updateleave(req, res, res.acc);
    await updateLeaveId(req, res, res.acc, result._id);
    res.send("Leave applied");
  } catch (e) {
    console.log(e);
  }
};
exports.filteredleave = async (req, res) => {
  try {
    const acc = ObjectId(res.acc);
    var filterwithmatch = [{ UserID: acc }];
    if (!_.isEmpty(req.query.type))
      filterwithmatch.push({ leaveType: req.query.type });
    const result = await filter(req, res, filterwithmatch);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};
exports.leaveCount = async (req, res) => {
  try {
    var AvailableLeave = [{ leaveType: "CL" }, { leaveType: "EL" }];
    const result = await countLeave(req, res, res.acc, AvailableLeave);
    res.send(result[0]);
  } catch (e) {
    console.log(e);
  }
};
