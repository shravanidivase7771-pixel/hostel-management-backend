const { getStore, createId } = require("../utils/storage");
const { broadcastNotification } = require("../socket/socketServer");

const getNotifications = (req, res) => {
  const store = getStore();
  return res.status(200).json(store.notifications || []);
};

const createNotification = (req, res) => {
  const store = getStore();
  const notif = {
    id: createId("notif"),
    _id: createId("notif"),
    title: req.body.title || "Notification",
    message: req.body.message || "",
    read: false,
    createdAt: new Date().toISOString(),
  };
  store.notifications = store.notifications || [];
  store.notifications.unshift(notif);
  broadcastNotification(notif);
  return res.status(201).json(notif);
};

const markAsRead = (req, res) => {
  const store = getStore();
  const { id } = req.params;
  const notif = (store.notifications || []).find((n) => n.id === id || n._id === id);
  if (notif) notif.read = true;
  return res.status(200).json({ message: "Notification marked read" });
};

module.exports = { getNotifications, createNotification, markAsRead };
