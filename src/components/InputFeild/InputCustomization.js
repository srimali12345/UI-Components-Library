import React from "react";
import { useParams, useLocation } from "react-router-dom";
import InputToolBox from "./InputToolBox";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import InputPreview from "./InputPreview";
import InputCodePanel from "./InputCodePanel";
import { useComponentCustomization } from "../../contexts/ComponentCustomizationSaveContext";
import { inputDefaults } from "../../constants";

const InputCustomization = () => {
  const { inputType } = useParams();
  const location = useLocation();

  const actualInputType = inputType || "Text";
  const defaultPlaceholderText = `Enter ${actualInputType}`;

  // Handle favorites
  const navigationState = location.state || {};
  const fromFavorite = navigationState.fromFavorite || false;
  const existingStyles = navigationState.existingStyles || {};
  const existingTitle = navigationState.existingTitle || defaultPlaceholderText;

  console.log("InputCustomization - Navigation state:", {
    fromFavorite,
    existingStyles,
    existingTitle,
  });

  const [
    inputStyles,
    setInputStyles,
    placeholderText,
    setPlaceholderText,
    ,
    ,
    ,
    ,
    handleRevert,
    savingState,
    hasPreviouslySaved,
    hasUnsavedChanges,
    isInitialized,
  ] = useComponentCustomization(
    "input",
    actualInputType,
    inputDefaults[actualInputType],
    defaultPlaceholderText,
    "", // defaultContent
    [], // defaultNavItems
    fromFavorite,
    existingStyles,
    existingTitle
  );

  const getToolBoxProps = () => {
    switch (actualInputType) {
      case "Search":
        return {
          showBackgroundColor: true,
          showBorderColor: true,
          showFontStyling: true,
          showIconSettings: true,
        };
      default:
        return {
          showBackgroundColor: true,
          showBorderColor: true,
          showFontStyling: true,
        };
    }
  };

  const toolBoxProps = getToolBoxProps();

  // Show loading state until initialized
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading customization...</div>
      </div>
    );
  }

  return (
    <CustomizationLayout
      activeTabOnBack="input"
      itemLabel={`INP1 - ${actualInputType} Input`}
      componentType="input"
      componentId={actualInputType}
      currentStyles={inputStyles}
      currentTitle={placeholderText}
      customLabel={`${actualInputType} Input`}
      hasUnsavedChanges={hasUnsavedChanges}
      onDiscardChanges={handleRevert}
      savingState={savingState}
      hasPreviouslySaved={hasPreviouslySaved}
      mainContent={
        <InputPreview
          inputStyles={inputStyles}
          placeholderText={placeholderText}
          inputType={actualInputType}
        />
      }
      codePanel={
        <InputCodePanel
          inputStyles={inputStyles}
          placeholderText={placeholderText}
          inputType={actualInputType}
        />
      }
      toolBox={
        <InputToolBox
          inputStyles={inputStyles}
          setInputStyles={setInputStyles}
          placeholderText={placeholderText}
          setPlaceholderText={setPlaceholderText}
          inputType={actualInputType}
          onRevert={handleRevert}
          savingState={savingState}
          hasPreviouslySaved={hasPreviouslySaved}
          {...toolBoxProps}
        />
      }
    />
  );
};

export default InputCustomization;
