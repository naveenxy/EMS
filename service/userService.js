const express = require("express");
const { hashValidator } = require("../middleware/hashing");
const {
  finduser,
  createUser,
  saveToken,
  changepassword,
  saveexcel,
  oursquad,
  saveholidays,
  finduserbyId,
} = require("../dao/userDao");
const { accessTokenGenerator } = require("../middleware/token");
const _ = require("lodash");
const XLSX = require("xlsx");
const upload = require("../middleware/multer");
const fs = require("fs");
const db = require("../config/app");
const { Console } = require("console");
const res = require("express/lib/response");
const holiday = require("../model/holiday");
//register a user
exports.register = async (req, res, next) => {
  try {
    const existingUsername = await finduser(req, res);
    if (existingUsername) {
      res.send("UserName already taken,choose another UserName");
    } else {
      const result = await createUser(req, res);
      if (_.isError(result)) {
        return res.send(result);
      } else return res.send("User created");
    }
  } catch (e) {
    console.log("Error in userservice");
  }
};
//login a user
exports.login = async (req, res) => {
  try {
    const existingUser = await finduser(req, res);
    console.log(existingUser);
    if (!existingUser) {
      res.send("Username does not exist,Please create one");
    } else {
      const checkUser = await hashValidator(
        req.body.password,
        existingUser.password
      );
      if (!checkUser) {
        res.send(
          "The Password you've entered is  invalid,Please enter your correct password"
        );
      } else {
        const access_token = accessTokenGenerator(existingUser._id);
        res.json({
          message: "User login successful",
          access_token: access_token,
        });
      }
    }
  } catch (e) {
    res.status(400).send("error logging ");
  }
};
//change password
exports.changepassword = async (req, res) => {
  try {
    console.log(res.acc);
    const find = await finduserbyId(req, res);
    console.log(find);
    const check = await hashValidator(req.body.oldpassword, find.password);
    console.log(check);
    if (check) {
      const result = await changepassword(req, res);
      res.send("password changed");
    } else {
      res.send("incorrect old password");
    }
  } catch (e) {
    console.log(e);
  }
};
//uploaded excel sheets converting to json and storing in DB
exports.uploadourSquad = async (req, res) => {
  try {
    const fileLocation = req.file.path;
    const workbook = await XLSX.readFile(fileLocation);
    const sheet_name_list = await workbook.SheetNames;
    const obj = await XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
    await saveexcel(req, res, obj);
    await fs.unlink(fileLocation, () => {
      console.log("file removed");
    });
    res.status(200).send({ sucess: "upload sucess" });
  } catch {
    console.log("error");
  }
};
exports.oursquad = async (req, res) => {
  try {
    const result = await oursquad(req, res);
    res.send(result);
  } catch {
    res.send("error");
  }
};
exports.holidays = async (req, res) => {
  try {
    const fileLocation = req.file.path;
    const workbook = await XLSX.readFile(fileLocation);
    const sheet_name_list = await workbook.SheetNames;
    const obj = await XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
    // console.log(obj)
    res.send(obj);
    await saveholidays(req, res, obj);
    await fs.unlink(fileLocation, () => {
      console.log("file removed");
    });
    // res.status(200).send({ sucess: "upload sucess" });
  } catch {
    console.log("error");
  }
};
exports.oursquad = async (req, res) => {
  try {
    const result = await oursquad(req, res);
    const result2 = await holiday.find();
    result.push(result2);

    res.send(result);
  } catch {
    res.send("error");
  }
};
