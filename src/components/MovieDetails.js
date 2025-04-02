import React, { useState, useEffect } from "react";

const API_URL = "http://www.omdbapi.com/";
const API_KEY = process.env.REACT_APP_API_KEY;
const YOUTUBE_SEARCH_API = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const MovieDetails = ({ movieId, closeDetails }) => {
  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${API_URL}?i=${movieId}&apikey=${API_KEY}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (movieId) fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!movie?.Title) return;
      try {
        const res = await fetch(
          `${YOUTUBE_SEARCH_API}?part=snippet&maxResults=1&q=${encodeURIComponent(movie.Title + " official trailer")}&key=${YOUTUBE_API_KEY}`
        );
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          setTrailerId(data.items[0].id.videoId);
        }
      } catch (err) {
        console.error("Error fetching trailer:", err);
      }
    };

    fetchTrailer();
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="movie-details-overlay">
      <div className="movie-details-content">
        <button className="close-btn" onClick={closeDetails}>✖</button>

        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"}
          alt={movie.Title}
        />

        {trailerId && (
          <div className="trailer-container">
            <iframe
              width="100%"
              height="230"
              src={`https://www.youtube.com/embed/${trailerId}`}
              title={`${movie.Title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <h2>{movie.Title} ({movie.Year})</h2>
        <p><strong>Genre:</strong> {movie.Genre || "N/A"}</p>
        <p><strong>Director:</strong> {movie.Director || "N/A"}</p>
        <p><strong>Actors:</strong> {movie.Actors || "N/A"}</p>
        <p><strong>Plot:</strong> {movie.Plot || "No plot available."}</p>
        <p><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating || "N/A"}</p>
        <p><strong>Language:</strong> {movie.Language || "N/A"}</p>
        <p><strong>Runtime:</strong> {movie.Runtime || "N/A"}</p>
        <p><strong>Awards:</strong> {movie.Awards || "N/A"}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
