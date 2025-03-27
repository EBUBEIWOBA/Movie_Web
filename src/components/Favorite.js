import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const Favorite = ({ openDetails }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const uniqueFavorites = Array.from(new Map(savedFavorites.map(movie => [movie.imdbID, movie])).values());
    setFavorites(uniqueFavorites);
  }, []);

  const removeFavorite = (imdbID) => {
    const updatedFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
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
