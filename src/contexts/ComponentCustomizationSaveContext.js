import { useState, useEffect, useCallback, useRef } from "react";

export const useComponentCustomization = (
  componentType,
  componentId,
  defaultStyles,
  defaultTitle = "",
  defaultContent = "",
  defaultNavItems = []
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

  // Use refs to store timeout IDs
  const timeoutRefs = useRef({});

  // Initialize state with defaults first
  const [styles, setStyles] = useState(defaultStyles);
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const [navItems, setNavItems] = useState(defaultNavItems);

  // Function to dispatch custom events for style updates
  const dispatchStyleUpdate = useCallback((componentType, componentId) => {
    const event = new CustomEvent('stylesUpdated', {
      detail: { componentType, componentId }
    });
    window.dispatchEvent(event);
  }, []);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedStyles = localStorage.getItem(stylesStorageKey);
      const savedTitle = localStorage.getItem(titleStorageKey);
      const savedContent = localStorage.getItem(contentStorageKey);
      const savedNavItems = localStorage.getItem(navItemsStorageKey);

      // Check if any data was previously saved
      const hasAnyPreviousData = savedStyles || savedTitle || savedContent || savedNavItems;
      setHasPreviouslySaved(!!hasAnyPreviousData);

      // If there's previously saved data, show "saved" status immediately
      if (hasAnyPreviousData) {
        setSavingState("saved");
      }

      // Only update states if there's saved data, and merge with defaults properly
      if (savedStyles) {
        const parsedStyles = JSON.parse(savedStyles);
        setStyles({ ...defaultStyles, ...parsedStyles });
      }
      if (savedTitle) {
        setTitle(savedTitle);
      }
      if (savedContent) {
        setContent(savedContent);
      }
      if (savedNavItems) {
        setNavItems(JSON.parse(savedNavItems));
      }

      setIsInitialized(true);
    } catch (error) {
      console.error("Error loading saved data:", error);
      setIsInitialized(true);
    }
  }, [stylesStorageKey, titleStorageKey, contentStorageKey, navItemsStorageKey, defaultStyles]);

  // Debounced save function with stable reference
  const debouncedSave = useCallback((key, value, delay = 1000) => {
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
        setSavingState("saved");
        
        // Dispatch custom event for styles updates
        if (key === stylesStorageKey) {
          dispatchStyleUpdate(componentType, componentId);
        }
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
        setSavingState("idle");
      }
    }, delay);

    return timeoutRefs.current[key];
  }, [stylesStorageKey, componentType, componentId, dispatchStyleUpdate]);

  // Save changes to localStorage whenever they update (only after initialization)
  useEffect(() => {
    if (!isInitialized) return;

    const timeoutId = debouncedSave(stylesStorageKey, styles);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [styles, stylesStorageKey, debouncedSave, isInitialized]);

  useEffect(() => {
    if (!isInitialized || title === defaultTitle) return;

    const timeoutId = debouncedSave(titleStorageKey, title);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [title, titleStorageKey, defaultTitle, debouncedSave, isInitialized]);

  useEffect(() => {
    if (!isInitialized || content === defaultContent) return;

    const timeoutId = debouncedSave(contentStorageKey, content);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [content, contentStorageKey, defaultContent, debouncedSave, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    const timeoutId = debouncedSave(navItemsStorageKey, navItems);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [navItems, navItemsStorageKey, debouncedSave, isInitialized]);

  // Revert function to restore default settings
  const handleRevert = useCallback(() => {
    try {
      // Clear all timeouts
      Object.values(timeoutRefs.current).forEach(timeoutId => {
        if (timeoutId) clearTimeout(timeoutId);
      });
      timeoutRefs.current = {};

      // Clear saved data from localStorage
      localStorage.removeItem(stylesStorageKey);
      localStorage.removeItem(titleStorageKey);
      localStorage.removeItem(contentStorageKey);
      localStorage.removeItem(navItemsStorageKey);

      // Reset to defaults
      setStyles(defaultStyles);
      setTitle(defaultTitle);
      setContent(defaultContent);
      setNavItems(defaultNavItems);
      setHasPreviouslySaved(false);
      setHasStartedCustomizing(false);
      setSavingState("idle");

      // Dispatch style update event for revert
      dispatchStyleUpdate(componentType, componentId);

      console.log(
        `${componentType} ${componentId} has been reset to default settings`
      );
    } catch (error) {
      console.error("Error reverting to defaults:", error);
    }
  }, [componentType, componentId, defaultStyles, defaultTitle, defaultContent, defaultNavItems, stylesStorageKey, titleStorageKey, contentStorageKey, navItemsStorageKey, dispatchStyleUpdate]);

  return [
    styles,
    setStyles,
    title,
    setTitle,
    content,
    setContent,
    navItems,
    setNavItems,
    handleRevert,
    savingState,
    hasPreviouslySaved,
  ];
};
