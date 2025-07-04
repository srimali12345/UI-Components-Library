
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
  existingContent = "",
  existingNavItems = []
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
  
  // Track actual user modifications - only set to true when user explicitly changes something
  const [userHasModified, setUserHasModified] = useState(false);
  const isInitializing = useRef(true);

  // Store baseline values for comparison (these represent the initially loaded state)
  const [baselineStyles, setBaselineStyles] = useState(null);
  const [baselineTitle, setBaselineTitle] = useState(null);
  const [baselineContent, setBaselineContent] = useState(null);
  const [baselineNavItems, setBaselineNavItems] = useState(null);

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
      isInitializing.current = true;
      let initialStyles, initialTitle, initialContent, initialNavItems;

      if (isFromFavorites) {
        // When from favorites, use the existing data passed from favorites page
        initialStyles = Object.keys(existingStyles).length > 0 ? existingStyles : defaultStyles;
        initialTitle = existingTitle || defaultTitle;
        initialContent = existingContent || defaultContent;
        // Use existing nav items from favorites if available, otherwise use defaults
        initialNavItems = (existingNavItems && Array.isArray(existingNavItems) && existingNavItems.length > 0) 
          ? existingNavItems 
          : defaultNavItems;

        console.log("Loading from favorites:", {
          initialStyles,
          initialTitle,
          initialContent,
          existingStyles,
          existingTitle,
          initialNavItems,
          existingNavItems,
          defaultNavItems
        });

        // Mark as previously saved if we have favorite data
        const hasDataFromFavorites = Object.keys(existingStyles).length > 0 || 
                                     (existingTitle && existingTitle !== defaultTitle) || 
                                     (existingContent && existingContent !== defaultContent) ||
                                     (existingNavItems && Array.isArray(existingNavItems) && existingNavItems.length > 0);
        
        if (hasDataFromFavorites) {
          setHasPreviouslySaved(true);
          setSavingState("saved");
        }
      } else {
        // When NOT from favorites, ALWAYS use defaults (ignore localStorage)
        initialStyles = defaultStyles;
        initialTitle = defaultTitle;
        initialContent = defaultContent;
        initialNavItems = defaultNavItems;

        console.log("Starting with defaults for normal customization:", {
          initialStyles,
          initialTitle,
          initialContent,
          initialNavItems
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
      
      // Set baseline values (these represent the initially loaded state for comparison)
      setBaselineStyles(JSON.parse(JSON.stringify(initialStyles))); // Deep copy
      setBaselineTitle(initialTitle);
      setBaselineContent(initialContent);
      setBaselineNavItems(JSON.parse(JSON.stringify(initialNavItems))); // Deep copy

      // Important: Do NOT mark as user modified during initialization
      setUserHasModified(false);

      setIsInitialized(true);
      
      // Set initializing to false after a short delay to allow all state updates to complete
      setTimeout(() => {
        isInitializing.current = false;
      }, 100);
    } catch (error) {
      console.error("Error loading saved data:", error);
      // Fallback to defaults
      setStyles(defaultStyles);
      setTitle(defaultTitle);
      setContent(defaultContent);
      setNavItems(defaultNavItems);
      setBaselineStyles(JSON.parse(JSON.stringify(defaultStyles)));
      setBaselineTitle(defaultTitle);
      setBaselineContent(defaultContent);
      setBaselineNavItems(JSON.parse(JSON.stringify(defaultNavItems)));
      setUserHasModified(false);
      setIsInitialized(true);
      setTimeout(() => {
        isInitializing.current = false;
      }, 100);
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
    JSON.stringify(existingNavItems),
  ]);

  // Function to check if there are unsaved changes
  const hasUnsavedChanges = useCallback(() => {
    // If not initialized or user hasn't modified anything, no unsaved changes
    if (!isInitialized || !userHasModified || baselineStyles === null || isInitializing.current) {
      console.log("No unsaved changes - not initialized, not modified, or still initializing:", {
        isInitialized,
        userHasModified,
        isInitializing: isInitializing.current
      });
      return false;
    }

    // Compare current values with baseline (initially loaded) values
    const stylesChanged = JSON.stringify(styles) !== JSON.stringify(baselineStyles);
    const titleChanged = title !== baselineTitle;
    const contentChanged = content !== baselineContent;
    const navItemsChanged = JSON.stringify(navItems) !== JSON.stringify(baselineNavItems);

    const hasChanges = stylesChanged || titleChanged || contentChanged || navItemsChanged;
    console.log("Checking for unsaved changes:", {
      userHasModified,
      stylesChanged,
      titleChanged,
      contentChanged,
      navItemsChanged,
      hasChanges,
      isInitializing: isInitializing.current
    });

    return hasChanges;
  }, [
    isInitialized,
    userHasModified,
    styles,
    baselineStyles,
    title,
    baselineTitle,
    content,
    baselineContent,
    navItems,
    baselineNavItems,
  ]);

  // Debounced save function with stable reference
  const debouncedSave = useCallback(
    (key, value, delay = 1000) => {
      // Don't save during initialization
      if (isInitializing.current) {
        console.log("Skipping save during initialization");
        return;
      }

      // Clear existing timeout for this key
      if (timeoutRefs.current[key]) {
        clearTimeout(timeoutRefs.current[key]);
      }

      setSavingState("saving");

      timeoutRefs.current[key] = setTimeout(() => {
        try {
          if (typeof value === "object") {
            localStorage.setItem(key, JSON.stringify(value));
          } else {
            localStorage.setItem(key, value);
          }

          console.log(`Saved ${key}:`, value);

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
    if (!isInitialized || isInitializing.current) return;

    console.log("Styles changed, saving:", styles);
    const timeoutId = debouncedSave(stylesStorageKey, styles);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [styles, stylesStorageKey, debouncedSave, isInitialized]);

  useEffect(() => {
    if (!isInitialized || isInitializing.current) return;

    console.log("Title changed, saving:", title);
    const timeoutId = debouncedSave(titleStorageKey, title);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [title, titleStorageKey, debouncedSave, isInitialized]);

  useEffect(() => {
    if (!isInitialized || isInitializing.current) return;

    console.log("Content changed, saving:", content);
    const timeoutId = debouncedSave(contentStorageKey, content);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [content, contentStorageKey, debouncedSave, isInitialized]);

  useEffect(() => {
    if (!isInitialized || isInitializing.current) return;

    console.log("NavItems changed, saving:", navItems);
    const timeoutId = debouncedSave(navItemsStorageKey, navItems);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [navItems, navItemsStorageKey, debouncedSave, isInitialized]);

  // Revert function to restore to initially loaded state
  const handleRevert = useCallback(() => {
    try {
      // Clear all timeouts
      Object.values(timeoutRefs.current).forEach((timeoutId) => {
        if (timeoutId) clearTimeout(timeoutId);
      });
      timeoutRefs.current = {};

      // Reset to baseline (initially loaded) values
      setStyles(JSON.parse(JSON.stringify(baselineStyles))); // Deep copy
      setTitle(baselineTitle);
      setContent(baselineContent);
      setNavItems(JSON.parse(JSON.stringify(baselineNavItems))); // Deep copy

      // Reset user modification tracking
      setUserHasModified(false);

      console.log(`${componentType} ${componentId} has been reset to initial state`);
    } catch (error) {
      console.error("Error reverting to initial state:", error);
    }
  }, [
    componentType,
    componentId,
    baselineStyles,
    baselineTitle,
    baselineContent,
    baselineNavItems,
  ]);

  // Custom setters that trigger immediate UI updates and mark as modified
  const setStylesWithUpdate = useCallback((newStyles) => {
    console.log("Setting new styles:", newStyles, "isInitializing:", isInitializing.current);
    
    // Only mark as modified if not initializing
    if (!isInitializing.current) {
      setUserHasModified(true);
    }
    
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
    console.log("Setting new title:", newTitle, "isInitializing:", isInitializing.current);
    
    // Only mark as modified if not initializing
    if (!isInitializing.current) {
      setUserHasModified(true);
    }
    
    setTitle(newTitle);
  }, []);

  const setContentWithUpdate = useCallback((newContent) => {
    console.log("Setting new content:", newContent, "isInitializing:", isInitializing.current);
    
    // Only mark as modified if not initializing
    if (!isInitializing.current) {
      setUserHasModified(true);
    }
    
    setContent(newContent);
  }, []);

  const setNavItemsWithUpdate = useCallback((newNavItems) => {
    console.log("Setting new navItems:", newNavItems, "isInitializing:", isInitializing.current);
    
    // Only mark as modified if not initializing
    if (!isInitializing.current) {
      setUserHasModified(true);
    }
    
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
