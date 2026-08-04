const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const { initSocket } = require("./config/socket");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const studentRoutes = require("./routes/studentRoutes");
const roomRoutes = require("./routes/roomRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const profileRoutes = require("./routes/profileRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const gatePassRoutes = require("./routes/gatePassRoutes");
const laundryRoutes = require("./routes/laundryRoutes");
const allocationRoutes = require("./routes/allocationRoutes");
const inOutRoutes = require("./routes/inOutRoutes");
const eventRoutes = require("./routes/eventRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const messRoutes = require("./routes/messRoutes");
const reportRoutes = require("./routes/reportRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/gatepasses", gatePassRoutes);
app.use("/api/laundry", laundryRoutes);
app.use("/api/allocations", allocationRoutes);
app.use("/api/inout", inOutRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/mess", messRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Hostel & Mess Administration System API Running with Socket.IO...");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT} with Socket.IO Enabled`);
});