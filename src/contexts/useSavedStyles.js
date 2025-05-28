import { useState, useEffect } from "react";

export const useSavedStyles = (componentType, componentId, defaultStyles) => {
  const [savedStyles, setSavedStyles] = useState(defaultStyles);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSavedStyles = () => {
      try {
        const stylesStorageKey = `${componentType}-styles-${componentId}`;
        const savedStylesData = localStorage.getItem(stylesStorageKey);

        if (savedStylesData) {
          const parsedStyles = JSON.parse(savedStylesData);
          setSavedStyles({ ...defaultStyles, ...parsedStyles });
        } else {
          setSavedStyles(defaultStyles);
        }
      } catch (error) {
        console.error("Error loading saved styles:", error);
        setSavedStyles(defaultStyles);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedStyles();

    const handleStorageChange = (e) => {
      const stylesStorageKey = `${componentType}-styles-${componentId}`;
      if (e.key === stylesStorageKey) {
        loadSavedStyles();
      }
    };

    const handleCustomUpdate = (e) => {
      if (
        e.detail?.componentType === componentType &&
        e.detail?.componentId === componentId
      ) {
        loadSavedStyles();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("stylesUpdated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("stylesUpdated", handleCustomUpdate);
    };
  }, [componentType, componentId, defaultStyles]);

  return { savedStyles, isLoading };
};
