import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import { useComponentCustomization } from "../../contexts/ComponentCustomizationSaveContext";
import ToolBox from "./ToolBox";
import CodePanel from "../Button/CodePanels";
import ButtonPreview from "./ButtonPreview";
import { buttonDefaults } from "../../constants";

const ButtonCustomization = () => {
  const { buttonType } = useParams();
  const actualButtonType = buttonType || "Primary";
  const defaultButtonText = `${actualButtonType} Button`;

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
  ] = useComponentCustomization(
    "button",
    actualButtonType,
    buttonDefaults[actualButtonType],
    defaultButtonText
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
        hasUnsavedChanges={true}
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
            {...toolBoxProps}
          />
        }
      />
    </>
  );
};

export default ButtonCustomization;
