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
         required:[ true,'please enter a Email'],
         trim: true,
         match:[
            /\S+@\S+\.\S+/,'please add valid email'
         ]
    },
     PhoneNumber:{
            type:String,
            match:[
                /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,'ENter a valid phoneNumber'
            ]
          
    },
     password: 
          {
              type:String,
             
                },
     leaveId:{
         type:[Schema.Types.ObjectId]
     },
        })
   module.exports=mongoose.model("User",User)

