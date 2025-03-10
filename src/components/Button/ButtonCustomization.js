import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ToolBox from "./ToolBox";
import CodePanel from './Codepanel'
import "../../styles/Buttons/styles.scss";
import MainContent from "./MainContent";

const ButtonCustomization = () => {
  const { buttonType } = useParams(); 

  const buttonDefaults = {
    primary: {
      backgroundColor: "blue",
      color: "white",
      border: "1px solid blue",
    },
    outline: {
      backgroundColor: "transparent",
      color: "blue",
      border: "2px solid blue",
    },
    link: {
      backgroundColor: "transparent",
      color: "blue",
      border: "none",
      textDecoration: "underline",
    },
  };

  const [buttonStyles, setButtonStyles] = useState(
    buttonDefaults[buttonType] || buttonDefaults.primary
  );

  const [buttonText, setButtonText] = useState("Click Me");


  const getToolBoxProps = () => {
    switch (buttonType ) {
      case "outline":
        return {
          showBackgroundColor: false, 
          showBorderColor: true, 
          showFontStyling: true, 
        };
      case "link":
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
    <div className="customization-container">
      <ToolBox buttonStyles={buttonStyles} setButtonStyles={setButtonStyles} {...toolBoxProps} />
      <MainContent buttonStyles={buttonStyles} buttonText={buttonText} />
      <CodePanel buttonStyles={buttonStyles} buttonText={buttonText} buttonType={buttonType} {...toolBoxProps}/>

    </div>
  );
};

export default ButtonCustomization;
