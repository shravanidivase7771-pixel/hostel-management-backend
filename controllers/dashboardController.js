const mongoose = require("mongoose");
const User = require("../models/User");
const Student = require("../models/Student");
const Room = require("../models/Room");
const Complaint = require("../models/Complaint");
const InOut = require("../models/InOut");
const Attendance = require("../models/Attendance");
const Payment = require("../models/Payment");
const Visitor = require("../models/Visitor");
const Maintenance = require("../models/Maintenance");
const GatePass = require("../models/GatePass");
const ActivityLog = require("../models/ActivityLog");
const { getStore } = require("../utils/storage");

const getDashboardSummary = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const [
        totalStudents,
        totalRooms,
        occupiedRooms,
        availableRooms,
        todayAttendanceCount,
        todayVisitorsCount,
        studentsOutside,
        studentsInside,
        todayPaymentsCount,
        todayComplaintsCount,
        pendingComplaintsCount,
        pendingLeavesCount,
        pendingMaintenanceCount,
        recentActivities,
      ] = await Promise.all([
        Student.countDocuments(),
        Room.countDocuments(),
        Room.countDocuments({ status: "Occupied" }),
        Room.countDocuments({ status: "Available" }),
        Attendance.countDocuments({ date: new Date().toISOString().split("T")[0], status: "Present" }),
        Visitor.countDocuments({ date: new Date().toISOString().split("T")[0] }),
        Student.countDocuments({ status: "Outside Hostel" }),
        Student.countDocuments({ status: { $ne: "Outside Hostel" } }),
        Payment.countDocuments({ date: new Date().toISOString().split("T")[0] }),
        Complaint.countDocuments({ createdAt: { $gte: startOfDay } }),
        Complaint.countDocuments({ status: "Pending" }),
        GatePass.countDocuments({ status: "Pending" }),
        Maintenance.countDocuments({ status: { $ne: "Completed" } }),
        ActivityLog.find().sort({ createdAt: -1 }).limit(10),
      ]);

      const analytics = {
        monthlyAttendance: [
          { month: "Jan", present: 95, absent: 5 },
          { month: "Feb", present: 92, absent: 8 },
          { month: "Mar", present: 98, absent: 2 },
          { month: "Apr", present: 94, absent: 6 },
          { month: "May", present: 96, absent: 4 },
          { month: "Jun", present: 97, absent: 3 },
          { month: "Jul", present: 95, absent: 5 },
        ],
        roomOccupancy: [
          { name: "Occupied", value: occupiedRooms || 1 },
          { name: "Available", value: availableRooms || 1 },
        ],
        paymentTrends: [
          { month: "Jan", hostelFees: 120000, messFees: 45000 },
          { month: "Feb", hostelFees: 135000, messFees: 48000 },
          { month: "Mar", hostelFees: 140000, messFees: 52000 },
          { month: "Apr", hostelFees: 125000, messFees: 46000 },
          { month: "May", hostelFees: 150000, messFees: 55000 },
          { month: "Jun", hostelFees: 160000, messFees: 58000 },
          { month: "Jul", hostelFees: 175000, messFees: 62000 },
        ],
        complaintAnalytics: [
          { category: "Plumbing", open: 3, resolved: 12 },
          { category: "Electrical", open: 2, resolved: 15 },
          { category: "Cleanliness", open: 1, resolved: 20 },
          { category: "Food Quality", open: 2, resolved: 18 },
          { category: "Wi-Fi", open: 4, resolved: 25 },
        ]
      };

      return res.status(200).json({
        summary: {
          totalStudents,
          totalRooms,
          occupiedRooms,
          availableRooms,
          todayAttendance: todayAttendanceCount,
          todayVisitors: todayVisitorsCount,
          studentsInside,
          studentsOutside,
          todayPayments: todayPaymentsCount,
          todayComplaints: todayComplaintsCount,
          pendingComplaints: pendingComplaintsCount,
          pendingLeaves: pendingLeavesCount,
          pendingMaintenance: pendingMaintenanceCount,
          occupancyRate: totalRooms ? Math.round((occupiedRooms / totalRooms) * 100) : 0,
        },
        recentActivities,
        analytics,
      });
    }

    // In-memory fallback
    const store = getStore();
    const totalStudents = (store.students || []).length;
    const totalRooms = (store.rooms || []).length;
    const occupiedRooms = (store.rooms || []).filter((r) => r.status === "Occupied").length;
    const availableRooms = totalRooms - occupiedRooms;
    const studentsOutside = (store.students || []).filter((s) => s.status === "Outside Hostel").length;
    const studentsInside = totalStudents - studentsOutside;
    const todayAttendanceCount = (store.attendance || []).filter((a) => a.status === "Present").length;
    const todayVisitorsCount = (store.visitors || []).length;
    const todayPaymentsCount = (store.payments || []).length;
    const todayComplaintsCount = (store.complaints || []).length;
    const pendingComplaintsCount = (store.complaints || []).filter((c) => c.status === "Pending" || c.status === "Open").length;
    const pendingLeavesCount = (store.gatePasses || []).filter((g) => g.status === "Pending").length;
    const pendingMaintenanceCount = (store.maintenances || []).filter((m) => m.status !== "Completed").length;

    const recentActivities = store.activityLogs || [
      { id: "act-1", user: "Watchman", action: "Checked OUT Student Sara Khan", timestamp: new Date().toISOString() },
      { id: "act-2", user: "Admin", action: "Assigned Room A-101 to Nikhil Rao", timestamp: new Date().toISOString() },
    ];

    const analytics = {
      monthlyAttendance: [
        { month: "Jan", present: 95, absent: 5 },
        { month: "Feb", present: 92, absent: 8 },
        { month: "Mar", present: 98, absent: 2 },
        { month: "Apr", present: 94, absent: 6 },
        { month: "May", present: 96, absent: 4 },
        { month: "Jun", present: 97, absent: 3 },
        { month: "Jul", present: 95, absent: 5 },
      ],
      roomOccupancy: [
        { name: "Occupied", value: occupiedRooms || 1 },
        { name: "Available", value: availableRooms || 1 },
      ],
      paymentTrends: [
        { month: "Jan", hostelFees: 120000, messFees: 45000 },
        { month: "Feb", hostelFees: 135000, messFees: 48000 },
        { month: "Mar", hostelFees: 140000, messFees: 52000 },
        { month: "Apr", hostelFees: 125000, messFees: 46000 },
        { month: "May", hostelFees: 150000, messFees: 55000 },
        { month: "Jun", hostelFees: 160000, messFees: 58000 },
        { month: "Jul", hostelFees: 175000, messFees: 62000 },
      ],
      complaintAnalytics: [
        { category: "Plumbing", open: 3, resolved: 12 },
        { category: "Electrical", open: 2, resolved: 15 },
        { category: "Cleanliness", open: 1, resolved: 20 },
        { category: "Food Quality", open: 2, resolved: 18 },
        { category: "Wi-Fi", open: 4, resolved: 25 },
      ]
    };

    return res.status(200).json({
      summary: {
        totalStudents,
        totalRooms,
        occupiedRooms,
        availableRooms,
        todayAttendance: todayAttendanceCount,
        todayVisitors: todayVisitorsCount,
        studentsInside,
        studentsOutside,
        todayPayments: todayPaymentsCount,
        todayComplaints: todayComplaintsCount,
        pendingComplaints: pendingComplaintsCount,
        pendingLeaves: pendingLeavesCount,
        pendingMaintenance: pendingMaintenanceCount,
        occupancyRate: totalRooms ? Math.round((occupiedRooms / totalRooms) * 100) : 0,
      },
      recentActivities,
      analytics,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardSummary };
