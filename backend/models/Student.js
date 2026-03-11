const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  usn: {
    type: String,
    required: true,
    unique: true
  },

  department: {
    type: String,
    required: true
  },

  sem: {
    type: Number,
    required: true
  },

  marks: {
    maths: {
      type: Number,
      default: 0
    },
    physics: {
      type: Number,
      default: 0
    },
    chemistry: {
      type: Number,
      default: 0
    },
    computer: {
      type: Number,
      default: 0
    }
  }

});

module.exports = mongoose.model("Student", StudentSchema);