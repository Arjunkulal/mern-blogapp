const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleLikeBlog
} = require('../controllers/blogController');

// Public
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Protected
router.post('/', authMiddleware, createBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);
router.put('/like/:id', authMiddleware, toggleLikeBlog);

module.exports = router;
