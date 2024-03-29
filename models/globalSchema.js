const mongoose = require("mongoose");

const globalSchema = new mongoose.Schema(
  {
  globalId: { type: Number, default: 404},
  dailyCount: { type: Number, default: 1 },
  },
  { 
    timestamps: true,
  }
);

module.exports = mongoose.model("global", globalSchema);