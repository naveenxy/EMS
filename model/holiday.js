const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const holiday=new Schema({
    Holiday_Name:{
        type:String
    },
    Date:{
        type:String
    }
})

module.exports = mongoose.model("holiday",holiday);