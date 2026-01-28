const mongoose = require("mongoose");

const userAccountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },

  // Social features
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" }],

  // Posts created by the user
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
}, { timestamps: true }); // automatically adds createdAt and updatedAt

module.exports = mongoose.model("UserAccount", userAccountSchema);
