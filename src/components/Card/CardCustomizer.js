import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardPreview from "./CardPreview";
import CardCodePanel from "./CardCodePanel";
import CardToolBox from "./CardToolBox";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import "../../styles/components/cardCustomization.scss";

const CardCustomization = () => {
  const { cardType } = useParams();
  const navigate = useNavigate();

  const cardDefaults = {
    Basic: {
      backgroundColor: "#ffffff",
      textColor: "#333333",
      titleColor: "#000000",
      width: "300px",
      minHeight: "200px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#e0e0e0",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      titleFontSize: "18px",
      titleFontWeight: "bold",
      contentFontSize: "14px",
      contentLineHeight: "1.5",
      borderRadius: "8px",
      hoverEffect: "shadow",
    },
    Image: {
      backgroundColor: "#ffffff",
      textColor: "#333333",
      titleColor: "#000000",
      width: "300px",
      minHeight: "200px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#e0e0e0",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      titleFontSize: "18px",
      titleFontWeight: "bold",
      contentFontSize: "14px",
      contentLineHeight: "1.5",
      borderRadius: "8px",
      imageHeight: "200px",
      hoverEffect: "shadow",
    },
    ImageOverlay: {
      backgroundColor: "transparent",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      width: "300px",
      minHeight: "200px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "transparent",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      titleFontSize: "20px",
      titleFontWeight: "bold",
      contentFontSize: "14px",
      contentLineHeight: "1.5",
      borderRadius: "8px",
      imageHeight: "300px",
      overlayColor: "rgba(0, 0, 0, 0.4)",
      hoverEffect: "shadow",
    },
    Action: {
      backgroundColor: "#ffffff",
      textColor: "#333333",
      titleColor: "#000000",
      width: "300px",
      minHeight: "200px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#e0e0e0",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      titleFontSize: "18px",
      titleFontWeight: "bold",
      contentFontSize: "14px",
      contentLineHeight: "1.5",
      borderRadius: "8px",
      buttonBackgroundColor: "#f1f1f1",
      buttonTextColor: "#333333",
      hoverEffect: "shadow",
    },
    Pricing: {
      backgroundColor: "#ffffff",
      textColor: "#333333",
      titleColor: "#000000",
      width: "300px",
      minHeight: "200px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#e0e0e0",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      titleFontSize: "18px",
      titleFontWeight: "bold",
      contentFontSize: "14px",
      contentLineHeight: "1.5",
      borderRadius: "8px",
      buttonBackgroundColor: "#f1f1f1",
      buttonTextColor: "#333333",
      primaryButtonBackgroundColor: "#4a6cf7",
      primaryButtonTextColor: "#ffffff",
      hoverEffect: "shadow",
    },
  };

  useEffect(() => {
    if (!cardType || !cardDefaults[cardType]) {
      navigate("/card");
    }
  }, [cardType, navigate]);

  const actualCardType = cardType || "Basic";
  const [cardStyles, setCardStyles] = useState(
    cardDefaults[actualCardType] || cardDefaults.Basic
  );
  const [cardTitle, setCardTitle] = useState(`${actualCardType} Card `);
  const [cardContent, setCardContent] = useState(`This is a ${actualCardType} card with sample content.`);

  useEffect(() => {
    if (cardDefaults[actualCardType]) {
      setCardStyles(cardDefaults[actualCardType]);
      setCardTitle(`${actualCardType} Card`);
      setCardContent(`This is a ${actualCardType} card with sample content.`);
    }
  }, [actualCardType]);

  return (
    <CustomizationLayout
      activeTabOnBack="card"
      itemLabel={`Card - ${actualCardType}`}
      mainContent={
        <CardPreview
          cardStyles={cardStyles}
          cardTitle={cardTitle}
          cardContent={cardContent}
          cardType={actualCardType}
        />
      }
      codePanel={
        <CardCodePanel
          cardStyles={cardStyles}
          cardTitle={cardTitle}
          cardContent={cardContent}
          cardType={actualCardType}
        />
      }
      toolBox={
        <CardToolBox
          cardStyles={cardStyles}
          setCardStyles={setCardStyles}
          cardTitle={cardTitle}
          setCardTitle={setCardTitle}
          cardContent={cardContent}
          setCardContent={setCardContent}
          cardType={actualCardType}
        />
      }
    />
  );
};

export default CardCustomization;
