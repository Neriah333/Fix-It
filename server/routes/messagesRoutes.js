const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messagesController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, messageController.sendMessage);
router.get('/', protect, messageController.getUserMessages);
router.get('/:userId', protect, messageController.getConversation);
router.put('/:id', protect, messageController.updateMessage);
router.delete('/:id', protect, messageController.deleteMessage);

module.exports = router;
