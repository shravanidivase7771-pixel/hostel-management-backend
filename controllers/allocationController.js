const Allocation = require("../models/Allocation");
const Student = require("../models/Student");
const Room = require("../models/Room");

// Allocate Room
const allocateRoom = async (req, res) => {
  try {
    const { studentId, roomId } = req.body;

    // Student exists?
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    // Room exists?
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room Not Found",
      });
    }

    // Room Full?
    if (room.occupied >= room.capacity) {
      return res.status(400).json({
        success: false,
        message: "Room is Full",
      });
    }

    // Already Allocated?
    const alreadyAllocated = await Allocation.findOne({
      student: studentId,
      status: "Allocated",
    });

    if (alreadyAllocated) {
      return res.status(400).json({
        success: false,
        message: "Student already has a room",
      });
    }

    const allocation = await Allocation.create({
      student: studentId,
      room: roomId,
    });

    room.occupied += 1;

    if (room.occupied >= room.capacity) {
      room.status = "Occupied";
    }

    await room.save();

    res.status(201).json({
      success: true,
      message: "Room Allocated Successfully",
      allocation,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Allocations
const getAllocations = async (req, res) => {
  try {

    const allocations = await Allocation.find()
      .populate("student")
      .populate("room");

    res.status(200).json({
      success: true,
      allocations,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Vacate Room
const vacateRoom = async (req, res) => {
  try {
    const allocation = await Allocation.findById(req.params.id);

    if (!allocation) {
      return res.status(404).json({
        success: false,
        message: "Allocation Not Found",
      });
    }

    const room = await Room.findById(allocation.room);

    if (room && room.occupied > 0) {
      room.occupied -= 1;

      if (room.occupied < room.capacity) {
        room.status = "Available";
      }

      await room.save();
    }

    allocation.status = "Vacated";
    await allocation.save();

    res.status(200).json({
      success: true,
      message: "Room Vacated Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  allocateRoom,
  getAllocations,
  vacateRoom,
};