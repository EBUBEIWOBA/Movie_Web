import React, { useState } from "react";
import { Search } from "lucide-react";

const Navbar = ({ setQuery, setActivePage, darkMode, setDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // ✅ State for mobile menu

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setQuery(searchTerm);
      setActivePage("home"); // ✅ Go to Home on search
    }
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="movieapp">
          <h1 onClick={() => setActivePage("home")}>MOVIEVERSE</h1>

          {/* Desktop Links */}
          <div className="nav-links-container">
            <button className="nav-links" onClick={() => { setActivePage("home"); setMenuOpen(false); }}>HOME</button>
            <button className="nav-links" onClick={() => { setActivePage("Trending"); setMenuOpen(false); }}>TRENDING</button>
            <button className="nav-links" onClick={() => { setActivePage("Genres"); setMenuOpen(false); }}>GENRES</button>
            <button className="nav-links" onClick={() => { setActivePage("Favorites"); setMenuOpen(false); }}>FAVORITES</button>
          </div>
        </div>

        {/* 🌙 Light/Dark Mode Toggle */}
        <div className="toggle-container">
          <label className="switch">
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={() => setDarkMode(!darkMode)} 
            />
            <span className="slider round"></span>
          </label>
        </div>

        {/* Search */}
        <div className="search">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} className="search-btn">
            <Search size={20} />
          </button>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
      </nav>

      {/* ✅ Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          
          <button className="nav-links" onClick={() => { setActivePage("home"); setMenuOpen(false); }}>HOME</button>
            <button className="nav-links" onClick={() => { setActivePage("Trending"); setMenuOpen(false); }}>TRENDING</button>
            <button className="nav-links" onClick={() => { setActivePage("Genres"); setMenuOpen(false); }}>GENRES</button>
            <button className="nav-links" onClick={() => { setActivePage("Favorites"); setMenuOpen(false); }}>FAVORITES</button>
        </div>
      )}
    </>
  );
};

export default Navbar;
