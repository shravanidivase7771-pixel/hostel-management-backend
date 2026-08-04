const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    roomNo: { type: String, default: "" },
    assignedStaff: { type: String, default: "Maintenance Team" },
    priority: { type: String, enum: ["Low", "Medium", "High", "Urgent"], default: "Medium" },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    completedDate: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
