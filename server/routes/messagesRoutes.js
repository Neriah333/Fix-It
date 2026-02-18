const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, messageController.sendMessage);
router.get('/', protect, messageController.getUserMessages);
router.get('/:userId', protect, messageController.getConversation);
router.put('/:id', protect, messageController.updateMessage);
router.delete('/:id', protect, messageController.deleteMessage);

module.exports = router;
