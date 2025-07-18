import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { blogAPI } from '../api/api';
import BlogCard from '../components/BlogCard';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchUserBlogs();
  }, [user, navigate]);

  const fetchUserBlogs = async () => {
    try {
      const response = await blogAPI.getAllBlogs();
      // Filter blogs by current user
      const filteredBlogs = response.data.filter(blog => blog.author._id === user.id);
      setUserBlogs(filteredBlogs);
    } catch (error) {
      console.error('Error fetching user blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await blogAPI.deleteBlog(blogId);
      setUserBlogs(userBlogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="loading">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="profile-header" style={{ marginBottom: '2rem' }}>
          <h1 className="page-title">My Profile</h1>
          <div className="profile-info" style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2>Welcome, {user.username}!</h2>
            <p><strong>Email:</strong> {user.email}</p>
            
            <p><strong>Total Blogs:</strong> {userBlogs.length}</p>
          </div>
        </div>

        <div className="profile-blogs">
          <h2>My Blogs</h2>
          
          {userBlogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>You haven't created any blogs yet.</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/create-blog')}
              >
                Create Your First Blog
              </button>
            </div>
          ) : (
            <div className="blog-grid">
              {userBlogs.map((blog) => (
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
    </div>
  );
};

export default Profile;