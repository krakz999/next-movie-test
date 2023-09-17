import { FetchMoviesParameters, MoviesResponse } from "./tmdb";

async function fetchMovies({
  page,
  sortBy,
}: FetchMoviesParameters): Promise<MoviesResponse> {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("sort_by", sortBy);

  const url = process.env.NEXT_PUBLIC_VERCEL_URL
    ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
    : "http://localhost:3000";

  const res = await fetch(`${url}/api/movies?` + params);

  return res.json();
}

export const api = {
  fetchMovies,
};
