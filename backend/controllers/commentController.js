const Comment = require('../models/Comment');
const Blog = require('../models/Blog');
const User = require('../models/User');

// @desc Add a comment to a blog
exports.addComment = async (req, res) => {
  try {
    const { blogId, content } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    const comment = new Comment({
      blogId,
      userId: req.user.id,
      content
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc Get all comments for a blog
exports.getCommentsForBlog = async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc Delete a comment (author or admin only)
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ msg: 'Comment not found' });

    if (comment.userId.toString() !== req.user.id && !req.user.isAdmin)
      return res.status(401).json({ msg: 'Not authorized to delete' });

    await comment.remove();
    res.json({ msg: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
