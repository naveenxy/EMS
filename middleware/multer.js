const express = require("express");
const multer = require("multer");

const datastore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "excelfile");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const upload = multer({
  storage: datastore,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(xls|xlsx)$/)) {
      return cb(new Error("Please upload Correct file"));
    }
    cb(undefined, true);
  },
});

module.exports = upload;
