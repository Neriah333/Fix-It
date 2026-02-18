const Message = require('../models/Message');

/**
 * @desc    Send a new message
 * @route   POST /api/messages
 * @access  Private
 */
exports.sendMessage = async (req, res) => {
  try {
    const { recipient, content, attachments } = req.body;

    if (!recipient || !content) {
      return res.status(400).json({ message: "Recipient and content are required" });
    }

    const message = await Message.create({
      sender: req.user.id, // From auth middleware
      recipient,
      content,
      attachments: attachments || [],
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * @desc    Get all messages for logged in user
 * @route   GET /api/messages
 * @access  Private
 */
exports.getUserMessages = async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await Message.find({
      $or: [
        { sender: userId },
        { recipient: userId }
      ]
    })
    .populate('sender', 'email')
    .populate('recipient', 'email')
    .sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * @desc    Get conversation between two users
 * @route   GET /api/messages/:userId
 * @access  Private
 */
exports.getConversation = async (req, res) => {
  try {
    const currentUser = req.user.id;
    const otherUser = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: currentUser, recipient: otherUser },
        { sender: otherUser, recipient: currentUser }
      ]
    })
    .populate('sender', 'email')
    .populate('recipient', 'email')
    .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * @desc    Update message (only sender can edit)
 * @route   PUT /api/messages/:id
 * @access  Private
 */
exports.updateMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (message.sender.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit this message" });
    }

    message.content = req.body.content || message.content;
    message.updatedAt = Date.now();

    await message.save();

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * @desc    Delete message (only sender can delete)
 * @route   DELETE /api/messages/:id
 * @access  Private
 */
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (message.sender.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this message" });
    }

    await message.deleteOne();

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
