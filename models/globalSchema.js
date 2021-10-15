const mongoose = require("mongoose");

const globalSchema = new mongoose.Schema({
  dailyCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("global", globalSchema);