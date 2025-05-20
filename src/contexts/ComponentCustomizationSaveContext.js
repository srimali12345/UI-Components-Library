import { useState, useEffect } from "react";

export const useComponentCustomization = (
  componentType,
  componentId,
  defaultStyles,
  defaultText = ""
) => {
  // Create storage keys based on component type and ID
  const stylesStorageKey = `${componentType}-styles-${componentId}`;
  const textStorageKey = `${componentType}-text-${componentId}`;

  // Load saved styles and text from localStorage on component mount
  const getSavedStyles = () => {
    try {
      const savedStyles = localStorage.getItem(stylesStorageKey);
      const savedText = localStorage.getItem(textStorageKey);

      return {
        styles: savedStyles ? JSON.parse(savedStyles) : defaultStyles,
        text: savedText || defaultText,
      };
    } catch (error) {
      console.error("Error loading saved styles:", error);
      return {
        styles: defaultStyles,
        text: defaultText,
      };
    }
  };

  const savedData = getSavedStyles();
  const [styles, setStyles] = useState(savedData.styles);
  const [text, setText] = useState(savedData.text);

  // Save changes to localStorage whenever they update
  useEffect(() => {
    try {
      localStorage.setItem(stylesStorageKey, JSON.stringify(styles));
    } catch (error) {
      console.error("Error saving styles to localStorage:", error);
    }
  }, [styles, stylesStorageKey]);

  useEffect(() => {
    if (text) {
      try {
        localStorage.setItem(textStorageKey, text);
      } catch (error) {
        console.error("Error saving text to localStorage:", error);
      }
    }
  }, [text, textStorageKey]);

  // Revert function to restore default settings
  const handleRevert = () => {
    try {
      // Clear saved styles from localStorage
      localStorage.removeItem(stylesStorageKey);
      localStorage.removeItem(textStorageKey);

      // Reset to default styles and text
      setStyles(defaultStyles);
      setText(defaultText);

      console.log(
        `${componentType} ${componentId} has been reset to default styling`
      );
    } catch (error) {
      console.error("Error reverting to default styles:", error);
    }
  };

  return [styles, setStyles, text, setText, handleRevert];
};
