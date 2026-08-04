const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    album: { type: String, required: true },
    category: { type: String, required: true },
    mediaType: { type: String, enum: ["image", "video"], default: "image" },
    url: { type: String, required: true },
    caption: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
