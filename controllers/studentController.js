const Student = require("../models/Student");
const mongoose = require("mongoose");
const { getStore, createId } = require("../utils/storage");

// Helper to determine floor from room number if not explicitly specified
const resolveFloor = (floorInput, roomNo) => {
  if (floorInput && !isNaN(parseInt(floorInput))) return parseInt(floorInput);
  if (roomNo && typeof roomNo === "string") {
    const match = roomNo.match(/(\d)/);
    if (match) {
      const firstDigit = parseInt(match[1]);
      if (firstDigit >= 1 && firstDigit <= 4) return firstDigit;
    }
  }
  return 1;
};

// ===========================
// Add Student
// ===========================
const addStudent = async (req, res, next) => {
  try {
    const floor = resolveFloor(req.body.floor, req.body.roomNo || req.body.roomNumber);

    if (mongoose.connection.readyState === 1) {
      const student = new Student({
        ...req.body,
        floor,
        studentId: req.body.studentId || `STU-${Date.now().toString().slice(-6)}`,
      });
      await student.save();
      return res.status(201).json(student);
    }

    const store = getStore();
    const newStudent = {
      id: createId("stu"),
      _id: createId("stu"),
      fullName: req.body.fullName || req.body.name || "New Student",
      studentId: req.body.studentId || `STU-${Date.now().toString().slice(-6)}`,
      email: req.body.email || `student${Date.now()}@hostel.com`,
      phone: req.body.phone || "+91 99887 76655",
      roomNo: req.body.roomNo || req.body.roomNumber || "A-101",
      floor,
      course: req.body.course || req.body.department || "Computer Science",
      year: req.body.year || "3rd Year",
      status: "Inside Hostel",
      photo: req.body.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    };
    store.students = store.students || [];
    store.students.push(newStudent);
    return res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

// ===========================
// Get All Students
// ===========================
const getStudents = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const students = await Student.find();
      const enriched = students.map((s) => {
        const obj = s.toObject();
        return {
          ...obj,
          floor: resolveFloor(obj.floor, obj.roomNo),
        };
      });
      return res.status(200).json(enriched);
    }

    const store = getStore();
    const enriched = (store.students || []).map((s) => ({
      ...s,
      floor: resolveFloor(s.floor, s.roomNo),
    }));
    return res.status(200).json(enriched);
  } catch (error) {
    next(error);
  }
};

// ===========================
// Get Student By ID
// ===========================
const getStudentById = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const student = await Student.findById(req.params.id);
      if (!student) return res.status(404).json({ message: "Student Not Found" });
      const obj = student.toObject();
      return res.status(200).json({ ...obj, floor: resolveFloor(obj.floor, obj.roomNo) });
    }

    const store = getStore();
    const student = (store.students || []).find((s) => s.id === req.params.id || s._id === req.params.id);
    if (!student) return res.status(404).json({ message: "Student Not Found" });
    return res.status(200).json({ ...student, floor: resolveFloor(student.floor, student.roomNo) });
  } catch (error) {
    next(error);
  }
};

// ===========================
// Update Student
// ===========================
const updateStudent = async (req, res, next) => {
  try {
    const floor = resolveFloor(req.body.floor, req.body.roomNo || req.body.roomNumber);

    if (mongoose.connection.readyState === 1) {
      const student = await Student.findByIdAndUpdate(req.params.id, { ...req.body, floor }, { new: true });
      if (!student) return res.status(404).json({ message: "Student Not Found" });
      return res.status(200).json(student);
    }

    const store = getStore();
    const index = (store.students || []).findIndex((s) => s.id === req.params.id || s._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Student Not Found" });

    store.students[index] = { ...store.students[index], ...req.body, floor };
    return res.status(200).json(store.students[index]);
  } catch (error) {
    next(error);
  }
};

// ===========================
// Delete Student
// ===========================
const deleteStudent = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) return res.status(404).json({ message: "Student Not Found" });
      return res.status(200).json({ success: true, message: "Student Deleted Successfully" });
    }

    const store = getStore();
    store.students = (store.students || []).filter((s) => s.id !== req.params.id && s._id !== req.params.id);
    return res.status(200).json({ success: true, message: "Student Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};