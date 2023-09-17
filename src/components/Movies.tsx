"use client";

import { useMovies } from "@/hooks/query/useMovies";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import Movie from "./Movie";
import OrderButton from "./OrderButton";
import { SortOrder } from "@/lib/tmdb";

export default function Movies() {
  const [sortBy, setSortBy] = useState<SortOrder>(SortOrder.Descending);

  const { data, fetchNextPage, isFetchingNextPage } = useMovies(sortBy);

  const { ref } = useInView({
    onChange: (inView) => {
      inView && fetchNextPage();
    },
  });

  const movies = data?.pages.flatMap((page) => page.results);

  const handleOnSortChange = (order: SortOrder) => {
    setSortBy(order);
  };

  return (
    <div className="flex flex-col items-center container mx-auto px-4 py-12">
      <div className="flex flex-col gap-2 md:flex-row w-full justify-between mb-8">
        <h1 className="font-medium text-3xl">Top 500 Movies</h1>
        <OrderButton onChange={handleOnSortChange} value={sortBy} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10">
        {movies?.map((movie, index) => {
          return (
            <Movie
              key={movie.id}
              id={movie.id}
              ref={index === movies.length - 1 ? ref : undefined}
              title={movie.title}
              image={
                process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL + movie.poster_path
              }
              rating={movie.vote_average}
              year={movie.release_date.split("-")[0]}
            />
          );
        })}
      </div>
      {isFetchingNextPage && (
        <div className="mt-8 text-white/50 font-medium">Loading more...</div>
      )}
    </div>
  );
}
