const Comment = require("../models/comments");
const Post = require("../models/posts");


// ✅ Create Comment
exports.createComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      post: postId,
      user: req.user.id,   // from auth middleware
      text,
    });

    res.status(201).json({
      message: "Comment created",
      comment,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Prevent duplicate likes
    const alreadyLiked = comment.likes.find(
      like => like.user.toString() === req.user.id
    );

    if (alreadyLiked) {
      return res.status(400).json({ message: "Already liked" });
    }

    comment.likes.push({ user: req.user.id });
    await comment.save();

    res.status(200).json({ message: "Comment liked" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loveComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const alreadyLoved = comment.loves.find(
      love => love.user.toString() === req.user.id
    );

    if (alreadyLoved) {
      return res.status(400).json({ message: "Already loved" });
    }

    comment.loves.push({ user: req.user.id });
    await comment.save();

    res.status(200).json({ message: "Comment loved" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.shareComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Save share record
    comment.shares.push({ user: req.user.id });
    await comment.save();

    // Generate shareable URL
    const shareUrl = `https://yourapp.com/comments/${comment._id}`;

    res.status(200).json({
      message: "Comment ready to share",
      shareUrl,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only owner can update
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.text = text;
    comment.updatedAt = Date.now();

    await comment.save();

    res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the comment
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Find the post
    const post = await Post.findById(comment.post);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Only comment owner or post owner can delete
    if (
      comment.user.toString() !== req.user.id && 
      post.user.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

