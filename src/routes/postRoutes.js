const express = require("express");
const {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new post
router.post(
  "/",
  authMiddleware(["Author", "Admin"]), // Only Authors and Admins can create posts
  createPost
);

// Get all posts
router.get("/", getAllPosts);

// Get a single post by ID
router.get(
  "/:postId",
  authMiddleware(["Reader", "Author", "Admin"]), // Any logged-in user can view posts
  getPostById
);

// Update a post
router.put(
  "/:postId",
  authMiddleware(["Author", "Admin"]), // Only the author or Admin can update
  updatePost
);

// Delete a post
router.delete(
  "/:postId",
  authMiddleware(["Author", "Admin"]), // Only the author or Admin can delete
  deletePost
);

module.exports = router;
