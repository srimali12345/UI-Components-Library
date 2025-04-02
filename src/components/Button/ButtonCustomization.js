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
      backgroundColor: "#3E41FF",
      color: "white",
      border: "1px solid #3E41FF",
      hoverBackgroundColor: "#2a2cd7",
      hoverTextColor: "white",
      hoverBorderColor: "blue",
    },
    Outline: {
      backgroundColor: "transparent",
      color: "#3E41FF",
      border: "2px solid #3E41FF",
      hoverBorderColor: "blue",
      hoverTextColor: "#3E41FF",
    },
    Link: {
      backgroundColor: "transparent",
      color: "#3E41FF",
      border: "none",
      hoverTextColor: "#2a2cd7",
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
