const { getStore, createId } = require("../utils/storage");

const getLaundryRequests = (req, res) => {
  const store = getStore();
  res.status(200).json(store.laundry || []);
};

const createLaundryRequest = (req, res) => {
  const store = getStore();
  const request = { id: createId("laundry"), ...req.body, status: "Requested", createdAt: new Date().toISOString() };
  store.laundry = store.laundry || [];
  store.laundry.push(request);
  res.status(201).json(request);
};

module.exports = { getLaundryRequests, createLaundryRequest };