import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const Favorite = ({ openDetails }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Remove a movie from favorites and update localStorage immediately
  const removeFavorite = (movieId) => {
    console.log("Removing movie with ID:", movieId); // Debugging
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {favorites.length > 0 ? (
        favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            openDetails={openDetails}
            removeFavorite={() => removeFavorite(movie.imdbID)}
            showRemove={true}
          />
        ))
      ) : (
        <p>No favorite movies found.</p>
      )}
    </div>
  );
};

export default Favorite;
