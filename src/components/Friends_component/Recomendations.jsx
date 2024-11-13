import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3';

const RecommendationsList = ({ data }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieEntries = Object.entries(data);
      const moviesWithPosters = await Promise.all(
        movieEntries.map(async ([title, details]) => {
          try {
            const searchResponse = await axios.get(`${BASE_URL}/search/movie`, {
              params: {
                api_key: API_KEY,
                query: title
              }
            });

            const movieData = searchResponse.data.results[0];
            const posterUrl = `https://image.tmdb.org/t/p/w500${movieData?.poster_path}`;

            return {
              title,
              url: details.url,
              rating: details.rating,
              posterUrl
            };
          } catch (error) {
            console.error("Error fetching movie data:", error);
            return null;
          }
        })
      );

      setMovies(moviesWithPosters.filter(Boolean)); // Filter out null values
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-gray-50 bg-opacity-50 w-full rounded-lg shadow-lg p-6">
      <h2 className="text-xl text-center mb-6 font-oswald text-gray-700">Movie recommendations that your network loves</h2>
      <ul className="flex flex-wrap items-center justify-around gap-x-5 gap-y-5">
        {movies.slice(0, 6).map(movie => (
          <li key={movie.title} className="flex flex-col items-center bg-white rounded-lg hover:shadow-lg p-4 w-32 md:w-40">
            <a href={`https://letterboxd.com${movie.url}`} target="_blank" rel="noopener noreferrer" className="text-center">
              <img src={movie.posterUrl} alt={`${movie.title} poster`} className=" w-24 h-32 md:w-32 md:h-48 object-cover rounded-sm mb-2" />
              <h3 className="text-sm md:text-md font-semibold">{movie.title}</h3>
            </a>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default RecommendationsList;
// grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4