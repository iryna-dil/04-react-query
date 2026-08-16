import type { Movie } from "../../types/movie";

import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  onToggleFavorite: (movieId: number) => void;
}

const imageBaseUrl = "https://image.tmdb.org/t/p/w185";

const MovieGrid = ({ movies, isLoading, onToggleFavorite }: MovieGridProps) => {
  if (isLoading) {
    return <div className={css.loading}>Loading movies...</div>;
  }

  if (!movies.length) {
    return (
      <div className={css.emptyState}>
        Enter a movie title to search and browse the results.
      </div>
    );
  }

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.card}>
          <img
            className={css.poster}
            src={
              movie.poster_path
                ? `${imageBaseUrl}${movie.poster_path}`
                : "https://via.placeholder.com/185x278?text=No+Poster"
            }
            alt={movie.title}
          />
          <div className={css.info}>
            <h2 className={css.title}>{movie.title}</h2>
            <p className={css.meta}>
              {movie.release_date || "Release date unavailable"}
            </p>
            <p className={css.rating}>
              Rating: {movie.vote_average.toFixed(1)}
            </p>
            <p className={css.overview}>
              {movie.overview || "No description available."}
            </p>
            <button
              type="button"
              className={
                movie.isFavorite ? css.favoriteButtonActive : css.favoriteButton
              }
              onClick={() => onToggleFavorite(movie.id)}
            >
              {movie.isFavorite ? "Removing favorite" : "Add to favorites"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
