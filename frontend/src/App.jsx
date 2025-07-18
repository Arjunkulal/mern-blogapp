// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import BlogDetails from './pages/BlogDetails';
// import CreateEditBlog from './pages/CreateEditBlog';
// import Profile from './pages/Profile';


// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <Navbar />
//           <main>
//             <Routes>
//               <Route path="/" element={<Navigate to="/login" />} />
//               {/*<Route path="/" element={<Home />} /> */}
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/home" element={<Home />} />
//               <Route path="/blog/:id" element={<BlogDetails />} />
//               <Route path="/create-blog" element={<CreateEditBlog />} />
//               <Route path="/edit-blog/:id" element={<CreateEditBlog />} />
//               <Route path="/profile" element={<Profile />} />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // ✅ Add Navigate
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogDetails from './pages/BlogDetails';
import CreateEditBlog from './pages/CreateEditBlog';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} /> {/* 👈 Redirect here */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/create-blog" element={<CreateEditBlog />} />
              <Route path="/edit-blog/:id" element={<CreateEditBlog />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
