const express = require("express");
const router = express.Router();
const Student = require("../models/Student");


// ============================
// SIGNUP
// ============================

router.post("/signup", async (req,res)=>{

  try{

    const newUser = new Student(req.body);

    await newUser.save();

    res.json("Signup successful");

  }catch(error){

    res.status(500).json(error);

  }

});


// ============================
// LOGIN
// ============================

router.post("/login", async (req,res)=>{

  try{

    const {email,password} = req.body;

    const user = await Student.findOne({email,password});

    if(!user){
      return res.status(400).json("Invalid credentials");
    }

    res.json(user);

  }catch(error){

    res.status(500).json(error);

  }

});


// ============================
// GET ALL STUDENTS
// ============================

router.get("/", async (req,res)=>{

  try{

    const students = await Student.find({
      role:"student"
    });

    res.json(students);

  }catch(error){

    res.status(500).json(error);

  }

});


// ============================
// UPDATE MARKS
// ============================

router.put("/marks/:id", async (req,res)=>{

  try{

    const updated = await Student.findByIdAndUpdate(

      req.params.id,
      { marks:req.body.marks },
      { new:true }

    );

    res.json(updated);

  }catch(error){

    res.status(500).json(error);

  }

});


// ============================
// UPDATE ATTENDANCE
// ============================

router.put("/attendance/:id", async (req,res)=>{

  try{

    const updated = await Student.findByIdAndUpdate(

      req.params.id,
      { attendance:req.body.attendance },
      { new:true }

    );

    res.json(updated);

  }catch(error){

    res.status(500).json(error);

  }

});


// ============================
// DELETE STUDENT
// ============================

router.delete("/delete/:id", async (req,res)=>{

  try{

    await Student.findByIdAndDelete(req.params.id);

    res.json("Student deleted");

  }catch(error){

    res.status(500).json(error);

  }

});

module.exports = router;
