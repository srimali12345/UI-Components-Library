import { createContext, useState, useContext, useEffect } from "react";

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [wasCleared, setWasCleared] = useState(false); // New flag to track explicit clear

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem("componentFavorites");
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          setFavorites(parsedFavorites);
          console.log("Loaded favorites from localStorage:", parsedFavorites);
        }
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
        localStorage.removeItem("componentFavorites"); // Remove corrupted data
      } finally {
        setInitialized(true);
      }
    };

    loadFavorites();
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (!initialized) return;

    try {
      if (favorites.length === 0 && wasCleared) {
        localStorage.removeItem("componentFavorites");
        console.log("Favorites removed from localStorage");
        setWasCleared(false); // Reset flag
      } else {
        localStorage.setItem("componentFavorites", JSON.stringify(favorites));
        console.log("Saved favorites to localStorage:", favorites);
      }
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites, initialized, wasCleared]);

  // Add a component to favorites with proper metadata
  const addFavorite = (component) => {
    if (!favorites.some((item) => item.id === component.id)) {
      const enrichedComponent = {
        ...component,
        addedAt: new Date().toISOString(),
      };
      setFavorites((prevFavorites) => [...prevFavorites, enrichedComponent]);
      console.log(`Added to favorites: ${component.id}`);
    }
  };

  // Remove a component from favorites
  const removeFavorite = (componentId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (item) => item.id !== componentId
      );
      console.log(`Removed from favorites: ${componentId}`);
      return updatedFavorites;
    });
  };

  // Check if component is a favorite
  const isFavorite = (componentId) => {
    return favorites.some((item) => item.id === componentId);
  };

  // Clear all favorites
  const clearAllFavorites = () => {
    setFavorites([]);
    setWasCleared(true); // Mark that this was user-intended
    console.log("All favorites cleared");
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearAllFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
