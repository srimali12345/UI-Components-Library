import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ToolBox from "./ToolBox";
import CodePanel from "./Codepanel";
import "../../styles/components/buttonsCustomization.scss";
import MainContent from "./MainContent";

const ButtonCustomization = () => {
  const { buttonType } = useParams();

  const buttonDefaults = {
    Primary: {
      backgroundColor: "#6d45ff",
      color: "#ffffff",
      border: "1px solid #6d45ff",
      hoverBackgroundColor: "#5a35e0",
      hoverTextColor: "#ffffff",
      hoverBorderColor: "#5a35e0",
    },
    Outline: {
      backgroundColor: "transparent",
      color: "#6d45ff",
      border: "2px solid #6d45ff",
      hoverBorderColor: "#5a35e0",
      hoverTextColor: "#5a35e0",
    },
    Link: {
      backgroundColor: "transparent",
      color: "#6d45ff",
      border: "none",
      hoverTextColor: "#5a35e0",
    },
  };

  const [buttonStyles, setButtonStyles] = useState(buttonDefaults[buttonType]);

  const [buttonText, setButtonText] = useState(
    buttonType ? `${buttonType} Button` : "Default Button"
  );

  const getToolBoxProps = () => {
    switch (buttonType) {
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
    <div className="main-custom-wrap">
      <div className="customization-container">
        <MainContent
          buttonStyles={buttonStyles}
          buttonText={buttonText}
          buttonType={buttonType}
          setButtonStyles={setButtonStyles}
          {...toolBoxProps}
        />
        <CodePanel
          buttonStyles={buttonStyles}
          buttonText={buttonText}
          buttonType={buttonType}
          {...toolBoxProps}
        />
      </div>
      <ToolBox
        buttonStyles={buttonStyles}
        setButtonStyles={setButtonStyles}
        {...toolBoxProps}
        buttonText={buttonText}
        showUploadIcon={true}
        setButtonText={setButtonText}
        buttonType={buttonType}
      />
    </div>
  );
};

export default ButtonCustomization;
