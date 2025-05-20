import { useState, useEffect } from "react";

export const useComponentCustomization = (
  componentType,
  componentId,
  defaultStyles,
  defaultTitle = "",
  defaultContent = ""
) => {
  // Create storage keys based on component type and ID
  const stylesStorageKey = `${componentType}-styles-${componentId}`;
  const titleStorageKey = `${componentType}-title-${componentId}`;
  const contentStorageKey = `${componentType}-content-${componentId}`;

  // Load saved data from localStorage on component mount
  const getSavedData = () => {
    try {
      const savedStyles = localStorage.getItem(stylesStorageKey);
      const savedTitle = localStorage.getItem(titleStorageKey);
      const savedContent = localStorage.getItem(contentStorageKey);

      return {
        styles: savedStyles ? JSON.parse(savedStyles) : defaultStyles,
        title: savedTitle || defaultTitle,
        content: savedContent || defaultContent,
      };
    } catch (error) {
      console.error("Error loading saved data:", error);
      return {
        styles: defaultStyles,
        title: defaultTitle,
        content: defaultContent,
      };
    }
  };

  const savedData = getSavedData();
  const [styles, setStyles] = useState(savedData.styles);
  const [title, setTitle] = useState(savedData.title);
  const [content, setContent] = useState(savedData.content);

  // Save changes to localStorage whenever they update
  useEffect(() => {
    try {
      localStorage.setItem(stylesStorageKey, JSON.stringify(styles));
    } catch (error) {
      console.error("Error saving styles to localStorage:", error);
    }
  }, [styles, stylesStorageKey]);

  useEffect(() => {
    if (title) {
      try {
        localStorage.setItem(titleStorageKey, title);
      } catch (error) {
        console.error("Error saving title to localStorage:", error);
      }
    }
  }, [title, titleStorageKey]);

  useEffect(() => {
    if (content) {
      try {
        localStorage.setItem(contentStorageKey, content);
      } catch (error) {
        console.error("Error saving content to localStorage:", error);
      }
    }
  }, [content, contentStorageKey]);

  // Revert function to restore default settings
  const handleRevert = () => {
    try {
      // Clear saved data from localStorage
      localStorage.removeItem(stylesStorageKey);
      localStorage.removeItem(titleStorageKey);
      localStorage.removeItem(contentStorageKey);

      // Reset to defaults
      setStyles(defaultStyles);
      setTitle(defaultTitle);
      setContent(defaultContent);

      console.log(
        `${componentType} ${componentId} has been reset to default settings`
      );
    } catch (error) {
      console.error("Error reverting to defaults:", error);
    }
  };

  return [
    styles,
    setStyles,
    title,
    setTitle,
    content,
    setContent,
    handleRevert,
  ];
};
