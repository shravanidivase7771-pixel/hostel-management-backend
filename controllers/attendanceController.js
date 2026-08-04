const { getStore, createId } = require("../utils/storage");

const getAttendance = (req, res) => {
  const store = getStore();
  res.status(200).json(store.attendance || []);
};

const createAttendance = (req, res) => {
  const store = getStore();
  const entry = { id: createId("attendance"), ...req.body, createdAt: new Date().toISOString() };
  store.attendance = store.attendance || [];
  store.attendance.push(entry);
  res.status(201).json(entry);
};

const updateAttendance = (req, res) => {
  const store = getStore();
  const index = (store.attendance || []).findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Attendance record not found" });
  store.attendance[index] = { ...store.attendance[index], ...req.body };
  res.status(200).json(store.attendance[index]);
};

module.exports = { getAttendance, createAttendance, updateAttendance };