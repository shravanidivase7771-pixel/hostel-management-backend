const express = require("express");
const router = express.Router();

const {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Add Student
router.post("/", addStudent);

// Get All Students
router.get("/", getStudents);

// Get Student By ID
router.get("/:id", getStudentById);

// Update Student
router.put("/:id", updateStudent);

// Delete Student
router.delete("/:id", deleteStudent);

module.exports = router;