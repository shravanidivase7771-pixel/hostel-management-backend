const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);
