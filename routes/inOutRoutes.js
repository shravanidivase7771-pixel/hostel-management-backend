const express = require("express");
const router = express.Router();
const {
  getInOutRecords,
  searchStudentForWatchman,
  checkOutStudent,
  checkInStudent,
} = require("../controllers/inOutController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getInOutRecords);
router.get("/search", protect, searchStudentForWatchman);
router.post("/checkout", protect, checkOutStudent);
router.put("/checkin/:id", protect, checkInStudent);

module.exports = router;
