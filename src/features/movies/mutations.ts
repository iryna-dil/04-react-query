import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MoviesApiResponse } from "../../types/movie";
import { movieKeys } from "./queryKeys";
import { toggleFavoriteMovie } from "./api";

interface ToggleFavoriteMovieVariables {
  movieId: number;
  query: string;
  page: number;
}

export const useToggleFavoriteMovie = (query: string, page: number) => {
  const queryClient = useQueryClient();
  const listKey = movieKeys.list(query, page);

  return useMutation({
    mutationFn: async ({ movieId }: ToggleFavoriteMovieVariables) =>
      toggleFavoriteMovie(movieId),
    onMutate: async ({ movieId }) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const previousMovies =
        queryClient.getQueryData<MoviesApiResponse>(listKey);

      queryClient.setQueryData<MoviesApiResponse>(listKey, (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          results: current.results.map((movie) =>
            movie.id === movieId
              ? { ...movie, isFavorite: !movie.isFavorite }
              : movie,
          ),
        };
      });

      return { previousMovies, listKey };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousMovies) {
        queryClient.setQueryData(context.listKey, context.previousMovies);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: movieKeys.list(query, page),
        exact: true,
      });
    },
  });
};
