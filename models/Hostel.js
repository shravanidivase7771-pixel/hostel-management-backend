const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    floors: { type: Number, default: 4 },
    totalRooms: { type: Number, default: 50 },
    wardenName: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hostel", hostelSchema);
