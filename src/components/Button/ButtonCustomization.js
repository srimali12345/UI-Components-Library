import React from "react";
import { useParams } from "react-router-dom";
import ToolBox from "./ToolBox";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import ButtonPreview from "./ButtonPreview";
import CodePanel from "./CodePanels";
import { useComponentCustomization } from "../../contexts/ComponentCustomizationSaveContext";
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
        savingState={savingState}
        hasPreviouslySaved={hasPreviouslySaved}
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
