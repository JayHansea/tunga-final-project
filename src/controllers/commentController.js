const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Add a comment to a post
const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.body.user.userId;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // Create a new comment
    const comment = new Comment({
      content,
      postId: new mongoose.Types.ObjectId(postId),
      userId: new mongoose.Types.ObjectId(userId),
    });

    await comment.save();
    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};

// Edit a comment
const editComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.body.user.userId;

    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    // Check if the user is the owner of the comment
    if (comment.userId.toString() !== userId) {
      res.status(403).json({ message: "Unauthorized to edit this comment" });
      return;
    }

    // Update the comment
    comment.content = content;
    await comment.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};

// Delete a comment
const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.body.user.userId;
    const userRole = req.body.user.role;

    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    // Check if the user is the comment author or an admin
    if (comment.userId.toString() !== userId && userRole !== "Admin") {
      res.status(403).json({ message: "Unauthorized to delete this comment" });
      return;
    }

    // Delete the comment
    await comment.deleteOne({ _id: commentId });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};

// Get comments for a post
const getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    // Fetch all comments for the post
    const comments = await Comment.find({ postId }).populate(
      "userId",
      "name email"
    );
    res.status(200).json(comments);
  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};

module.exports = {
  addComment,
  editComment,
  deleteComment,
  getCommentsByPost,
};
