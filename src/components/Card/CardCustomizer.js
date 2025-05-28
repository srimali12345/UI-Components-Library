import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardPreview from "./CardPreview";
import CardCodePanel from "./CardCodePanel";
import CardToolBox from "./CardToolBox";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import { useComponentCustomization } from "../../contexts/ComponentCustomizationSaveContext";
import { cardDefaults } from "../../constants";
import "../../styles/components/cardCustomization.scss";

const CardCustomization = () => {
  const { cardType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cardType || !cardDefaults[cardType]) {
      navigate("/card");
    }
  }, [cardType, navigate]);

  const actualCardType = cardType || "Basic";
  const defaultTitle = `${actualCardType} Card`;
  const defaultContent = `This is a ${actualCardType} card with sample content.`;

  const [
    cardStyles,
    setCardStyles,
    cardTitle,
    setCardTitle,
    cardContent,
    setCardContent,
    ,
    ,
    handleRevert,
    savingState,
    hasPreviouslySaved,
  ] = useComponentCustomization(
    "card",
    actualCardType,
    cardDefaults[actualCardType],
    defaultTitle,
    defaultContent
  );

  return (
    <CustomizationLayout
      activeTabOnBack="card"
      itemLabel={`Card - ${actualCardType}`}
      savingState={savingState}
      hasPreviouslySaved={hasPreviouslySaved}
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
          onRevert={handleRevert}
        />
      }
    />
  );
};

export default CardCustomization;
