const { getStore, createId } = require("../utils/storage");

const getVisitors = (req, res) => {
  const store = getStore();
  res.status(200).json(store.visitors || []);
};

const createVisitor = (req, res) => {
  const store = getStore();
  const visitor = { id: createId("visitor"), ...req.body, createdAt: new Date().toISOString() };
  store.visitors = store.visitors || [];
  store.visitors.push(visitor);
  res.status(201).json(visitor);
};

module.exports = { getVisitors, createVisitor };