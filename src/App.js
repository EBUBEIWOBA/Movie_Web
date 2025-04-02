// App.js
import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";
import Navbar from "./components/Navbar";
import Trending from "./components/Trending";
import Genres from "./components/Genres";
import Favorite from "./components/Favorite";
import Footer from "./components/Footer";
import { FaExclamationTriangle } from 'react-icons/fa';


const API_URL = 'https://www.omdbapi.com/';
const API_KEY = process.env.REACT_APP_API_KEY;


const App = () => {
  const [query, setQuery] = useState("Avengers");
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [activePage, setActivePage] = useState("home");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const searchMovies = async (title) => {
    if (!title) return;
    try {
      setLoading(true);
      setError("");
      let allMovies = [];

      for (let page = 1; page <= 3; page++) {
        const response = await fetch(`${API_URL}?s=${title}&apikey=${API_KEY}&page=${page}`);
        const data = await response.json();

        if (data.Response === "True" && data.Search) {
          allMovies = [...allMovies, ...data.Search];
        } else if (data.Error) {
          setError(data.Error);
          break;
        } else {
          break;
        }
      }

      const uniqueMovies = Array.from(
        new Map(allMovies.map(movie => [movie.imdbID, movie])).values()
      );
      setMovies(uniqueMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to fetch movies. Please try again later.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query && activePage === "home") searchMovies(query);
  }, [query, activePage]);

  const openMovieDetails = (movieId) => setSelectedMovieId(movieId);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Navbar 
        setQuery={setQuery} 
        setActivePage={setActivePage} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />

      {/* Home Page */}
      {activePage === "home" && (
        <>
          {/* Loading */}
          {loading && (
            <div className="spinner">
              <div className="loader"></div>
              <p>Loading Movies...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="error">
              <FaExclamationTriangle size={40} color="red" />
              <p>{error}</p>
            </div>
          )}

          {/* Movies */}
          {!loading && !error && (
            <div className="movie-grid">
              {movies.length > 0 ? (
                movies.map(movie => (
                  movie.imdbID && (
                    <MovieCard 
                      key={movie.imdbID} 
                      movie={movie} 
                      openDetails={openMovieDetails} 
                    />
                  )
                ))
              ) : (
                <p>No movies found. Try a new search!</p>
              )}
            </div>
          )}
        </>
      )}

      {/* Trending */}
      {activePage === "trending" && (
        <div className="movie-grid">
          <Trending openDetails={openMovieDetails} />
        </div>
      )}

      {/* Genres */}
      {activePage === "genres" && (
        <div className="movie-grid">
          <Genres openDetails={openMovieDetails} />
        </div>
      )}

      {/* Favorites */}
      {activePage === "favorites" && (
        <div className="movie-grid">
          <Favorite openDetails={openMovieDetails} />
        </div>
      )}

      {/* Movie Details */}
      {selectedMovieId && (
        <MovieDetails 
          movieId={selectedMovieId} 
          closeDetails={() => setSelectedMovieId(null)} 
        />
      )}

      {/* Footer Component */}
      <Footer darkMode={darkMode} setActivePage={setActivePage} />
    </div>
  );
};

export default App;
