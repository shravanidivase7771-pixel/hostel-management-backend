const mongoose = require("mongoose");
const Complaint = require("../models/Complaint");
const { getStore, createId } = require("../utils/storage");

const getComplaints = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const complaints = await Complaint.find().sort({ createdAt: -1 });
      return res.status(200).json(complaints);
    }

    return res.status(200).json(getStore().complaints);
  } catch (error) {
    next(error);
  }
};

const createComplaint = async (req, res, next) => {
  try {
    const payload = {
      studentName: req.body.studentName,
      title: req.body.title,
      category: req.body.category || "Maintenance",
      description: req.body.description,
      status: req.body.status || "Open",
      priority: req.body.priority || "Medium",
    };

    if (mongoose.connection.readyState === 1) {
      const complaint = await Complaint.create(payload);
      return res.status(201).json(complaint);
    }

    const store = getStore();
    const complaint = { id: createId("complaint"), ...payload, createdAt: new Date().toISOString() };
    store.complaints.push(complaint);
    return res.status(201).json(complaint);
  } catch (error) {
    next(error);
  }
};

const updateComplaint = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(200).json(complaint);
    }

    const store = getStore();
    const index = store.complaints.findIndex((item) => item.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Complaint not found" });
    store.complaints[index] = { ...store.complaints[index], ...req.body };
    return res.status(200).json(store.complaints[index]);
  } catch (error) {
    next(error);
  }
};

const deleteComplaint = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Complaint.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Complaint removed" });
    }

    const store = getStore();
    store.complaints = store.complaints.filter((item) => item.id !== req.params.id);
    return res.status(200).json({ message: "Complaint removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getComplaints, createComplaint, updateComplaint, deleteComplaint };
