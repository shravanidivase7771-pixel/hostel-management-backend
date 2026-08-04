const mongoose = require("mongoose");

const wardenSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    hostelBlock: { type: String, default: "Block A" },
    assignedFloor: { type: String, default: "All Floors" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warden", wardenSchema);
