import React, { forwardRef } from "react";
import Image from "next/image";
import MovieRating from "./MovieRating";
import FavoriteButton from "./FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";

interface Props {
  id: number;
  title: string;
  image: string;
  rating: number;
  year: string;
}

const Movie = forwardRef<HTMLDivElement, Props>(
  ({ id, title, image, rating, year }, ref) => {
    const { favorites, toggle } = useFavorites();

    const handleFavoriteClicked = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      toggle(id);
    };

    const handleMovieClicked = () => {
      window.open(`${process.env.NEXT_PUBLIC_TMDB_PAGE_URL}/${id}`, "_blank");
    };

    return (
      <div
        className="flex flex-col group cursor-pointer select-none"
        onClick={handleMovieClicked}
      >
        <div
          className="relative w-full aspect-[3/4.5] rounded-xl bg-surface shadow-md overflow-hidden mb-3"
          ref={ref}
        >
          <Image
            className="transition-all duration-500 ease-in-out will-change-transform group-hover:none md:group-hover:scale-110 transform opacity-0 bg-white object-cover"
            src={image}
            alt={`Image of ${title}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            fill
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />

          <div className="absolute inset-x-0 top-0 flex justify-between p-2 bg-gradient-to-b from-black/50 to-transparent-500">
            <MovieRating rating={rating} />
            <FavoriteButton
              active={favorites.includes(id)}
              onClick={handleFavoriteClicked}
            />
          </div>
        </div>
        <span className="font-medium truncate">{title}</span>
        <span className="text-sm text-white/50">{year}</span>
      </div>
    );
  }
);

Movie.displayName = "Movie";

export default Movie;
