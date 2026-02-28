const express = require('express');
const router = express.Router();
const {createPost, getSinglePost, getAllPosts, searchPosts,
      reactToPost, sharePost, deletePost } = require('../controllers/postController');
const { protect } = require("../middlewares/auth");

router.post('/', protect, createPost);
router.put('/:id/react', protect, reactToPost);
router.put('/:id/share', protect, sharePost);
router.delete('/:id', protect, deletePost);

// Public routes don't need protect
router.get('/:id', getSinglePost);
router.get('/', getAllPosts);
router.get('/search', searchPosts);


module.exports = router;
