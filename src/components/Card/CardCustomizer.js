import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    if (!cardType || !cardDefaults[cardType]) {
      navigate("/card");
    }
  }, [cardType, navigate]);

  const actualCardType = cardType || "Basic";
  const defaultTitle = `${actualCardType} Card`;
  const defaultContent = `This is a ${actualCardType} card with sample content.`;

  // Get data from navigation state (when coming from favorites)
  const navigationState = location.state || {};
  const fromFavorite = navigationState.fromFavorite || false;
  const existingStyles = navigationState.existingStyles || {};
  const existingTitle = navigationState.existingTitle || defaultTitle;
  const existingContent = navigationState.existingContent || defaultContent;

  console.log("CardCustomization - Navigation state:", {
    fromFavorite,
    existingStyles,
    existingTitle,
    existingContent,
  });

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
    hasUnsavedChanges,
    isInitialized,
  ] = useComponentCustomization(
    "card",
    actualCardType,
    cardDefaults[actualCardType],
    existingTitle, // Use existing title from favorites
    existingContent, // Use existing content from favorites
    [], // defaultNavItems
    fromFavorite, // isFromFavorites
    existingStyles, // existingStyles from favorites
    existingTitle, // existingTitle from favorites
    existingContent // existingContent from favorites
  );

  // Show loading state until initialized
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading customization...</div>
      </div>
    );
  }

  return (
    <CustomizationLayout
      activeTabOnBack="card"
      itemLabel={`Card - ${actualCardType}`}
      componentType="card"
      componentId={actualCardType}
      currentStyles={cardStyles}
      currentTitle={cardTitle}
      currentContent={cardContent}
      customLabel={`${actualCardType} Card`}
      hasUnsavedChanges={hasUnsavedChanges}
      onDiscardChanges={handleRevert}
      savingState={savingState}
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
          savingState={savingState}
          hasPreviouslySaved={hasPreviouslySaved}
        />
      }
    />
  );
};

export default CardCustomization;
