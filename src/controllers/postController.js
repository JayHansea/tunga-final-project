const Post = require("../models/Post");
const mongoose = require("mongoose");

// Create a new post
const createPost = async (req, res, next) => {
  try {
    const { title, content, tags, categories } = req.body;
    const userId = req.body.user.userId; // Extracted from the authenticated user's token

    const newPost = new Post({
      title,
      content,
      tags,
      categories,
      authorId: new mongoose.Types.ObjectId(userId),
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    next(error);
  }
};

// Get a single post by ID
const getPostById = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate("authorId", "name email");
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// Get all posts
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("authorId", "name email");
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Update a post
const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { title, content, tags, categories } = req.body;
    const userId = req.body.user.userId; // Extracted from the authenticated user's token
    const userRole = req.body.user.role;

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // Ensure the user is either the post's author or an Admin
    if (post.authorId.toString() !== userId && userRole !== "Admin") {
      res.status(403).json({ message: "Unauthorized to update this post" });
      return;
    }

    // Update the post fields
    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;
    post.categories = categories || post.categories;

    await post.save();
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    next(error);
  }
};

// Delete a post
const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.body.user.userId; // Extracted from the authenticated user's token
    const userRole = req.body.user.role;

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // Ensure the user is either the post's author or an Admin
    if (post.authorId.toString() !== userId && userRole !== "Admin") {
      res.status(403).json({ message: "Unauthorized to delete this post" });
      return;
    }

    // Delete the post
    await Post.deleteOne({ _id: postId });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePost,
};
