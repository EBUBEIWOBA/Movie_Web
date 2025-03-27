import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const API_URL = "http://www.omdbapi.com/";
const API_KEY = "c36a3609";

const Genres = ({openDetails}) => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("Action");

  useEffect(() => {
    fetch(`${API_URL}?s=${genre}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) =>
      { if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]); // Clear if no movies found
      }
    })
    .catch((err) => console.error(err));
}, [genre]);

  return (
    <div>
      <div className="genre">
      <h2>Select Genre</h2>
      <select 
        onChange={(e) => setGenre(e.target.value)} 
        value={genre} 
        className="genre-select"
      >
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Horror">Horror</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Adventure">Adventure</option>
        <option value="Animation">Animation</option>
      </select>
      </div>
    
      <div className="movie-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID + "-genre"} movie={movie} openDetails={openDetails}/>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Genres;
