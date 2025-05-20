import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InputToolBox from "./InputToolBox";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import InputPreview from "./InputPreview";
import InputCodePanel from "./InputCodePanel";
import { useComponentCustomization } from "../../contexts/ComponentCustomizationSaveContext";

const InputCustomization = () => {
  const { inputType } = useParams();
  const actualInputType = inputType || "Text";

  const inputDefaults = {
    Text: {
      backgroundColor: "#ffffff",
      color: "#333333",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#cccccc",
      focusBorderColor: "#6d45ff",
      width: "200px",
      height: "40px",
      fontSize: "14px",
      fontWeight: "normal",
      fontFamily: "Arial",
      borderRadius: "4px",
      padding: "0px 12px",
      display: "block",
      placeholderColor: "#999999",
      placeholderFontSize: "14px",
      placeholderOpacity: "0.7",
      placeholderFontStyle: "normal",
    },
    Password: {
      backgroundColor: "#ffffff",
      color: "#333333",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#cccccc",
      focusBorderColor: "#6d45ff",
      width: "200px",
      height: "40px",
      fontSize: "14px",
      fontWeight: "normal",
      fontFamily: "Arial",
      borderRadius: "4px",
      padding: "0px 12px",
      display: "block",
      placeholderColor: "#999999",
      placeholderFontSize: "14px",
      placeholderOpacity: "0.7",
      placeholderFontStyle: "normal",
    },
    Search: {
      backgroundColor: "#ffffff",
      color: "#333333",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#cccccc",
      focusBorderColor: "#6d45ff",
      width: "200px",
      height: "40px",
      fontSize: "14px",
      fontWeight: "normal",
      fontFamily: "Arial",
      borderRadius: "20px",
      padding: "0px 12px",
      display: "block",
      placeholderColor: "#999999",
      placeholderFontSize: "14px",
      placeholderOpacity: "0.7",
      placeholderFontStyle: "normal",
      showSearchIcon: true,
      iconPosition: "right",
      iconSize: 18,
      iconColor: "#8E9196",
    },
  };

  const defaultPlaceholderText = `Enter ${actualInputType}`;

  const [
    inputStyles,
    setInputStyles,
    placeholderText,
    setPlaceholderText,
    handleRevert,
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
