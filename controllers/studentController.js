// const Student = require('../models/studentModel');
const { response } = require("express");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;


// Get all students
exports.getStudents = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const result = await db.collection("student").find();
    result.toArray().then((students) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(students);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
