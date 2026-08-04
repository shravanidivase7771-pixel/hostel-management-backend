const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getLaundryRequests, createLaundryRequest } = require("../controllers/laundryController");

router.get("/", protect, getLaundryRequests);
router.post("/", protect, createLaundryRequest);

module.exports = router;