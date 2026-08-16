import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

import css from "./App.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, error, isFetching, isSuccess } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    placeholderData: (previousData) => previousData,
  });

  const totalPages = data?.total_pages ?? 0;

  const handleSearch = (nextQuery: string) => {
    if (!nextQuery.trim()) {
      toast.error("Please enter a movie title.");
      return;
    }

    setQuery(nextQuery);
    setPage(1);
    setSelectedMovie(null);
  };

  return (
    <main className={css.app}>
      <Toaster position="top-right" />
      <h1 className={css.title}>Movie Search</h1>
      <p className={css.subtitle}>
        Search for your favorite films and browse the results page by page.
      </p>

      <SearchBar query={query} isLoading={isLoading} onSubmit={handleSearch} />

      {isFetching && data && (
        <div className={css.backgroundRefetch}>
          Background refetch in progress…
        </div>
      )}

      {isError && (
        <div className={css.error}>
          {error instanceof Error
            ? error.message
            : "Something went wrong while loading movies."}
        </div>
      )}

      {!query && !isLoading && (
        <div className={css.emptyState}>
          Please enter a movie title to begin the search.
        </div>
      )}

      {query && isSuccess && (
        <MovieGrid
          movies={data?.results ?? []}
          isLoading={isLoading}
          onSelect={setSelectedMovie}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
          breakLabel="..."
        />
      )}
    </main>
  );
};

export default App;
