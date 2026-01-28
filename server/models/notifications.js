// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount', required: true }, // Who receives it
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount', required: true }, // Who triggered it
  type: { 
    type: String, 
    enum: ['like', 'love', 'comment', 'share', 'repost', 'follow'], 
    required: true 
  },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },     // Optional, link to post
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }, // Optional, link to message if notification comes from a message
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
