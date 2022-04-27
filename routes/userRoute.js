const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  login,
  register,
  uploadourSquad,
  oursquad,
  changepassword,
} = require("../service/userService");
const { accessTokenVerify } = require("../middleware/token");
router.post("/register", register);
router.post("/login", login);
router.post("/uploadoursquad",accessTokenVerify, upload.single("fileupload"), uploadourSquad);
router.get("/oursquad",accessTokenVerify, oursquad);
router.patch("/changepassword", accessTokenVerify, changepassword);
module.exports = router;
