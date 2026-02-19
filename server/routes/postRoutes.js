const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middleware/auth');

router.post('/', protect, postController.createPost);
router.get('/:id', protect, postController.getSinglePost);
router.get('/', protect, postController.getAllPosts);
router.get("/search", protect, postController.searchPosts);
router.put('/:id/react', protect, postController.reactToPost);
router.put('/:id/share', protect, postController.sharePost);
router.delete('/:id', protect, postController.deletePost);

module.exports = router;
