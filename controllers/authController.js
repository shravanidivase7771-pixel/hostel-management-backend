const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { getStore } = require("../utils/storage");

const DEFAULT_HASH = bcrypt.hashSync("password123", 10);

const DEFAULT_USERS = [
  { name: "Ava Thompson (Admin)", email: "admin@hostel.com", password: DEFAULT_HASH, role: "admin" },
  { name: "Nikhil Rao", email: "student@hostel.com", password: DEFAULT_HASH, role: "student", studentId: "STU-2026-001" },
  { name: "Rajesh Kumar", email: "warden@hostel.com", password: DEFAULT_HASH, role: "warden" },
  { name: "Ramesh Pawar", email: "watchman@hostel.com", password: DEFAULT_HASH, role: "watchman" },
];

// Helper to ensure MongoDB has default seed users
const ensureSeedUsersInDB = async () => {
  if (mongoose.connection.readyState !== 1) return;
  try {
    for (const u of DEFAULT_USERS) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
      }
    }
  } catch (err) {
    console.error("Seed users insert error:", err.message);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (mongoose.connection.readyState === 1) {
      let existUser = await User.findOne({ email });
      if (existUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword, role: role || "student" });

      return res.status(201).json({ message: "Registration successful", user: { ...user.toObject(), password: undefined } });
    }

    const store = getStore();
    const existing = store.users.find((entry) => entry.email === email);
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: `${Date.now()}`,
      _id: `${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role: role || "student",
      createdAt: new Date().toISOString(),
    };
    store.users.push(user);

    return res.status(201).json({ message: "Registration successful", user: { ...user, password: undefined } });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (mongoose.connection.readyState === 1) {
      // Auto-ensure default seed users exist in DB
      await ensureSeedUsersInDB();

      let user = await User.findOne({ email });

      if (!user) {
        // Fallback to store if not in MongoDB
        const store = getStore();
        const storeUser = store.users.find((entry) => entry.email === email);
        if (storeUser) {
          const isMatch = await bcrypt.compare(password, storeUser.password);
          if (!isMatch) return res.status(400).json({ message: "Invalid password" });
          const token = jwt.sign({ id: storeUser.id, email: storeUser.email }, process.env.JWT_SECRET || "hostel-secret", { expiresIn: "1d" });
          return res.status(200).json({ message: "Login successful", token, user: { ...storeUser, password: undefined } });
        }
        return res.status(404).json({ message: "User not found. Please register or check credentials." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "hostel-secret", { expiresIn: "1d" });

      return res.status(200).json({ message: "Login successful", token, user: { ...user.toObject(), password: undefined } });
    }

    // In-Memory Storage Fallback
    const store = getStore();
    const user = store.users.find((entry) => entry.email === email);
    if (!user) {
      return res.status(404).json({ message: "User not found. Please check credentials or register." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id || user._id, email: user.email }, process.env.JWT_SECRET || "hostel-secret", { expiresIn: "1d" });

    return res.status(200).json({ message: "Login successful", token, user: { ...user, password: undefined } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};