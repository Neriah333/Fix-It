const Post = require('../models/Post');
const Notification = require('../models/Notification');

/**
 * @desc    Create Post
 * @route   POST /api/posts
 * @access  Private
 */
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
      author: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    React to post (like/love)
 * @route   PUT /api/posts/:id/react
 * @access  Private
 */
exports.reactToPost = async (req, res) => {
  try {
    const { type } = req.body; // like or love
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingReaction = post.reactions.find(
      (r) => r.user.toString() === req.user.id
    );

    if (existingReaction) {
      // Toggle or update reaction
      if (existingReaction.type === type) {
        // Remove reaction
        post.reactions = post.reactions.filter(
          (r) => r.user.toString() !== req.user.id
        );
      } else {
        existingReaction.type = type;
      }
    } else {
      post.reactions.push({
        user: req.user.id,
        type,
      });

      // Create notification (if not own post)
      if (post.author.toString() !== req.user.id) {
        await Notification.create({
          recipient: post.author,
          sender: req.user.id,
          type,
          post: post._id,
        });
      }
    }

    await post.save();
    res.status(200).json(post);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Share Post
 * @route   PUT /api/posts/:id/share
 * @access  Private
 */
exports.sharePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyShared = post.shares.find(
      (s) => s.user.toString() === req.user.id
    );

    if (alreadyShared) {
      return res.status(400).json({ message: "You already shared this post" });
    }

    post.shares.push({ user: req.user.id });

    if (post.author.toString() !== req.user.id) {
      await Notification.create({
        recipient: post.author,
        sender: req.user.id,
        type: "share",
        post: post._id,
      });
    }

    await post.save();
    res.status(200).json(post);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'email')
      .populate('comments')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
