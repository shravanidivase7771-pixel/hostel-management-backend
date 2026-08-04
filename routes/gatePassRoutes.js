const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getGatePasses, createGatePass, updateGatePass } = require("../controllers/gatePassController");

router.get("/", protect, getGatePasses);
router.post("/", protect, createGatePass);
router.put("/:id", protect, updateGatePass);

module.exports = router;