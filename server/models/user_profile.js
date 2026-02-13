// models/UserProfile.js
const mongoose = require("mongoose");


const userProfileSchema = new mongoose.Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: "UserAccount",
    required: true, 
  },
  profilePicture: {
    type: String, // URL or path to image
  },
  bio: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  skills: {
    type: [String], 
  },
  preferences: {
    notifications: { type: mongoose.Types.ObjectId, ref: "Notification", default: null },
    theme: { type: String, enum: ["light", "dark"], default: "light" },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
