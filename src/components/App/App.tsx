import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import css from "./App.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

import type Movie from "../../types/movie";
import { searchMovies } from "../../services/movieService";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!query) return;
    async function fetchMovies(): Promise<void> {
      try {
        setLoading(true);
        setIsError(false);
        setMovies([]);
        const results = await searchMovies(query);

        if (results.length === 0) {
          toast.error("No movies found for your request.");
        }

        setMovies(results);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  const handleSearchSubmit = (newQuery: string): void => {
    setQuery(newQuery);
  };
  const handleCloseModal = (): void => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearchSubmit} />
      {loading && <Loader />}
      {isError && !loading && <ErrorMessage type="empty" />}
      {!loading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
