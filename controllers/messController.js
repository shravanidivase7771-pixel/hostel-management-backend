const { getStore, createId } = require("../utils/storage");

const getMessData = (req, res) => {
  const store = getStore();
  return res.status(200).json({
    messInfo: store.mess || {},
    registrations: store.messRegistrations || [],
    payments: store.messPayments || [],
  });
};

const updateMessMenu = (req, res) => {
  const store = getStore();
  const { todaySpecial, dailyMenu, weeklyMenu } = req.body;
  if (todaySpecial) store.mess.todaySpecial = todaySpecial;
  if (dailyMenu) store.mess.dailyMenu = { ...store.mess.dailyMenu, ...dailyMenu };
  if (weeklyMenu) store.mess.weeklyMenu = weeklyMenu;
  return res.status(200).json({ message: "Mess menu updated successfully", mess: store.mess });
};

const registerMess = (req, res) => {
  const store = getStore();
  const reg = {
    id: createId("mr"),
    _id: createId("mr"),
    studentId: req.body.studentId || "STU-2026-001",
    studentName: req.body.studentName || req.user?.name || "Student",
    messType: req.body.messType || "Veg",
    plan: req.body.plan || "Monthly",
    status: "Active",
    createdAt: new Date().toISOString(),
  };
  store.messRegistrations = store.messRegistrations || [];
  store.messRegistrations.push(reg);
  return res.status(201).json(reg);
};

const recordMessPayment = (req, res) => {
  const store = getStore();
  const pay = {
    id: createId("mp"),
    _id: createId("mp"),
    studentId: req.body.studentId || "STU-2026-001",
    studentName: req.body.studentName || req.user?.name || "Student",
    month: req.body.month || "Current Month",
    amount: req.body.amount || 3500,
    status: "Paid",
    date: new Date().toISOString().split("T")[0],
  };
  store.messPayments = store.messPayments || [];
  store.messPayments.push(pay);
  return res.status(201).json(pay);
};

const submitFoodRating = (req, res) => {
  const store = getStore();
  const rating = {
    id: createId("fr"),
    _id: createId("fr"),
    studentName: req.user?.name || "Student",
    rating: req.body.rating || 5,
    feedback: req.body.feedback || "Good food",
    date: new Date().toISOString().split("T")[0],
  };
  store.feedbacks = store.feedbacks || [];
  store.feedbacks.push(rating);
  return res.status(201).json(rating);
};

module.exports = {
  getMessData,
  updateMessMenu,
  registerMess,
  recordMessPayment,
  submitFoodRating,
};
