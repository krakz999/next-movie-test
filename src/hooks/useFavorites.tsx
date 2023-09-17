import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export const useFavorites = () => {
  const { toggle, favorites } = useContext(FavoritesContext);
  return { toggle, favorites };
};
