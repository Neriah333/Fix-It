const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccount",
      required: true,
      unique: true, // one profile per user
    },

    profilePicture: {
      type: String,
    },

    bio: {
      type: String,
      maxlength: 250,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    skills: {
      type: [String],
      default: [],
    },

    preferences: {
      allowNotifications: { type: Boolean, default: true },
      theme: { type: String, enum: ["light", "dark"], default: "light" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
