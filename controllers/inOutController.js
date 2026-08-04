const InOut = require("../models/InOut");
const Student = require("../models/Student");
const mongoose = require("mongoose");
const { getStore, createId } = require("../utils/storage");
const { broadcastInOutUpdate } = require("../socket/socketServer");

// Get all In-Out records
const getInOutRecords = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const records = await InOut.find().sort({ createdAt: -1 });
      return res.status(200).json(records);
    }
    const store = getStore();
    return res.status(200).json(store.inOut || []);
  } catch (error) {
    next(error);
  }
};

// Search Student for Watchman
const searchStudentForWatchman = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query required" });
    }

    if (mongoose.connection.readyState === 1) {
      const queryFilter = [
        { fullName: { $regex: query, $options: "i" } },
        { studentId: { $regex: query, $options: "i" } },
        { roomNo: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ];
      if (mongoose.Types.ObjectId.isValid(query)) {
        queryFilter.push({ _id: query });
      }

      const students = await Student.find({ $or: queryFilter });
      return res.status(200).json(students);
    }

    const store = getStore();
    const q = query.toLowerCase();
    const students = (store.students || []).filter(
      (s) =>
        (s.fullName || s.name || "").toLowerCase().includes(q) ||
        (s.studentId || "").toLowerCase().includes(q) ||
        (s.roomNo || "").toLowerCase().includes(q) ||
        (s.phone || "").toLowerCase().includes(q)
    );
    return res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

// Check OUT Student
const checkOutStudent = async (req, res, next) => {
  try {
    const { studentId, studentName, roomNo, phone, photo, destination, reason, expectedReturnTime } = req.body;

    if (mongoose.connection.readyState === 1) {
      const record = await InOut.create({
        studentId,
        studentName,
        roomNo,
        phone,
        photo,
        destination,
        reason,
        outTime: new Date(),
        expectedReturnTime: expectedReturnTime ? new Date(expectedReturnTime) : null,
        status: "OUT",
        date: new Date().toISOString().split("T")[0],
      });

      // Update student status safely without ObjectId CastError
      const queryFilter = [{ studentId }];
      if (mongoose.Types.ObjectId.isValid(studentId)) {
        queryFilter.push({ _id: studentId });
      }
      await Student.findOneAndUpdate(
        { $or: queryFilter },
        { status: "Outside Hostel" }
      );

      broadcastInOutUpdate(record);
      return res.status(201).json(record);
    }

    const store = getStore();
    const record = {
      id: createId("inout"),
      _id: createId("inout"),
      studentId,
      studentName,
      roomNo,
      phone,
      photo: photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      destination,
      reason,
      outTime: new Date().toISOString(),
      expectedReturnTime: expectedReturnTime || new Date(Date.now() + 4 * 3600000).toISOString(),
      inTime: null,
      status: "OUT",
      date: new Date().toISOString().split("T")[0],
    };

    store.inOut = store.inOut || [];
    store.inOut.unshift(record);

    const stu = (store.students || []).find((s) => s.studentId === studentId || s.id === studentId || s._id === studentId);
    if (stu) {
      stu.status = "Outside Hostel";
    }

    broadcastInOutUpdate(record);
    return res.status(201).json(record);
  } catch (error) {
    next(error);
  }
};

// Check IN Student
const checkInStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const record = await InOut.findById(id);
      if (!record) {
        return res.status(404).json({ message: "In-Out record not found" });
      }

      record.inTime = new Date();
      record.status = "Returned";
      await record.save();

      // Update student status safely without ObjectId CastError
      const queryFilter = [{ studentId: record.studentId }];
      if (mongoose.Types.ObjectId.isValid(record.studentId)) {
        queryFilter.push({ _id: record.studentId });
      }
      await Student.findOneAndUpdate(
        { $or: queryFilter },
        { status: "Inside Hostel" }
      );

      broadcastInOutUpdate(record);
      return res.status(200).json(record);
    }

    const store = getStore();
    const record = (store.inOut || []).find((item) => item.id === id || item._id === id);
    if (!record) {
      return res.status(404).json({ message: "In-Out record not found" });
    }

    record.inTime = new Date().toISOString();
    record.status = "Returned";

    const stu = (store.students || []).find((s) => s.studentId === record.studentId || s.id === record.studentId || s._id === record.studentId);
    if (stu) {
      stu.status = "Inside Hostel";
    }

    broadcastInOutUpdate(record);
    return res.status(200).json(record);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInOutRecords,
  searchStudentForWatchman,
  checkOutStudent,
  checkInStudent,
};
