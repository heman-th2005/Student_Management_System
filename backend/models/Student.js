const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({

  name:{
    type:String
  },

  usn:{
    type:String,
    unique:true,
    sparse:true
  },

  email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true
  },

  role:{
    type:String,
    enum:["student","teacher"],
    default:"student"
  },

  department:{
    type:String
  },

  sem:{
    type:Number
  },

  marks:{
    maths:{ type:Number, default:0 },
    physics:{ type:Number, default:0 },
    chemistry:{ type:Number, default:0 },
    computer:{ type:Number, default:0 }
  },

  attendance:{
    maths:{ type:Number, default:0 },
    physics:{ type:Number, default:0 },
    chemistry:{ type:Number, default:0 },
    computer:{ type:Number, default:0 }
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("Student", StudentSchema);
