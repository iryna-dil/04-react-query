import axios from "axios";

import type { MoviesApiResponse } from "../types/movie";

const API_KEY = "90b3e7854c2cc0919f338946b802956b";

export const fetchMovies = async (query: string, page: number) => {
  const { data } = await axios.get<MoviesApiResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    },
  );

  return data;
};

export const toggleFavoriteMovie = async (movieId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return { id: movieId, savedAt: new Date().toISOString() };
};
