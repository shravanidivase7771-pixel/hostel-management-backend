const { getStore, createId } = require("../utils/storage");

const getPayments = (req, res) => {
  const store = getStore();
  res.status(200).json(store.payments || []);
};

const createPayment = (req, res) => {
  const store = getStore();
  const payment = { id: createId("payment"), ...req.body, createdAt: new Date().toISOString() };
  store.payments = store.payments || [];
  store.payments.push(payment);
  res.status(201).json(payment);
};

module.exports = { getPayments, createPayment };