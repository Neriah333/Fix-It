const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount", required: true },
  text: { type: String, required: true },

  // Reactions
  likes: [
    { user: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount", required: true }, reactedAt: { type: Date, default: Date.now } }
  ],
  loves: [
    { user: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount", required: true }, reactedAt: { type: Date, default: Date.now } }
  ],

  // Shares / Reposts
  shares: [
    { user: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount", required: true }, sharedAt: { type: Date, default: Date.now } }
  ],

}, { timestamps: true });


module.exports = mongoose.model('Comment', commentSchema);
