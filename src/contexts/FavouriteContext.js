import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (component) => {
    setFavorites((prev) => [...prev, component]);
  };

  const updateFavorite = (favoriteId, updatedComponent) => {
    setFavorites((prev) =>
      prev.map((fav) => (fav.id === favoriteId ? updatedComponent : fav))
    );
  };

  const removeFavorite = (favoriteId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (componentId) => {
    return favorites.some((fav) => fav.id === componentId);
  };

  const getFavoriteById = (favoriteId) => {
    return favorites.find((fav) => fav.id === favoriteId);
  };

  const value = {
    favorites,
    addFavorite,
    updateFavorite,
    removeFavorite,
    clearAllFavorites,
    isFavorite,
    getFavoriteById,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
