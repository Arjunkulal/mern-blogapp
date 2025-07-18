const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  addComment,
  getCommentsForBlog,
  deleteComment
} = require('../controllers/commentController');

// Public: Get comments for a blog
router.get('/:blogId', getCommentsForBlog);

// Protected: Add comment
router.post('/', authMiddleware, addComment);

// Protected: Delete comment
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;
