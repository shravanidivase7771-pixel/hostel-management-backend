const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    venue: { type: String, required: true },
    description: { type: String, required: true },
    organizer: { type: String, default: "Hostel Administration" },
    date: { type: String, required: true },
    category: { type: String, default: "General" },
    banner: { type: String, default: "" },
    photos: [{ type: String }],
    videos: [{ type: String }],
    likes: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
