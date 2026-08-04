const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getAttendance, createAttendance, updateAttendance } = require("../controllers/attendanceController");

router.get("/", protect, getAttendance);
router.post("/", protect, createAttendance);
router.put("/:id", protect, updateAttendance);

module.exports = router;