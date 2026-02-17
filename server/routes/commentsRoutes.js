const express = require("express");
const { createComment, getPostComments, likeComment, loveComment, shareComment, updateComment, deleteComment } = require("../controllers/commentsController");

const router = express.Router();

router.post("/", createComment);
router.get("/post/:postId", getPostComments);
router.patch("/:id", likeComment);
router.patch("/:id", loveComment);
router.patch("/:id", shareComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
module.exports = router;