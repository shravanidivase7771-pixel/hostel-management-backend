const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getVisitors, createVisitor } = require("../controllers/visitorController");

router.get("/", protect, getVisitors);
router.post("/", protect, createVisitor);

module.exports = router;