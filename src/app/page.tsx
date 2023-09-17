import Movies from "@/components/Movies";
import ReactQueryHydrate from "@/components/ReactQueryHydrate";
import getQueryClient from "@/lib/getQueryClient";
import { FetchMoviesParameters, SortOrder, tmdb } from "@/lib/tmdb";
import { dehydrate } from "@tanstack/react-query";

const initialFetchParams: FetchMoviesParameters = {
  page: 1,
  sortBy: SortOrder.Descending,
};

export default async function Home() {
  // Pre-fetch the first page on server side to benefit from SSR, then hydrate the query cache on the client side
  const queryClient = getQueryClient();

  // Use fetchQuery instead of prefetchQuery to throw on error
  await queryClient.fetchInfiniteQuery(
    ["movies", { sortBy: initialFetchParams.sortBy }],
    () => tmdb.fetchMovies(initialFetchParams)
  );

  // Serialize the query client cache on the server
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Movies />
    </ReactQueryHydrate>
  );
}
