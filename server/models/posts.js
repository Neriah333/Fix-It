const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount", required: true },

  // Reactions: like, love
  reactions: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount", required: true },
      type: { type: String, enum: ["like", "love"], required: false },
      
    }
  ],

  // Comments
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],


  // Shares / Reposts
  shares: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount", required: true },
      sharedAt: { type: Date, default: Date.now },
    }
  ],
} , {timestamps: true});

module.exports = mongoose.model('Post', postsSchema);
