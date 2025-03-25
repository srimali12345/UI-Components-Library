import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ToolBox from "./ToolBox";
import CodePanel from "./Codepanel";
import "../../styles/components/buttons.scss";
import MainContent from "./MainContent";

const ButtonCustomization = () => {
  const { buttonType } = useParams();

  const buttonDefaults = {
    Primary: {
      backgroundColor: "blue",
      color: "white",
      border: "1px solid blue",
    },
    Outline: {
      backgroundColor: "transparent",
      color: "blue",
      border: "2px solid blue",
    },
    Link: {
      backgroundColor: "transparent",
      color: "blue",
      border: "none",
      textDecoration: "underline",
    },
  };

  const [buttonStyles, setButtonStyles] = useState(
    buttonDefaults[buttonType] 
  );

  const [buttonText, setButtonText] = useState( buttonType ? `${buttonType} Button` : "Default Button");

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
    <div >
     <div className="customization-container">
     <MainContent buttonStyles={buttonStyles} buttonText={buttonText} buttonType={buttonType}/>
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
    
      <div>
      <CodePanel
        buttonStyles={buttonStyles}
        buttonText={buttonText}
        buttonType={buttonType}
        {...toolBoxProps}
      />
      </div>
    
    </div>
  );
};

export default ButtonCustomization;
