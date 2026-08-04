const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require("mongoose");
const { getStore } = require("../utils/storage");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "hostel-secret");

    if (mongoose.connection.readyState === 1) {
      let user = await User.findById(decoded.id).select("-password");
      if (!user && decoded.email) {
        user = await User.findOne({ email: decoded.email }).select("-password");
      }
      if (!user) {
        const storeUser = getStore().users.find((entry) => entry.email === decoded.email || entry.id === decoded.id);
        if (storeUser) {
          req.user = { ...storeUser, _id: storeUser._id || storeUser.id };
          return next();
        }
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
    } else {
      const user = getStore().users.find(
        (entry) => entry.id === decoded.id || entry._id?.toString() === decoded.id || entry.email === decoded.email
      );
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = { ...user, _id: user._id || user.id };
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = { protect };
