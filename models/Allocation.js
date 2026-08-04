const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    allocationDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Allocated", "Vacated"],
      default: "Allocated",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Allocation", allocationSchema);