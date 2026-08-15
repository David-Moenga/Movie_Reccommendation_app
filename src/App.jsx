import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import Navbar from './components/Navbar';
import { updateSearchCount } from './appwrite.js';
import { useDebounce } from 'react-use';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '', signal) => {
    if (!API_KEY) {
      setMovieList([]);
      setErrorMessage('Movie search is unavailable because the TMDB API key is not configured.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        signal,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Movies');
      }

      const data = await response.json();

      const movies = Array.isArray(data.results) ? data.results : [];
      setMovieList(movies);

      if (query && movies.length > 0) {
        await updateSearchCount(query, movies[0]);
      }

    } catch (error) {
      if (error.name === 'AbortError') return;
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again.');
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchMovies(debouncedSearchTerm, controller.signal);

    return () => controller.abort();
  }, [debouncedSearchTerm]);

  return (
    <main id="home" className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="pattern">
        <div className="wrapper max-w-6xl mx-auto px-4">
          <header className="text-center py-4 mt-1.5">
            <img src="/hero.png" alt="Movie discovery" className="mx-auto mb-2" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Find <span className='text-gradient'>Movies</span> you enjoy without the hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section id="all-movies" className="all-movies mt-10">
            <h2 className="text-2xl font-semibold mb-4">All Movies</h2>

            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
