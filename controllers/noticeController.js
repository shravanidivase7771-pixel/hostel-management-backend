const Notice = require("../models/Notice");
const mongoose = require("mongoose");
const { getStore, createId } = require("../utils/storage");

const getNotices = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const notices = await Notice.find().sort({ isPinned: -1, createdAt: -1 });
      return res.status(200).json(notices);
    }
    const store = getStore();
    return res.status(200).json(store.notices || []);
  } catch (err) {
    next(err);
  }
};

const createNotice = async (req, res, next) => {
  try {
    const { title, content, category, isPinned, attachmentUrl } = req.body;
    if (mongoose.connection.readyState === 1) {
      const notice = await Notice.create({
        title,
        content,
        category: category || "General",
        isPinned: !!isPinned,
        attachmentUrl: attachmentUrl || "",
        postedBy: req.user?.name || "Admin Office",
      });
      return res.status(201).json(notice);
    }
    const store = getStore();
    const notice = {
      id: createId("not"),
      _id: createId("not"),
      title,
      content,
      category: category || "General",
      isPinned: !!isPinned,
      attachmentUrl: attachmentUrl || "",
      postedBy: req.user?.name || "Admin Office",
      createdAt: new Date().toISOString(),
    };
    store.notices = store.notices || [];
    if (isPinned) store.notices.unshift(notice);
    else store.notices.push(notice);
    return res.status(201).json(notice);
  } catch (err) {
    next(err);
  }
};

const deleteNotice = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      await Notice.findByIdAndDelete(id);
      return res.status(200).json({ message: "Notice deleted" });
    }
    const store = getStore();
    store.notices = (store.notices || []).filter((n) => n.id !== id && n._id !== id);
    return res.status(200).json({ message: "Notice deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getNotices, createNotice, deleteNotice };
