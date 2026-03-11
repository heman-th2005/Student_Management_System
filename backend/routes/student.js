const express = require("express");
const router = express.Router();
const Student = require("../models/Student");


// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});


// GET single student (for student login view)
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});


// ADD student (Teacher feature)
router.post("/add", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json("Student Added Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});


// UPDATE student details (Teacher feature)
router.put("/update/:id", async (req, res) => {
  try {

    await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json("Student Updated Successfully");

  } catch (error) {
    res.status(500).json(error);
  }
});


// UPDATE student marks (Teacher feature)
router.put("/marks/:id", async (req, res) => {
  try {

    await Student.findByIdAndUpdate(
      req.params.id,
      { marks: req.body.marks },
      { new: true }
    );

    res.json("Marks Updated Successfully");

  } catch (error) {
    res.status(500).json(error);
  }
});


// DELETE student
router.delete("/delete/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json("Student Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;