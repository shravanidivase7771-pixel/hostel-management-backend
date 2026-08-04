const mongoose = require("mongoose");

const messPaymentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    month: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["Paid", "Pending"], default: "Paid" },
    date: { type: String, default: () => new Date().toISOString().split("T")[0] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MessPayment", messPaymentSchema);
