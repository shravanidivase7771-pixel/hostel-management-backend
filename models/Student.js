const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },

    dob: {
      type: Date,
    },

    college: {
      type: String,
    },

    course: {
      type: String,
    },

    year: {
      type: String,
    },

    floor: {
      type: Number,
      default: 1,
    },

    roomNo: {
      type: String,
    },

    address: {
      type: String,
    },

    parentName: {
      type: String,
    },

    parentPhone: {
      type: String,
    },

    photo: {
      type: String,
      default: "",
    },

    admissionDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      default: "Inside Hostel",
    },

    studentId: {
      type: String,
      unique: true,
    },

    messType: {
      type: String,
      enum: ["Veg", "Non-Veg"],
      default: "Veg",
    },

    feeStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Paid",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);