import { useQuery } from "@tanstack/react-query";

import { movieKeys } from "./queryKeys";
import { fetchMovies } from "./api";

export const useMoviesQuery = (query: string, page: number) =>
  useQuery({
    queryKey: movieKeys.list(query, page),
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
