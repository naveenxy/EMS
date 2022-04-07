const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({

   Name: {
         type: String,
       required:true,
         trim:true
     },
     RegisterNumber:{
         type:String,
        required: true,
         trim:true,
         unique:true
         
     },
     EmailId: {
         type:String,
         required: true,
         trim: true,
    },
     PhoneNumber:{
            type:String,
          
    },
     password: 
          {
              type:String,
             
                },
     leaveId:{
         type:[Schema.Types.ObjectId]
     },
    Token:[{
        type:String

    } ]     })
   module.exports=mongoose.model("User",User)

