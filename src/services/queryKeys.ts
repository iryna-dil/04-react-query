export const movieKeys = {
  all: ["movies"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (query: string, page: number) =>
    [...movieKeys.lists(), { query, page }] as const,
  details: () => [...movieKeys.all, "detail"] as const,
  detail: (movieId: number) => [...movieKeys.details(), movieId] as const,
};
