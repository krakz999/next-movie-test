export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export enum SortOrder {
  Ascending = "asc",
  Descending = "desc",
}

export type FetchMoviesParameters = {
  page: number;
  sortBy: SortOrder;
};

async function fetchMovies({
  page,
  sortBy,
}: FetchMoviesParameters): Promise<MoviesResponse> {
  const params = new URLSearchParams();

  params.append("include_adult", "false");
  params.append("include_video", "false");
  params.append("language", "en-US");
  params.append("without_genres", "99,10755");
  params.append("vote_count.gte", "200");
  params.append("page", page.toString());
  params.append("sort_by", "vote_average." + sortBy);

  const res = await fetch(
    `${process.env.TMDB_API_URL}/discover/movie?` + params,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      next: {
        revalidate: 86400,
      },
    }
  );

  return res.json();
}

export const tmdb = {
  fetchMovies,
};
