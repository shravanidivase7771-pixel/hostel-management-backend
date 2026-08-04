const express = require("express");
const router = express.Router();

const {
  allocateRoom,
  getAllocations,
} = require("../controllers/allocationController");

// Allocate Room
router.post("/", allocateRoom);

// Get All Allocations
router.get("/", getAllocations);

module.exports = router;