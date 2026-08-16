import axios from "axios";

import type { Movie } from "../types/movie";

export interface MoviesApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const fetchMovies = async (query: string, page: number) => {
  const { data } = await axios.get<MoviesApiResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        api_key: apiKey,
        query,
        page,
      },
    },
  );

  return data;
};
