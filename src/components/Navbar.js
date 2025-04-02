import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const Navbar = ({ setQuery, setActivePage, darkMode, setDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const formattedQuery = searchTerm.trim().replace(/\s+/g, "+"); // Replace spaces with "+"
      setQuery(formattedQuery);
      setActivePage("home");
      setSearchOpen(false);
    }
  };
  
  

  return (
    <>
      <nav className="navbar">
        <div className="movieapp">
          <h1 onClick={() => setActivePage("home")}>MOVIEVERSE</h1>
        </div>

        {/* ✅ Desktop Nav Links (Hidden on Mobile) */}
        {!isMobile && (
          <div className="nav-links-container">
            <button onClick={() => setActivePage("home")}>HOME</button>
            <button onClick={() => setActivePage("trending")}>TRENDING</button>
            <button onClick={() => setActivePage("genres")}>GENRES</button>
            <button onClick={() => setActivePage("favorites")}>FAVORITES</button>
          </div>
        )}

        {/* ✅ Search Bar (Desktop) */}
        {!isMobile && (
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
        )}

        {/* ✅ Dark Mode Toggle (Desktop) */}
        {!isMobile && (
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
        )}

        {/* ✅ Mobile Icons */}
        {isMobile && (
          <div className="mobile-icons">
            <Search className="menu-search" size={24} onClick={() => setSearchOpen((prev) => !prev)} />
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>
          </div>
        )}
      </nav>

      {/* ✅ Mobile Search Bar */}
      {isMobile && searchOpen && (
        <div className="mobile-search">
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
      )}

      {/* ✅ Mobile Dropdown Menu */}
      {isMobile && menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setActivePage("home")}>HOME</button>
          <button onClick={() => setActivePage("trending")}>TRENDING</button>
          <button onClick={() => setActivePage("genres")}>GENRES</button>
          <button onClick={() => setActivePage("favorites")}>FAVORITES</button>


          {/* ✅ Dark Mode Toggle (Mobile) */}
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
        </div>
      )}
    </>
  );
};

export default Navbar;
