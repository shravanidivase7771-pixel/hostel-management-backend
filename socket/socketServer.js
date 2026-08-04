const { getIO } = require("../config/socket");

const broadcastInOutUpdate = (inOutData) => {
  try {
    const io = getIO();
    io.emit("inout_updated", inOutData);
    io.emit("dashboard_stats_changed", { type: "inout", data: inOutData });
  } catch (err) {
    console.error("Socket broadcast error:", err.message);
  }
};

const broadcastNotification = (notification) => {
  try {
    const io = getIO();
    io.emit("notification_sent", notification);
  } catch (err) {
    console.error("Socket notification error:", err.message);
  }
};

module.exports = {
  broadcastInOutUpdate,
  broadcastNotification,
};
