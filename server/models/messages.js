// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount', required: true },
  content: { type: String, required: true },
  attachments: [{ type: String }], // Optional: store file URLs
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
