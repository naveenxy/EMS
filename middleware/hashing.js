const bcrypt = require("bcryptjs");
const saltRounds = 10;
exports.hashGenerate = async (plainPassword) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
};
exports.hashValidator = async (plainPassword, hashedPassword) => {
  try {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    return result; returns true or false
  } catch (e) {
    return false;
    res.send(e);
  }
};
