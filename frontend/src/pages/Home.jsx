import React, { useState, useEffect } from 'react';
import { blogAPI } from '../api/api';
import BlogCard from '../components/BlogCard';
import '../styles/Home.css'; 


const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAllBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await blogAPI.deleteBlog(blogId);
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="loading">Loading blogs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Latest Blog Posts</h1>
        
        {blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No blogs found. Be the first to create one!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <BlogCard 
                key={blog._id} 
                blog={blog} 
                onDelete={handleDeleteBlog}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;