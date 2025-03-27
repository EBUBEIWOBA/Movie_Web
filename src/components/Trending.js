import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com/';
const API_KEY = 'c36a3609';

const Trending = ({ openDetails }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(`${API_URL}?s=avengers&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Search) {
        const uniqueMovies = Array.from(new Map(data.Search.map(movie => [movie.imdbID, movie])).values());
        setTrendingMovies(uniqueMovies);
      }
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {trendingMovies.length > 0 ? (
        trendingMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} openDetails={openDetails} />
        ))
      ) : (
        <p>No trending movies found.</p>
      )}
    </div>
  );
};

export default Trending;
