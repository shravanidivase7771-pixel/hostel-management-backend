const { getStore } = require("../utils/storage");
const mongoose = require("mongoose");
const User = require("../models/User");

const getProfile = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user._id || req.user.id).select("-password");
      return res.status(200).json(user);
    }

    const store = getStore();
    const user = store.users.find((entry) => entry.id === req.user.id || entry._id?.toString() === req.user._id?.toString());
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile };