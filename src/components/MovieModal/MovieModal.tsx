import { useEffect } from "react";
import { createPortal } from "react-dom";

import type { Movie } from "../../types/movie";

import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!movie) {
    return null;
  }

  return createPortal(
    <div
      className={css.overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={css.modal}>
        <button type="button" className={css.closeButton} onClick={onClose}>
          ×
        </button>
        {movie.backdrop_path && (
          <img
            className={css.backdrop}
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
          />
        )}
        <h2 className={css.title}>{movie.title}</h2>
        <p className={css.meta}>
          {movie.release_date || "Release date unavailable"}
        </p>
        <p className={css.rating}>Rating: {movie.vote_average.toFixed(1)}</p>
        <p className={css.overview}>
          {movie.overview || "No description available."}
        </p>
      </div>
    </div>,
    document.body,
  );
};

export default MovieModal;
