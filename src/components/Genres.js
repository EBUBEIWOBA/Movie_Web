import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const API_URL = "http://www.omdbapi.com/";
const API_KEY = "c36a3609";

const Genres = ({openDetails}) => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("Action");

  useEffect(() => {
    fetch(`${API_URL}?s=${genre}&type=movie&apikey=${API_KEY}`)
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
      <h2>SELECT CATEGORY</h2>
      <select 
        onChange={(e) => setGenre(e.target.value)} 
        value={genre} 
        className="genre-select"
      >
        <option className= "genre-option" value="Action">Action</option>
        <option className= "genre-option" value="Comedy">Comedy</option>
        <option className= "genre-option" value="Drama">Drama</option>
        <option className= "genre-option" value="Horror">Horror</option>
        <option className= "genre-option" value="Sci-Fi">Sci-Fi</option>
        <option className= "genre-option" value="Adventure">Adventure</option>
        <option className= "genre-option" value="Animation">Animation</option>
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
