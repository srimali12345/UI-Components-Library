import React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "../contexts/FavouriteContext";

const FavoriteButton = ({ component }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isComponentFavorite = isFavorite(component.id);

  const toggleFavorite = (e) => {
    if (isComponentFavorite) {
      removeFavorite(component.id);
    } else {
      addFavorite(component);
    }
  };

  return (
    <button
      className=" favorite-button"
      onClick={toggleFavorite}
      title={isComponentFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-label={
        isComponentFavorite ? "Remove from favorites" : "Add to favorites"
      }
    >
      <Heart
        size={16}
        fill={isComponentFavorite ? "#ff3b5c" : "none"}
        stroke={isComponentFavorite ? "#ff3b5c" : "currentColor"}
        className="btn-icon"
      />
    </button>
  );
};

export default FavoriteButton;
