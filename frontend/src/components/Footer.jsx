
import React from 'react';
import '../styles/Footer.css';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope,FaInstagram  } 
from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer-title">Arjun</h2>
      <p className="footer-quote"><i>"Work with intention, not expectation."</i></p>
      {/* <p className="footer-built">Crafted with <span className="heart">🧡</span> using React • Styled with CSS</p> */}
      
      <div className="footer-icons">
        <a href="https://github.com/Arjunkulal" aria-label="GitHub"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/arjunkulal" aria-label="LinkedIn"><FaLinkedin /></a>
        <a href="https://x.com/ArjunKulal003?t=Mnhbd0m46AdkW8tM8_Nebg&s=09" aria-label="Twitter"><FaTwitter /></a>
        <a href="mailto:mail4arjunkulal03@gmail.com" aria-label="Email"><FaEnvelope /></a>
        <a href="https://www.instagram.com/arjun_kulal_03?igsh=ZDV2cXFmOWc3a3pr " aria-label="Instagram"><FaInstagram /></a>
      </div>

      <p className="footer-copy">© 2025 Arjun. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

