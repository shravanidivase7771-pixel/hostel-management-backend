const mongoose = require("mongoose");

const messSchema = new mongoose.Schema(
  {
    todaySpecial: { type: String, default: "" },
    dailyMenu: {
      breakfast: { type: String, default: "" },
      lunch: { type: String, default: "" },
      snacks: { type: String, default: "" },
      dinner: { type: String, default: "" },
    },
    weeklyMenu: [
      {
        day: String,
        breakfast: String,
        lunch: String,
        dinner: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mess", messSchema);
