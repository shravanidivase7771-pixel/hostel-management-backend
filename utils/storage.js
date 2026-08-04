const bcrypt = require("bcryptjs");

// Pre-hashed default password 'password123'
const DEFAULT_HASH = bcrypt.hashSync("password123", 10);

const createSeedStore = () => ({
  users: [
    {
      id: "admin-1",
      _id: "admin-1",
      name: "Ava Thompson (Admin)",
      email: "admin@hostel.com",
      password: DEFAULT_HASH,
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: "student-1",
      _id: "student-1",
      name: "Nikhil Rao",
      email: "student@hostel.com",
      password: DEFAULT_HASH,
      role: "student",
      studentId: "STU-2026-001",
      roomNo: "A-101",
      createdAt: new Date().toISOString(),
    },
    {
      id: "warden-1",
      _id: "warden-1",
      name: "Rajesh Kumar",
      email: "warden@hostel.com",
      password: DEFAULT_HASH,
      role: "warden",
      createdAt: new Date().toISOString(),
    },
    {
      id: "watchman-1",
      _id: "watchman-1",
      name: "Ramesh Pawar",
      email: "watchman@hostel.com",
      password: DEFAULT_HASH,
      role: "watchman",
      createdAt: new Date().toISOString(),
    },
  ],
  students: [
    {
      id: "stu-1",
      _id: "stu-1",
      studentId: "STU-2026-001",
      fullName: "Nikhil Rao",
      name: "Nikhil Rao",
      email: "student@hostel.com",
      phone: "+91 99887 66554",
      gender: "Male",
      dob: "2003-05-15",
      college: "Institute of Technology",
      course: "Computer Science & Engineering",
      year: "3rd Year",
      roomNo: "A-101",
      address: "123 Green Park, Mumbai",
      parentName: "Suresh Rao",
      parentPhone: "+91 98200 11223",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      messType: "Veg",
      feeStatus: "Paid",
      status: "Inside Hostel",
      createdAt: new Date().toISOString(),
    },
    {
      id: "stu-2",
      _id: "stu-2",
      studentId: "STU-2026-002",
      fullName: "Sara Khan",
      name: "Sara Khan",
      email: "sara@hostel.com",
      phone: "+91 88776 55443",
      gender: "Female",
      dob: "2004-02-10",
      college: "School of Management",
      course: "Business Administration",
      year: "2nd Year",
      roomNo: "B-204",
      address: "456 Sunrise Ave, Pune",
      parentName: "Tariq Khan",
      parentPhone: "+91 98200 44556",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      messType: "Non-Veg",
      feeStatus: "Pending",
      status: "Outside Hostel",
      createdAt: new Date().toISOString(),
    },
    {
      id: "stu-3",
      _id: "stu-3",
      studentId: "STU-2026-003",
      fullName: "Aarav Patel",
      name: "Aarav Patel",
      email: "aarav@hostel.com",
      phone: "+91 97654 32109",
      gender: "Male",
      dob: "2002-11-20",
      college: "Institute of Technology",
      course: "Mechanical Engineering",
      year: "4th Year",
      roomNo: "A-102",
      address: "789 MG Road, Ahmedabad",
      parentName: "Ketan Patel",
      parentPhone: "+91 97654 11111",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      messType: "Veg",
      feeStatus: "Paid",
      status: "Inside Hostel",
      createdAt: new Date().toISOString(),
    }
  ],
  rooms: [
    {
      id: "room-1",
      _id: "room-1",
      roomNumber: "A-101",
      block: "Block A",
      floor: 1,
      type: "Single",
      capacity: 1,
      occupancy: 1,
      facilities: ["AC", "Attached Bath", "Study Desk", "Wi-Fi"],
      rentPerMonth: 12000,
      status: "Occupied",
    },
    {
      id: "room-2",
      _id: "room-2",
      roomNumber: "B-204",
      block: "Block B",
      floor: 2,
      type: "Double",
      capacity: 2,
      occupancy: 1,
      facilities: ["Fan", "Study Desk", "Balcony"],
      rentPerMonth: 8500,
      status: "Available",
    },
    {
      id: "room-3",
      _id: "room-3",
      roomNumber: "A-102",
      block: "Block A",
      floor: 1,
      type: "Double",
      capacity: 2,
      occupancy: 1,
      facilities: ["AC", "Attached Bath", "Wi-Fi"],
      rentPerMonth: 10000,
      status: "Available",
    }
  ],
  wardens: [
    {
      id: "warden-1",
      _id: "warden-1",
      name: "Rajesh Kumar",
      email: "warden@hostel.com",
      phone: "+91 98111 22334",
      hostelBlock: "Block A & B",
      assignedFloor: "All Floors"
    }
  ],
  watchmen: [
    {
      id: "watchman-1",
      _id: "watchman-1",
      name: "Ramesh Pawar",
      email: "watchman@hostel.com",
      phone: "+91 98222 33445",
      shift: "Day",
      gateNumber: "Gate 1"
    }
  ],
  inOut: [
    {
      id: "inout-1",
      _id: "inout-1",
      studentId: "STU-2026-002",
      studentName: "Sara Khan",
      roomNo: "B-204",
      phone: "+91 88776 55443",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      outTime: "2026-07-29T16:30:00.000Z",
      expectedReturnTime: "2026-07-29T20:00:00.000Z",
      inTime: null,
      destination: "City Library & Mall",
      reason: "Study materials & groceries",
      status: "OUT",
      date: "2026-07-29"
    }
  ],
  events: [
    {
      id: "evt-1",
      _id: "evt-1",
      title: "Annual Cultural Fest 2026",
      venue: "Main Campus Auditorium",
      description: "Join us for night of music, dance, fashion show and live DJ performance!",
      organizer: "Hostel Cultural Committee",
      date: "2026-08-15",
      category: "Cultural",
      banner: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      photos: ["https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"],
      videos: [],
      likes: ["stu-1", "stu-2"]
    },
    {
      id: "evt-2",
      _id: "evt-2",
      title: "Inter-Hostel Sports Championship",
      venue: "Hostel Sports Complex",
      description: "Cricket, Football, Table Tennis, Badminton and Chess tournaments.",
      organizer: "Sports Board",
      date: "2026-08-20",
      category: "Sports",
      banner: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
      photos: [],
      videos: [],
      likes: ["stu-1"]
    }
  ],
  gallery: [
    {
      id: "gal-1",
      _id: "gal-1",
      album: "Freshers Party",
      category: "Festival Photos",
      mediaType: "image",
      url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      caption: "Welcome Freshers Batch 2026"
    },
    {
      id: "gal-2",
      _id: "gal-2",
      album: "Campus Infrastructure",
      category: "Hostel Building",
      mediaType: "image",
      url: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80",
      caption: "Main Hostel Wing Night View"
    },
    {
      id: "gal-3",
      _id: "gal-3",
      album: "Mess & Dining",
      category: "Mess Food Photos",
      mediaType: "image",
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      caption: "Hygienic Dining Hall & Special Thali"
    }
  ],
  notices: [
    {
      id: "not-1",
      _id: "not-1",
      title: "Mess Timings Revision During Exam Week",
      content: "Breakfast: 7:00 AM - 10:00 AM | Lunch: 12:00 PM - 3:00 PM | Dinner: 7:30 PM - 10:30 PM",
      isPinned: true,
      category: "Mess",
      attachmentUrl: "",
      postedBy: "Warden Office",
      createdAt: new Date().toISOString()
    },
    {
      id: "not-2",
      _id: "not-2",
      title: "Maintenance Notice - Water Tank Cleaning",
      content: "Water supply will be suspended on Saturday between 10:00 AM and 2:00 PM for tank sanitization.",
      isPinned: false,
      category: "Maintenance",
      attachmentUrl: "",
      postedBy: "Maintenance Dept",
      createdAt: new Date().toISOString()
    }
  ],
  mess: {
    todaySpecial: "Special Paneer Butter Masala & Gulab Jamun",
    dailyMenu: {
      breakfast: "Poha, Tea/Coffee, Boiled Eggs",
      lunch: "Dal Tadka, Rice, Roti, Seasonal Veg, Salad",
      snacks: "Samosa & Green Chutney, Tea",
      dinner: "Paneer Butter Masala, Butter Naan, Rice, Gulab Jamun"
    },
    weeklyMenu: [
      { day: "Monday", breakfast: "Idli Sambar", lunch: "Rajma Chawal", dinner: "Mix Veg & Roti" },
      { day: "Tuesday", breakfast: "Aloo Paratha", lunch: "Kadi Pakoda & Rice", dinner: "Chana Masala" },
      { day: "Wednesday", breakfast: "Poha & Jalebi", lunch: "Veg Biryani & Raita", dinner: "Egg Curry / Malai Kofta" },
      { day: "Thursday", breakfast: "Upma & Tea", lunch: "Dal Makhani & Naan", dinner: "Bhindhi Fry & Rice" },
      { day: "Friday", breakfast: "Dosa & Coconut Chutney", lunch: "Chole Bhature", dinner: "Chicken Curry / Paneer Tikka" },
      { day: "Saturday", breakfast: "Puri Bhaji", lunch: "Khichdi & Kadhi", dinner: "Veg Kolhapuri" },
      { day: "Sunday", breakfast: "Bread Butter Omelette", lunch: "Special Thali", dinner: "Sweet & Veg Pulao" }
    ]
  },
  messRegistrations: [
    { id: "mr-1", _id: "mr-1", studentId: "STU-2026-001", studentName: "Nikhil Rao", messType: "Veg", plan: "Monthly", status: "Active" }
  ],
  messPayments: [
    { id: "mp-1", _id: "mp-1", studentId: "STU-2026-001", studentName: "Nikhil Rao", month: "July 2026", amount: 3500, status: "Paid", date: "2026-07-01" },
    { id: "mp-2", _id: "mp-2", studentId: "STU-2026-002", studentName: "Sara Khan", month: "July 2026", amount: 3800, status: "Pending", date: "2026-07-05" }
  ],
  complaints: [
    {
      id: "complaint-1",
      _id: "complaint-1",
      studentId: "STU-2026-001",
      studentName: "Nikhil Rao",
      roomNo: "A-101",
      title: "Water heater not working",
      category: "Plumbing",
      description: "The water heater in bathroom is not heating properly.",
      priority: "High",
      status: "Pending",
      assignedStaff: "Ramesh Plumber",
      createdAt: new Date().toISOString()
    }
  ],
  maintenances: [
    {
      id: "maint-1",
      _id: "maint-1",
      title: "AC Filter Replacement",
      roomNo: "A-101",
      assignedStaff: "Electrician Team",
      priority: "Medium",
      status: "In Progress",
      createdAt: new Date().toISOString()
    }
  ],
  attendance: [
    { id: "att-1", _id: "att-1", studentId: "STU-2026-001", studentName: "Nikhil Rao", roomNo: "A-101", status: "Present", date: "2026-07-29" },
    { id: "att-2", _id: "att-2", studentId: "STU-2026-002", studentName: "Sara Khan", roomNo: "B-204", status: "On Leave", date: "2026-07-29" }
  ],
  payments: [
    { id: "pay-1", _id: "pay-1", studentId: "STU-2026-001", studentName: "Nikhil Rao", type: "Hostel Fees", semester: "Sem 5", amount: 12000, status: "Paid", transactionId: "TXN998877", date: "2026-07-10" },
    { id: "pay-2", _id: "pay-2", studentId: "STU-2026-002", studentName: "Sara Khan", type: "Hostel Fees", semester: "Sem 3", amount: 8500, status: "Pending", transactionId: "-", date: "2026-07-12" }
  ],
  visitors: [
    { id: "visit-1", _id: "visit-1", visitorName: "Ravi Sharma", studentName: "Nikhil Rao", studentRoom: "A-101", relation: "Father", contact: "+91 98765 00112", purpose: "Fee Payment & Handover", inTime: "10:00 AM", outTime: "11:30 AM", date: "2026-07-29", status: "Checked Out" }
  ],
  gatePasses: [
    { id: "gp-1", _id: "gp-1", studentId: "STU-2026-001", studentName: "Nikhil Rao", roomNo: "A-101", reason: "Medical Checkup", destination: "City Hospital", outDate: "2026-07-30", returnDate: "2026-07-30", status: "Approved" }
  ],
  laundry: [
    { id: "laundry-1", _id: "laundry-1", studentId: "STU-2026-002", studentName: "Sara Khan", items: 4, status: "Delivered", date: "2026-07-28" }
  ],
  notifications: [
    { id: "notif-1", _id: "notif-1", title: "New Event Announced", message: "Annual Cultural Fest registration is now open!", read: false, createdAt: new Date().toISOString() },
    { id: "notif-2", _id: "notif-2", title: "Fee Reminder", message: "Pending mess fees due by August 5th.", read: false, createdAt: new Date().toISOString() }
  ],
  activityLogs: [
    { id: "act-1", _id: "act-1", user: "Admin", action: "Updated Room Allocation A-101", timestamp: new Date().toISOString() },
    { id: "act-2", _id: "act-2", user: "Watchman", action: "Checked OUT Student Sara Khan (B-204)", timestamp: new Date().toISOString() }
  ],
  feedbacks: [
    { id: "fb-1", _id: "fb-1", studentName: "Nikhil Rao", messRating: 5, hostelRating: 4, comments: "Great food quality and fast Wi-Fi!", date: "2026-07-25" }
  ]
});

const getStore = () => {
  if (!global.__hostelStore) {
    global.__hostelStore = createSeedStore();
  }
  return global.__hostelStore;
};

const createId = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

module.exports = {
  getStore,
  createId,
};
