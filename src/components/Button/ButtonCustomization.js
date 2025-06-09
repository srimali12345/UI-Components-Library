import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import { useComponentCustomization } from "../../contexts/ComponentCustomizationSaveContext";
import ToolBox from "./ToolBox";
import CodePanel from "../Button/CodePanels";
import ButtonPreview from "./ButtonPreview";
import { buttonDefaults } from "../../constants";

const ButtonCustomization = () => {
  const { buttonType } = useParams();
  const location = useLocation();
  const actualButtonType = buttonType || "Primary";
  const defaultButtonText = `${actualButtonType} Button`;

  // Get data from navigation state (when coming from favorites)
  const navigationState = location.state || {};
  const fromFavorite = navigationState.fromFavorite || false;
  const existingStyles = navigationState.existingStyles || {};
  const existingTitle = navigationState.existingTitle || defaultButtonText;

  console.log("ButtonCustomization - Navigation state:", {
    fromFavorite,
    existingStyles,
    existingTitle
  });

  const [
    buttonStyles,
    setButtonStyles,
    buttonText,
    setButtonText,
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
    "button",
    actualButtonType,
    buttonDefaults[actualButtonType],
    defaultButtonText,
    "", // defaultContent
    [], // defaultNavItems
    fromFavorite, // isFromFavorites
    existingStyles, // existingStyles from favorites
    existingTitle // existingTitle from favorites
  );

  const getToolBoxProps = () => {
    switch (actualButtonType) {
      case "Outline":
        return {
          showBackgroundColor: false,
          showBorderColor: true,
          showFontStyling: true,
        };
      case "Link":
        return {
          showBackgroundColor: false,
          showBorderColor: false,
          showFontStyling: true,
          showUnderline: true,
        };
      default:
        return {
          showBackgroundColor: true,
          showBorderColor: true,
          showFontStyling: true,
          showUnderline: false,
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
    <>
      <CustomizationLayout
        activeTabOnBack="buttons"
        itemLabel={`BTN1 - ${buttonType || "Primary"} Button`}
        componentType="button"
        componentId={actualButtonType}
        currentStyles={buttonStyles}
        currentTitle={buttonText}
        customLabel={`${actualButtonType} Button`}
        hasUnsavedChanges={hasUnsavedChanges()}
        savingState={savingState}
        mainContent={
          <ButtonPreview
            buttonStyles={buttonStyles}
            buttonText={buttonText}
            buttonType={buttonType}
          />
        }
        codePanel={
          <CodePanel
            buttonText={buttonText}
            buttonType={buttonType}
            buttonStyles={buttonStyles}
          />
        }
        toolBox={
          <ToolBox
            buttonStyles={buttonStyles}
            setButtonStyles={setButtonStyles}
            buttonText={buttonText}
            setButtonText={setButtonText}
            buttonType={actualButtonType}
            onRevert={handleRevert}
            savingState={savingState}
            hasPreviouslySaved={hasPreviouslySaved}
            {...toolBoxProps}
          />
        }
      />
    </>
  );
};

export default ButtonCustomization;
