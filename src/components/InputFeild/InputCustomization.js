import React from "react";
import { useParams } from "react-router-dom";
import InputToolBox from "./InputToolBox";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import InputPreview from "./InputPreview";
import InputCodePanel from "./InputCodePanel";
import { useComponentCustomization } from "../../contexts/ComponentCustomizationSaveContext";
import { inputDefaults } from "../../constants";
const InputCustomization = () => {
  const { inputType } = useParams();
  const actualInputType = inputType || "Text";
  const defaultPlaceholderText = `Enter ${actualInputType}`;

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
  ] = useComponentCustomization(
    "input",
    actualInputType,
    inputDefaults[actualInputType],
    defaultPlaceholderText
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

  return (
    <CustomizationLayout
      activeTabOnBack="input"
      itemLabel={`Input - ${actualInputType}`}
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
          {...toolBoxProps}
        />
      }
    />
  );
};

export default InputCustomization;
