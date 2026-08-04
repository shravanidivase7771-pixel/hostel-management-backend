const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "Maintenance" },
    description: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Open", "In Progress", "Resolved"], default: "Open" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
