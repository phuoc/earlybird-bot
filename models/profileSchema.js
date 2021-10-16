const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {type: String, require: true},
  userID: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
  worms: { type: Number, default: 0 },
});

module.exports = mongoose.model("ProfileModels", profileSchema);