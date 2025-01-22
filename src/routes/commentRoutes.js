const express = require("express");
const {
  addComment,
  editComment,
  deleteComment,
  getCommentsByPost,
} = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /comments/{postId}:
 *   post:
 *     summary: Add a comment to a post
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to add the comment to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The comment content
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/:postId",
  authMiddleware(["Reader", "Author", "Admin"]),
  addComment
);

/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     summary: Edit a comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Updated comment content
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Comment not found
 *       403:
 *         description: Unauthorized to edit this comment
 */
router.put(
  "/:commentId",
  authMiddleware(["Reader", "Author", "Admin"]),
  editComment
);

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Comment not found
 *       403:
 *         description: Unauthorized to delete this comment
 */
router.delete(
  "/:commentId",
  authMiddleware(["Reader", "Author", "Admin"]),
  deleteComment
);

/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     summary: Get comments for a post
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to retrieve comments for
 *     responses:
 *       200:
 *         description: Successfully retrieved comments
 *       400:
 *         description: Bad request
 *       404:
 *         description: Post not found
 */
router.get(
  "/:postId",
  authMiddleware(["Reader", "Author", "Admin"]),
  getCommentsByPost
);

module.exports = router;
