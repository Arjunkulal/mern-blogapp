import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { blogAPI } from '../api/api';

const CreateEditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isEdit = Boolean(id);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isEdit) {
      fetchBlog();
    }
  }, [user, id, isEdit, navigate]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBlogById(id);
      const blog = response.data;
      
      // Check if user can edit this blog
      if (blog.author._id !== user.id && !user.isAdmin) {
        navigate('/');
        return;
      }
      
      setFormData({
        title: blog.title,
        content: blog.content
      });
    } catch (error) {
      console.error('Error fetching blog:', error);
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isEdit) {
        await blogAPI.updateBlog(id, formData);
        setSuccess('Blog updated successfully!');
        setTimeout(() => navigate(`/blog/${id}`), 1500);
      } else {
        const response = await blogAPI.createBlog(formData);
        setSuccess('Blog created successfully!');
        setTimeout(() => navigate(`/blog/${response.data._id}`), 1500);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      setError(error.response?.data?.msg || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="form-container">
          <h2 className="page-title">
            {isEdit ? 'Edit Blog' : 'Create New Blog'}
          </h2>
          
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Blog Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title..."
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Blog Content:</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your blog content here..."
                rows="15"
                required
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Blog' : 'Create Blog')}
              </button>
              
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate(isEdit ? `/blog/${id}` : '/')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEditBlog;