const mongoose = require("mongoose");

const messRegistrationSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    messType: { type: String, enum: ["Veg", "Non-Veg"], default: "Veg" },
    plan: { type: String, default: "Monthly" },
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MessRegistration", messRegistrationSchema);
