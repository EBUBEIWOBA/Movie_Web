// src/components/Footer.js
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = ({ darkMode, setActivePage }) => {
  return (
    <footer className={`footer ${darkMode ? "dark" : "light"}`}>
      <div className="footer-container">
        {/* Branding */}
        <div className="footer-brand">
          <h2>🎬 MovieFlix</h2>
          <p>Your ultimate movie guide</p>
        </div>

        {/* linksigation Links */}
          <button className="footer-links" onClick={() => setActivePage("home")}>Home</button>
          <button className="footer-links" onClick={() => setActivePage("trending")}>Trending</button>
          <button className="footer-links" onClick={() => setActivePage("genres")}>Genres</button>
          <button className="footer-links" onClick={() => setActivePage("favorites")}>Favorites</button>

        {/* Social Media */}
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MovieFlix. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
