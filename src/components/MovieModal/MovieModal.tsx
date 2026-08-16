import type { Movie } from "../../types/movie";

import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  if (!movie) {
    return null;
  }

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={css.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={css.title}>{movie.title}</h2>
        <p className={css.meta}>
          {movie.release_date || "Release date unavailable"}
        </p>
        <p className={css.rating}>Rating: {movie.vote_average.toFixed(1)}</p>
        <p className={css.overview}>
          {movie.overview || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default MovieModal;
