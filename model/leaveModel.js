const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const Schema = mongoose.Schema;
const leave= new Schema({
   UserID:{
       type:Schema.Types.ObjectId
   },

  leaveType:{
      type:String,
      required:true,
      enum : ['CL','EL','WFH','LOP'],
  },
FromDate:{
    type:Date,
    required:true
},
ToDate:{
    type:Date,
    required:true
},
reason:{
    type:String,
    required:true
}
})  


module.exports=mongoose.model("leave",leave)