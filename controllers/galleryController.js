const Gallery = require("../models/Gallery");
const mongoose = require("mongoose");
const { getStore, createId } = require("../utils/storage");

const getGalleryItems = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const items = await Gallery.find().sort({ createdAt: -1 });
      return res.status(200).json(items);
    }
    const store = getStore();
    return res.status(200).json(store.gallery || []);
  } catch (err) {
    next(err);
  }
};

const addGalleryItem = async (req, res, next) => {
  try {
    const { album, category, mediaType, url, caption } = req.body;
    if (mongoose.connection.readyState === 1) {
      const item = await Gallery.create({ album, category, mediaType, url, caption });
      return res.status(201).json(item);
    }
    const store = getStore();
    const item = {
      id: createId("gal"),
      _id: createId("gal"),
      album,
      category,
      mediaType: mediaType || "image",
      url,
      caption: caption || "",
      createdAt: new Date().toISOString(),
    };
    store.gallery = store.gallery || [];
    store.gallery.unshift(item);
    return res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

const deleteGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      await Gallery.findByIdAndDelete(id);
      return res.status(200).json({ message: "Gallery item deleted" });
    }
    const store = getStore();
    store.gallery = (store.gallery || []).filter((g) => g.id !== id && g._id !== id);
    return res.status(200).json({ message: "Gallery item deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getGalleryItems, addGalleryItem, deleteGalleryItem };
