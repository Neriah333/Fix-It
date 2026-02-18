const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount', required: true },
  type: { 
    type: String, 
    enum: ['like', 'love', 'comment', 'share', 'repost', 'follow'], 
    required: true 
  },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  read: { type: Boolean, default: false }, // 👈 add this
  createdAt: { type: Date, default: Date.now },
});
