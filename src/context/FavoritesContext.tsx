"use client";

import { isClient } from "@/utils/common";
import { createContext, useEffect, useState } from "react";

type ContextType = {
  toggle: (id: number) => void;
  favorites: number[];
};

export const FavoritesContext = createContext<ContextType>({
  toggle: () => {},
  favorites: [],
});

const FavoritesContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const presistedFavorites = isClient() && localStorage.getItem("favorites");

  const [favorites, setFavorites] = useState<number[]>(
    presistedFavorites ? JSON.parse(presistedFavorites) : []
  );

  useEffect(() => {
    isClient() && localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggle = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((movieId) => movieId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ toggle, favorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
