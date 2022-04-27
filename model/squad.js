const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const squad = new Schema({
  EMPLOYEE_NAME: {
    type: String,
    required: true,
    trim: true,
  },
  BLOOD_GROUP: {
    type: String,
    required: true,
    trim: true,
  },
  MEDICAL_INSURANCE: {
    type: String,
  },
  EMERGENCY_CONTACT_NUMBER: {
    type: String,
    match: [
      /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
      "ENter a valid phoneNumber",
    ],
  },
  EMERGENCY_CONTACT_PERSON: {
    type: String,
  },
});

module.exports = mongoose.model("squad", squad);
