const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getPayments, createPayment } = require("../controllers/paymentController");

router.get("/", protect, getPayments);
router.post("/", protect, createPayment);

module.exports = router;