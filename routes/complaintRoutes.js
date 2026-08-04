const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getComplaints, createComplaint, updateComplaint, deleteComplaint } = require("../controllers/complaintController");

router.get("/", protect, getComplaints);
router.post("/", protect, createComplaint);
router.put("/:id", protect, updateComplaint);
router.delete("/:id", protect, deleteComplaint);

module.exports = router;
