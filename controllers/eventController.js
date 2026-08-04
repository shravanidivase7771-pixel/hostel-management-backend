const Event = require("../models/Event");
const mongoose = require("mongoose");
const { getStore, createId } = require("../utils/storage");

const getEvents = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const events = await Event.find().sort({ createdAt: -1 });
      return res.status(200).json(events);
    }
    const store = getStore();
    return res.status(200).json(store.events || []);
  } catch (err) {
    next(err);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const { title, venue, description, organizer, date, category, banner, photos, videos } = req.body;
    if (mongoose.connection.readyState === 1) {
      const event = await Event.create({ title, venue, description, organizer, date, category, banner, photos, videos });
      return res.status(201).json(event);
    }
    const store = getStore();
    const event = {
      id: createId("evt"),
      _id: createId("evt"),
      title,
      venue,
      description,
      organizer: organizer || "Hostel Admin",
      date,
      category: category || "General",
      banner: banner || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      photos: photos || [],
      videos: videos || [],
      likes: [],
      createdAt: new Date().toISOString(),
    };
    store.events = store.events || [];
    store.events.unshift(event);
    return res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(event);
    }
    const store = getStore();
    const index = (store.events || []).findIndex((e) => e.id === id || e._id === id);
    if (index === -1) return res.status(404).json({ message: "Event not found" });
    store.events[index] = { ...store.events[index], ...req.body };
    return res.status(200).json(store.events[index]);
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      await Event.findByIdAndDelete(id);
      return res.status(200).json({ message: "Event deleted successfully" });
    }
    const store = getStore();
    store.events = (store.events || []).filter((e) => e.id !== id && e._id !== id);
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const toggleLikeEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.user?._id || "user-guest";
    if (mongoose.connection.readyState === 1) {
      const event = await Event.findById(id);
      if (!event) return res.status(404).json({ message: "Event not found" });
      const index = event.likes.indexOf(userId);
      if (index === -1) event.likes.push(userId);
      else event.likes.splice(index, 1);
      await event.save();
      return res.status(200).json(event);
    }
    const store = getStore();
    const event = (store.events || []).find((e) => e.id === id || e._id === id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    event.likes = event.likes || [];
    const index = event.likes.indexOf(userId);
    if (index === -1) event.likes.push(userId);
    else event.likes.splice(index, 1);
    return res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent, toggleLikeEvent };
