import { useState } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MovieList from "../MovieList/MovieList";
import { useMoviesQuery } from "../../services/queries";
import { useToggleFavoriteMovie } from "../../services/mutations";

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

  const { data, isLoading, isError, error, isFetching, isStale } =
    useMoviesQuery(query, page);
  const favoriteMutation = useToggleFavoriteMovie(query, page);

  const totalPages = data?.total_pages ?? 0;

  const handleSearch = (nextQuery: string) => {
    setQuery(nextQuery);
    setPage(1);
  };

  const handleToggleFavorite = (movieId: number) => {
    favoriteMutation.mutate({ movieId, query, page });
  };

  return (
    <main className={css.app}>
      <h1 className={css.title}>Movie Search</h1>
      <p className={css.subtitle}>
        Search for your favorite films and browse the results page by page.
      </p>

      <SearchForm query={query} isLoading={isLoading} onSubmit={handleSearch} />

      {isFetching && data && (
        <div className={css.backgroundRefetch}>
          Background refetch in progress…
        </div>
      )}

      {isStale && data && !isFetching && (
        <div className={css.staleData}>
          Showing stale data while refetching…
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

      {query && (
        <MovieList
          movies={data?.results ?? []}
          isLoading={isLoading}
          onToggleFavorite={handleToggleFavorite}
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
