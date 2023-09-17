import { api } from "@/lib/api";
import { SortOrder } from "@/lib/tmdb";
import { useInfiniteQuery } from "@tanstack/react-query";

const TMDB_NUM_PER_PAGE = 20;
const MAX_RESULTS = 500;

export const useMovies = (sortBy: SortOrder) => {
  return useInfiniteQuery({
    queryKey: ["movies", { sortBy }],
    queryFn: ({ pageParam = 1 }) =>
      api.fetchMovies({ page: pageParam, sortBy }),
    useErrorBoundary: true,
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage;

      // Specification says that the app must only show the top 500 movies, prevent fetching more
      const canFetchMore = page * TMDB_NUM_PER_PAGE < MAX_RESULTS;

      return page < total_pages && canFetchMore ? page + 1 : undefined;
    },
  });
};
