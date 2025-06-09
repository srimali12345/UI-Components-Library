import { useState, useEffect, useCallback, useRef } from "react";

export const useComponentCustomization = (
  componentType,
  componentId,
  defaultStyles,
  defaultTitle = "",
  defaultContent = "",
  defaultNavItems = [],
  isFromFavorites = false,
  existingStyles = {},
  existingTitle = "",
  existingContent = ""
) => {
  // Create storage keys based on component type and ID
  const stylesStorageKey = `${componentType}-styles-${componentId}`;
  const titleStorageKey = `${componentType}-title-${componentId}`;
  const contentStorageKey = `${componentType}-content-${componentId}`;
  const navItemsStorageKey = `${componentType}-navItems-${componentId}`;

  // State for saving status
  const [savingState, setSavingState] = useState("idle");
  const [hasPreviouslySaved, setHasPreviouslySaved] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasStartedCustomizing, setHasStartedCustomizing] = useState(false);

  // Store original/saved values for comparison
  const [originalStyles, setOriginalStyles] = useState(defaultStyles);
  const [originalTitle, setOriginalTitle] = useState(defaultTitle);
  const [originalContent, setOriginalContent] = useState(defaultContent);
  const [originalNavItems, setOriginalNavItems] = useState(defaultNavItems);

  // Use refs to store timeout IDs
  const timeoutRefs = useRef({});

  // Initialize state with defaults first
  const [styles, setStyles] = useState(defaultStyles);
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const [navItems, setNavItems] = useState(defaultNavItems);

  // Helper function to safely parse JSON
  const safeParseJSON = (value, fallback) => {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.warn("Failed to parse JSON:", error);
      return fallback;
    }
  };

  // Load and initialize data
  useEffect(() => {
    try {
      let initialStyles, initialTitle, initialContent, initialNavItems;

      if (isFromFavorites) {
        // When from favorites, use the existing data passed from favorites page
        initialStyles = Object.keys(existingStyles).length > 0 ? existingStyles : defaultStyles;
        initialTitle = existingTitle || defaultTitle;
        initialContent = existingContent || defaultContent;
        initialNavItems = defaultNavItems;

        console.log("Loading from favorites:", {
          initialStyles,
          initialTitle,
          initialContent,
          existingStyles,
          existingTitle
        });

        // Mark as previously saved if we have favorite data
        const hasDataFromFavorites = Object.keys(existingStyles).length > 0 || 
                                     (existingTitle && existingTitle !== defaultTitle) || 
                                     (existingContent && existingContent !== defaultContent);
        
        if (hasDataFromFavorites) {
          setHasPreviouslySaved(true);
          setSavingState("saved");
        }
      } else {
        // When NOT from favorites, ALWAYS start with defaults (no localStorage loading)
        initialStyles = defaultStyles;
        initialTitle = defaultTitle;
        initialContent = defaultContent;
        initialNavItems = defaultNavItems;

        console.log("Starting with defaults for normal customization:", {
          initialStyles,
          initialTitle,
          initialContent
        });

        // Reset saving state for fresh start
        setHasPreviouslySaved(false);
        setSavingState("idle");
      }

      // Set all state values
      setStyles(initialStyles);
      setTitle(initialTitle);
      setContent(initialContent);
      setNavItems(initialNavItems);
      setOriginalStyles(initialStyles);
      setOriginalTitle(initialTitle);
      setOriginalContent(initialContent);
      setOriginalNavItems(initialNavItems);

      setIsInitialized(true);
    } catch (error) {
      console.error("Error loading saved data:", error);
      // Fallback to defaults
      setStyles(defaultStyles);
      setTitle(defaultTitle);
      setContent(defaultContent);
      setNavItems(defaultNavItems);
      setOriginalStyles(defaultStyles);
      setOriginalTitle(defaultTitle);
      setOriginalContent(defaultContent);
      setOriginalNavItems(defaultNavItems);
      setIsInitialized(true);
    }
  }, [
    componentType,
    componentId,
    isFromFavorites,
    stylesStorageKey,
    titleStorageKey,
    contentStorageKey,
    navItemsStorageKey,
    JSON.stringify(defaultStyles),
    defaultTitle,
    defaultContent,
    JSON.stringify(defaultNavItems),
    JSON.stringify(existingStyles),
    existingTitle,
    existingContent,
  ]);

  // Function to check if there are unsaved changes
  const hasUnsavedChanges = useCallback(() => {
    if (!isInitialized) return false;

    // Deep compare objects and arrays
    const stylesChanged = JSON.stringify(styles) !== JSON.stringify(originalStyles);
    const titleChanged = title !== originalTitle;
    const contentChanged = content !== originalContent;
    const navItemsChanged = JSON.stringify(navItems) !== JSON.stringify(originalNavItems);

    const hasChanges = stylesChanged || titleChanged || contentChanged || navItemsChanged;
    console.log("Checking for unsaved changes:", {
      stylesChanged,
      titleChanged,
      contentChanged,
      navItemsChanged,
      hasChanges
    });

    return hasChanges;
  }, [
    isInitialized,
    styles,
    originalStyles,
    title,
    originalTitle,
    content,
    originalContent,
    navItems,
    originalNavItems,
  ]);

  // Debounced save function with stable reference
  const debouncedSave = useCallback(
    (key, value, delay = 1000) => {
      // Clear existing timeout for this key
      if (timeoutRefs.current[key]) {
        clearTimeout(timeoutRefs.current[key]);
      }

      setSavingState("saving");
      // Mark that user has started customizing
      setHasStartedCustomizing(true);

      timeoutRefs.current[key] = setTimeout(() => {
        try {
          if (typeof value === "object") {
            localStorage.setItem(key, JSON.stringify(value));
          } else {
            localStorage.setItem(key, value);
          }

          console.log(`Saved ${key}:`, value);

          // Update original values after successful save
          if (key === stylesStorageKey) {
            setOriginalStyles(JSON.parse(JSON.stringify(value))); // Deep copy
          } else if (key === titleStorageKey) {
            setOriginalTitle(value);
          } else if (key === contentStorageKey) {
            setOriginalContent(value);
          } else if (key === navItemsStorageKey) {
            setOriginalNavItems(JSON.parse(JSON.stringify(value))); // Deep copy
          }

          setSavingState("saved");
          setHasPreviouslySaved(true);
        } catch (error) {
          console.error(`Error saving ${key} to localStorage:`, error);
          setSavingState("error");
          setTimeout(() => setSavingState("idle"), 2000);
        }
      }, delay);

      return timeoutRefs.current[key];
    },
    [stylesStorageKey, titleStorageKey, contentStorageKey, navItemsStorageKey]
  );

  // Save changes to localStorage whenever they update (only after initialization)
  useEffect(() => {
    if (!isInitialized) return;

    console.log("Styles changed, saving:", styles);
    const timeoutId = debouncedSave(stylesStorageKey, styles);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [styles, stylesStorageKey, debouncedSave, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    console.log("Title changed, saving:", title);
    const timeoutId = debouncedSave(titleStorageKey, title);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [title, titleStorageKey, debouncedSave, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    console.log("Content changed, saving:", content);
    const timeoutId = debouncedSave(contentStorageKey, content);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [content, contentStorageKey, debouncedSave, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    console.log("NavItems changed, saving:", navItems);
    const timeoutId = debouncedSave(navItemsStorageKey, navItems);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [navItems, navItemsStorageKey, debouncedSave, isInitialized]);

  // Revert function to restore default settings
  const handleRevert = useCallback(() => {
    try {
      // Clear all timeouts
      Object.values(timeoutRefs.current).forEach((timeoutId) => {
        if (timeoutId) clearTimeout(timeoutId);
      });
      timeoutRefs.current = {};

      // Clear saved data from localStorage
      localStorage.removeItem(stylesStorageKey);
      localStorage.removeItem(titleStorageKey);
      localStorage.removeItem(contentStorageKey);
      localStorage.removeItem(navItemsStorageKey);

      // Reset to defaults
      setStyles(JSON.parse(JSON.stringify(defaultStyles))); // Deep copy
      setTitle(defaultTitle);
      setContent(defaultContent);
      setNavItems(JSON.parse(JSON.stringify(defaultNavItems))); // Deep copy
      setOriginalStyles(JSON.parse(JSON.stringify(defaultStyles))); // Deep copy
      setOriginalTitle(defaultTitle);
      setOriginalContent(defaultContent);
      setOriginalNavItems(JSON.parse(JSON.stringify(defaultNavItems))); // Deep copy
      setHasPreviouslySaved(false);
      setHasStartedCustomizing(false);
      setSavingState("idle");

      console.log(`${componentType} ${componentId} has been reset to default settings`);
    } catch (error) {
      console.error("Error reverting to defaults:", error);
    }
  }, [
    componentType,
    componentId,
    defaultStyles,
    defaultTitle,
    defaultContent,
    defaultNavItems,
    stylesStorageKey,
    titleStorageKey,
    contentStorageKey,
    navItemsStorageKey,
  ]);

  // Custom setters that trigger immediate UI updates
  const setStylesWithUpdate = useCallback((newStyles) => {
    console.log("Setting new styles:", newStyles);
    if (typeof newStyles === 'function') {
      setStyles(prevStyles => {
        const updatedStyles = newStyles(prevStyles);
        console.log("Updated styles (function):", updatedStyles);
        return updatedStyles;
      });
    } else {
      setStyles(newStyles);
    }
  }, []);

  const setTitleWithUpdate = useCallback((newTitle) => {
    console.log("Setting new title:", newTitle);
    setTitle(newTitle);
  }, []);

  const setContentWithUpdate = useCallback((newContent) => {
    console.log("Setting new content:", newContent);
    setContent(newContent);
  }, []);

  const setNavItemsWithUpdate = useCallback((newNavItems) => {
    console.log("Setting new navItems:", newNavItems);
    if (typeof newNavItems === 'function') {
      setNavItems(prevNavItems => {
        const updatedNavItems = newNavItems(prevNavItems);
        console.log("Updated navItems (function):", updatedNavItems);
        return updatedNavItems;
      });
    } else {
      setNavItems(newNavItems);
    }
  }, []);

  return [
    styles,
    setStylesWithUpdate,
    title,
    setTitleWithUpdate,
    content,
    setContentWithUpdate,
    navItems,
    setNavItemsWithUpdate,
    handleRevert,
    savingState,
    hasPreviouslySaved,
    hasUnsavedChanges,
    isInitialized,
  ];
};
