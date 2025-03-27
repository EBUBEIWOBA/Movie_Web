// MovieCard.js
import React from 'react';
import { FaHeart, FaTrashAlt } from "react-icons/fa";

const MovieCard = ({ movie, openDetails, removeFavorite, showRemove }) => {

  const addToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  // OPTIONAL: Auto-add to favorites when the card loads
  // useEffect(() => {
  //   if (!showRemove) addToFavorites();
  // }, [movie, showRemove]);

  return (
    <div className="movie-card">
      <img
        src={movie.Poster === 'N/A' ? '/placeholder.jpg' : movie.Poster}
        alt={movie.Title}
      />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>

      {/* Add/Remove Favorite Button */}
      {!showRemove ? (
        <button
          className="fav-btn"
          onClick={(e) => {
            e.stopPropagation();
            addToFavorites();
          }}
        >
          <FaHeart style={{ color: 'red', marginRight: '8px' }} />
          ADD TO FAVORITE
        </button>
      ) : (
        <button
          className="remove-btn"
          onClick={(e) => {
            e.stopPropagation();
            removeFavorite(movie.imdbID); // Pass movie ID
          }}
        >
          <FaTrashAlt style={{ color: 'darkred', marginRight: '8px' }} />
          Remove
        </button>
      )}

      {/* View Details Button */}
      <button className="details-btn" onClick={() => openDetails(movie.imdbID)}>
        View Details
      </button>
    </div>
  );
};

export default MovieCard;
