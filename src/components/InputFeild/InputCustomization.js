import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import InputPreview from "./InputPreview";
import InputCodePanel from "./InputCodePanel";
import InputToolBox from "./InputToolBox";

const InputCustomization = () => {
  const { inputType } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("html");

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

  // Validate inputType and redirect if invalid
  useEffect(() => {
    if (!inputType || !inputDefaults[inputType]) {
      navigate("/input");
    }
  }, [inputType, navigate]);

  const actualInputType = inputType || "Text";
  const [inputStyles, setInputStyles] = useState(
    inputDefaults[actualInputType] || inputDefaults.Text
  );
  const [placeholderText, setPlaceholderText] = useState(
    `Enter ${actualInputType}`
  );

  useEffect(() => {
    if (inputDefaults[actualInputType]) {
      setInputStyles(inputDefaults[actualInputType]);
      setPlaceholderText(`Enter ${actualInputType}`);
    }
  }, [actualInputType]);

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
        />
      }
    />
  );
};

export default InputCustomization;
