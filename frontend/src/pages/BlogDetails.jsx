import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { blogAPI } from '../api/api';
import CommentSection from '../components/CommentSection';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBlogById(id);
      setBlog(response.data);
      
      // Check if user has liked this blog
      if (user && response.data.likes.includes(user.id)) {
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await blogAPI.toggleLikeBlog(id);
      setBlog(prevBlog => ({
        ...prevBlog,
        likes: isLiked 
          ? prevBlog.likes.filter(likeId => likeId !== user.id)
          : [...prevBlog.likes, user.id]
      }));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await blogAPI.deleteBlog(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="loading">Loading blog...</div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="page">
        <div className="container">
          <h1>Blog not found</h1>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  const canEdit = user && (user.id === blog.author._id || user.isAdmin);

  return (
    <div className="page">
      <div className="container">
        <div className="blog-details">
          <h1>{blog.title}</h1>
          
          <div className="blog-meta">
            <span>By {blog.author.username}</span>
            <span>{formatDate(blog.createdAt)}</span>
            {blog.updatedAt !== blog.createdAt && (
              <span>(Updated: {formatDate(blog.updatedAt)})</span>
            )}
          </div>
          
          <div className="blog-content">
            {blog.content}
          </div>
          
          <div className="like-section">
            <button 
              className={`like-btn ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              {isLiked ? '❤️' : '🤍'} {blog.likes.length} likes
            </button>
          </div>
          
          {canEdit && (
            <div className="blog-actions">
              <Link to={`/edit-blog/${blog._id}`} className="btn btn-secondary">
                Edit Blog
              </Link>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Blog
              </button>
            </div>
          )}
        </div>
        
        <CommentSection blogId={id} />
      </div>
    </div>
  );
};

export default BlogDetails;