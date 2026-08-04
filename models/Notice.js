const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "General" },
    isPinned: { type: Boolean, default: false },
    attachmentUrl: { type: String, default: "" },
    postedBy: { type: String, default: "Admin Office" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);
