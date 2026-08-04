const { getStore } = require("../utils/storage");

const getReportsData = (req, res) => {
  const store = getStore();
  return res.status(200).json({
    students: store.students || [],
    attendance: store.attendance || [],
    payments: store.payments || [],
    complaints: store.complaints || [],
    visitors: store.visitors || [],
    mess: store.messPayments || [],
    rooms: store.rooms || [],
  });
};

module.exports = { getReportsData };
