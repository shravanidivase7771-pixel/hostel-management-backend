const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },

    roomType: {
      type: String,
      enum: ["Single", "Double", "Triple"],
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    occupied: {
      type: Number,
      default: 0,
    },

    floor: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "Occupied", "Maintenance"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);