const express = require("express");
const router = express.Router();
const {
  getMessData,
  updateMessMenu,
  registerMess,
  recordMessPayment,
  submitFoodRating,
} = require("../controllers/messController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getMessData);
router.put("/menu", protect, updateMessMenu);
router.post("/register", protect, registerMess);
router.post("/payment", protect, recordMessPayment);
router.post("/rating", protect, submitFoodRating);

module.exports = router;
