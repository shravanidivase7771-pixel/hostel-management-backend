const mongoose = require("mongoose");

const watchmanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    shift: { type: String, enum: ["Day", "Night"], default: "Day" },
    gateNumber: { type: String, default: "Gate 1" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Watchman", watchmanSchema);
