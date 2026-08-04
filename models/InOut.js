const mongoose = require("mongoose");

const inOutSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    roomNo: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    photo: {
      type: String,
      default: "",
    },
    outTime: {
      type: Date,
      default: Date.now,
    },
    expectedReturnTime: {
      type: Date,
    },
    inTime: {
      type: Date,
      default: null,
    },
    destination: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["OUT", "IN", "Returned"],
      default: "OUT",
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("InOut", inOutSchema);
