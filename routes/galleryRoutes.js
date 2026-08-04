const express = require("express");
const router = express.Router();
const { getGalleryItems, addGalleryItem, deleteGalleryItem } = require("../controllers/galleryController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getGalleryItems);
router.post("/", protect, addGalleryItem);
router.delete("/:id", protect, deleteGalleryItem);

module.exports = router;
