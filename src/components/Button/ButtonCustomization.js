import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ToolBox from "./ToolBox";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import ButtonPreview from "./ButtonPreview";
import CodePanel from "./CodePanels";

const ButtonCustomization = () => {
  const { buttonType } = useParams();
  const [activeTab, setActiveTab] = useState("html");
  const buttonDefaults = {
    Primary: {
      backgroundColor: "#6d45ff",
      color: "#ffffff",
      borderWidth: "0px",
      borderColor: "#6d45ff",
      hoverBackgroundColor: "#5a35e0",
      hoverTextColor: "#ffffff",
      hoverBorderColor: "#5a35e0",
      width: "150px",
      height: "40px",
      fontSize: "16px",
      fontWeight: "normal",
      fontFamily: "Arial",
      borderRadius: "5px",
    },
    Outline: {
      backgroundColor: "transparent",
      color: "#6d45ff",
      border: "2px solid #6d45ff",
      borderWidth: "2px",
      borderColor: "#6d45ff",
      hoverBackgroundColor: "transparent",
      hoverTextColor: "#5a35e0",
      hoverBorderColor: "#5a35e0",
      width: "150px",
      height: "40px",
      fontSize: "16px",
      fontWeight: "normal",
      fontFamily: "Arial",
    },
    Link: {
      backgroundColor: "transparent",
      color: "#6d45ff",
      borderWidth: "0px",
      borderColor: "transparent",
      hoverBackgroundColor: "transparent",
      hoverTextColor: "#5a35e0",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "normal",
      fontFamily: "Arial",
    },
  };

  const actualButtonType = buttonType || "Primary";

  const [buttonStyles, setButtonStyles] = useState(
    buttonDefaults[actualButtonType] || buttonDefaults.Primary
  );
  const [buttonText, setButtonText] = useState(`${actualButtonType} Button`);

  useEffect(() => {
    setButtonStyles(buttonDefaults[actualButtonType] || buttonDefaults.Primary);
    setButtonText(`${actualButtonType} Button`);
  }, [actualButtonType]);

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
            {...toolBoxProps}
          />
        }
      />
    </>
  );
};

export default ButtonCustomization;
