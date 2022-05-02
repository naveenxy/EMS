const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  login,
  register,
  uploadourSquad,
  oursquad,
  changepassword,
  holidays
} = require("../service/userService");
const { accessTokenVerify } = require("../middleware/token");
router.post("/register", register);
router.post("/login", login);
router.post("/uploadoursquad",accessTokenVerify, upload.single("fileupload"), uploadourSquad);
router.get("/squadandholiday",accessTokenVerify, oursquad);
router.post("/holidays",upload.single("fileupload"),holidays);
router.patch("/changepassword", accessTokenVerify, changepassword);
module.exports = router;
