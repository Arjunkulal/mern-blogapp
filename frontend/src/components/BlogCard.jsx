// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const BlogCard = ({ blog, onDelete }) => {
//   const { user } = useAuth();

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const truncateContent = (content, maxLength = 150) => {
//     return content.length > maxLength 
//       ? content.substring(0, maxLength) + '...' 
//       : content;
//   };

//   const canEdit = user && (user.id === blog.author._id || user.isAdmin);

//   return (
//     <div className="blog-card">
//       <h3>{blog.title}</h3>
//       <p>{truncateContent(blog.content)}</p>
      
//       <div className="blog-meta">
//         <span>By {blog.author.username}</span>
//         <span>{formatDate(blog.createdAt)}</span>
//       </div>
      
//       <div className="blog-actions">
//         <Link to={`/blog/${blog._id}`} className="btn btn-primary">
//           Read More
//         </Link>
        
//         {canEdit && (
//           <>
//             <Link to={`/edit-blog/${blog._id}`} className="btn btn-secondary">
//               Edit
//             </Link>
//             <button 
//               className="btn btn-danger" 
//               onClick={() => onDelete(blog._id)}
//             >
//               Delete
//             </button>
//           </>
//         )}
//       </div>
      
//       <div className="blog-meta">
//         <span>{blog.likes.length} ❤ </span>
//       </div>
//     </div>
//   );
// };

// export default BlogCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BlogCard = ({ blog, onDelete }) => {
  const { user } = useAuth();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    return content?.length > maxLength 
      ? content.substring(0, maxLength) + '...' 
      : content;
  };

  const canEdit = user && blog?.author && (user.id === blog.author._id || user.isAdmin);

  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p>{truncateContent(blog.content)}</p>
      
      <div className="blog-meta">
        <span>By {blog.author?.username || "Unknown"}</span>
        <span>{formatDate(blog.createdAt)}</span>
      </div>
      
      <div className="blog-actions">
        <Link to={`/blog/${blog._id}`} className="btn btn-primary">
          Read More
        </Link>
        
        {canEdit && (
          <>
            <Link to={`/edit-blog/${blog._id}`} className="btn btn-secondary">
              Edit
            </Link>
            <button 
              className="btn btn-danger" 
              onClick={() => onDelete(blog._id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
      
      <div className="blog-meta">
        <span>{blog.likes?.length || 0} ❤</span>
      </div>
    </div>
  );
};

export default BlogCard;
