const express = require("express");
const {
  addComment,
  editComment,
  deleteComment,
  getCommentsByPost,
} = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Add a comment to a post
router.post(
  "/:postId",
  authMiddleware(["Reader", "Author", "Admin"]),
  addComment
);

// Edit a comment
router.put(
  "/:commentId",
  authMiddleware(["Reader", "Author", "Admin"]),
  editComment
);

// Delete a comment
router.delete(
  "/:commentId",
  authMiddleware(["Reader", "Author", "Admin"]),
  deleteComment
);

// Get comments for a post
router.get(
  "/:postId",
  authMiddleware(["Reader", "Author", "Admin"]),
  getCommentsByPost
);

module.exports = router;
