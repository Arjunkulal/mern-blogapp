const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  blogId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content:  { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
