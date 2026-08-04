const Room = require("../models/Room");
const Student = require("../models/Student");
const mongoose = require("mongoose");
const { getStore, createId } = require("../utils/storage");

// =========================
// Add Room
// =========================
const addRoom = async (req, res, next) => {
  try {
    const { roomNumber, roomType, type, capacity, floor, price, rentPerMonth, facilities, block } = req.body;

    if (mongoose.connection.readyState === 1) {
      const room = new Room({
        roomNumber,
        roomType: roomType || type || "Single",
        capacity: capacity || 1,
        floor: floor || 1,
        price: price || rentPerMonth || 10000,
        status: "Available",
      });

      await room.save();

      return res.status(201).json({
        success: true,
        message: "Room Added Successfully",
        room,
      });
    }

    const store = getStore();
    const newRoom = {
      id: createId("room"),
      _id: createId("room"),
      roomNumber,
      block: block || "Block A",
      floor: floor || 1,
      type: roomType || type || "Single",
      capacity: capacity || 1,
      occupancy: 0,
      facilities: facilities ? (Array.isArray(facilities) ? facilities : facilities.split(",")) : ["Fan", "Study Desk"],
      rentPerMonth: price || rentPerMonth || 10000,
      status: "Available",
      assignedStudents: [],
    };

    store.rooms = store.rooms || [];
    store.rooms.push(newRoom);

    return res.status(201).json(newRoom);
  } catch (error) {
    next(error);
  }
};

// =========================
// Get All Rooms (with Assigned Students & Department info)
// =========================
const getRooms = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const rooms = await Room.find();
      const allStudents = await Student.find();

      const enrichedRooms = rooms.map((r) => {
        const roomObj = r.toObject();
        const assigned = allStudents.filter(
          (s) => s.roomNo === roomObj.roomNumber || s.roomNo === roomObj._id.toString()
        );
        return {
          ...roomObj,
          occupancy: assigned.length,
          status: assigned.length >= (roomObj.capacity || 1) ? "Occupied" : "Available",
          assignedStudents: assigned.map((s) => ({
            id: s._id,
            name: s.fullName || s.name,
            studentId: s.studentId,
            course: s.course || s.department || "Engineering",
            year: s.year || "3rd Year",
            photo: s.photo,
            phone: s.phone,
          })),
        };
      });

      return res.status(200).json(enrichedRooms);
    }

    const store = getStore();
    const rooms = store.rooms || [];
    const students = store.students || [];

    const enrichedRooms = rooms.map((r) => {
      const assigned = students.filter(
        (s) => (s.roomNo || s.roomNumber) === r.roomNumber
      );
      return {
        ...r,
        occupancy: assigned.length,
        status: assigned.length >= (r.capacity || 1) ? "Occupied" : "Available",
        assignedStudents: assigned.map((s) => ({
          id: s._id || s.id,
          name: s.fullName || s.name,
          studentId: s.studentId || "STU-2026",
          course: s.course || "Computer Science",
          year: s.year || "3rd Year",
          photo: s.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          phone: s.phone || "+91 99887 66554",
        })),
      };
    });

    return res.status(200).json(enrichedRooms);
  } catch (error) {
    next(error);
  }
};

// =========================
// Get Room By ID
// =========================
const getRoomById = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const room = await Room.findById(req.params.id);
      if (!room) return res.status(404).json({ success: false, message: "Room Not Found" });
      return res.status(200).json(room);
    }

    const store = getStore();
    const room = (store.rooms || []).find((r) => r.id === req.params.id || r._id === req.params.id);
    if (!room) return res.status(404).json({ message: "Room Not Found" });
    return res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

// =========================
// Update Room
// =========================
const updateRoom = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(200).json(room);
    }

    const store = getStore();
    const index = (store.rooms || []).findIndex((r) => r.id === req.params.id || r._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Room Not Found" });

    store.rooms[index] = { ...store.rooms[index], ...req.body };
    return res.status(200).json(store.rooms[index]);
  } catch (error) {
    next(error);
  }
};

// =========================
// Delete Room
// =========================
const deleteRoom = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Room.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: "Room Deleted Successfully" });
    }

    const store = getStore();
    store.rooms = (store.rooms || []).filter((r) => r.id !== req.params.id && r._id !== req.params.id);
    return res.status(200).json({ success: true, message: "Room Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};