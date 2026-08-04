const { getStore, createId } = require("../utils/storage");

const getGatePasses = (req, res) => {
  const store = getStore();
  res.status(200).json(store.gatePasses || []);
};

const createGatePass = (req, res) => {
  const store = getStore();
  const gatePass = { id: createId("gatepass"), ...req.body, status: "Pending", createdAt: new Date().toISOString() };
  store.gatePasses = store.gatePasses || [];
  store.gatePasses.push(gatePass);
  res.status(201).json(gatePass);
};

const updateGatePass = (req, res) => {
  const store = getStore();
  const index = (store.gatePasses || []).findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Gate pass not found" });
  store.gatePasses[index] = { ...store.gatePasses[index], ...req.body };
  res.status(200).json(store.gatePasses[index]);
};

module.exports = { getGatePasses, createGatePass, updateGatePass };