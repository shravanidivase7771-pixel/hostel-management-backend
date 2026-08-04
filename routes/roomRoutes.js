const express = require("express");
const router = express.Router();

const {
  addRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

// Add Room
router.post("/", addRoom);

// Get All Rooms
router.get("/", getRooms);

// Get Room By ID
router.get("/:id", getRoomById);

// Update Room
router.put("/:id", updateRoom);

// Delete Room
router.delete("/:id", deleteRoom);

module.exports = router;