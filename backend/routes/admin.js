// routes/admin.js
const router = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

// Get all blogs
router.get("/blogs", verifyToken, verifyAdmin, async (req, res) => {
  const blogs = await Blog.find().populate("author", "username email");
  res.json(blogs);
});

// Delete a blog
router.delete("/blog/:id", verifyToken, verifyAdmin, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

// Get all users
router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

// Block user
router.put("/block-user/:id", verifyToken, verifyAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isBlocked: true });
  res.json({ message: "User blocked" });
});

// Unblock user
router.put("/unblock-user/:id", verifyToken, verifyAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isBlocked: false });
  res.json({ message: "User unblocked" });
});

module.exports = router;
