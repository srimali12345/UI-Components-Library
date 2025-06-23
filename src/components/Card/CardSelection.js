import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import { cardTypes } from "./CardList";
import CardCodeModal from "./CardCodeModal";
import { cardDefaults } from "../../constants";
import { useFavorites } from "../../contexts/FavouriteContext";
import { Heart, Trash2 } from "lucide-react";

const CardSelection = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCardType, setSelectedCardType] = useState("");
  const [selectedCardStyles, setSelectedCardStyles] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);

  const { favorites, removeFavorite } = useFavorites();

  const cardFavorites = favorites.filter(
    (component) =>
      component.type === "Card" || component.componentType === "CARD"
  );

  const handleToggleFavorites = () => setShowFavorites(!showFavorites);

  const handleShowFavoriteCode = (component) => {
    setSelectedCardType(component.cardType || "Basic");
    setSelectedCardStyles(component.savedStyles || {});
    setModalVisible(true);
  };

  const handleCustomizeFavorite = (component) => {
    navigate(`/customize-card/${component.cardType}`, {
      state: {
        fromFavorite: true,
        favoriteId: component.id,
        existingStyles: component.savedStyles || {},
        existingTitle: component.cardTitle || component.label || "Card",
      },
    });
  };

  const handleRemoveFavorite = (componentId) => {
    if (window.confirm("Are you sure you want to remove this favorite?")) {
      removeFavorite(componentId);
    }
  };

  const handleOpenModal = (type, e) => {
    e.stopPropagation();
    setSelectedCardType(type);
    setModalVisible(true);
    setSelectedCardStyles(cardDefaults[type] || {});
  };

  const renderFavoritePreview = (component) => {
    const savedStyles = component.savedStyles || {};
    const type = component.cardType;

    const isImageCard = type === "Image";
    const isActionCard = type === "Action";
    const isPricingCard = type === "Pricing";
    const isBasicCard = type === "Basic";

    const cardStyle = {
      width: savedStyles.width || "200px",
      minHeight: savedStyles.minHeight || "150px",
      backgroundColor: savedStyles.backgroundColor || "#ffffff",
      color: savedStyles.textColor || "#333333",
      borderWidth: savedStyles.borderWidth || "1px",
      borderStyle: savedStyles.borderStyle || "solid",
      borderColor: savedStyles.borderColor || "#e0e0e0",
      borderRadius:
        savedStyles.topLeftRadius ||
        savedStyles.topRightRadius ||
        savedStyles.bottomRightRadius ||
        savedStyles.bottomLeftRadius
          ? `${savedStyles.topLeftRadius || "8px"} 
             ${savedStyles.topRightRadius || "8px"} 
             ${savedStyles.bottomRightRadius || "8px"} 
             ${savedStyles.bottomLeftRadius || "8px"}`
          : savedStyles.borderRadius || "8px",
      boxShadow: savedStyles.boxShadow || "0 2px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      transition: "all 0.3s ease",
      position: "relative",
      margin: "0 auto",
      display: isBasicCard ? "flex" : "block",
      flexDirection: isBasicCard ? "column" : "initial",
    };

    const headerStyle = isBasicCard
      ? {
          padding: "12px",
          borderBottom: `1px solid ${savedStyles.borderColor || "#e0e0e0"}`,
          fontWeight: "bold",
          fontSize: "12px",
        }
      : {};

    const footerStyle = isBasicCard
      ? {
          padding: "12px",
          borderTop: `1px solid ${savedStyles.borderColor || "#e0e0e0"}`,
          fontSize: "10px",
          color: "#8E9196",
        }
      : {};

    const imageStyle = {
      height: savedStyles.imageHeight || "100px",
      width: "100%",
      backgroundColor: "#e9e9e9",
      backgroundImage:
        "url('https://source.unsplash.com/random/300x200/?nature')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };

    const bodyStyle = {
      padding: savedStyles.padding || "12px",
      color: savedStyles.textColor || "#333333",
      flex: isBasicCard ? "1" : "initial",
    };

    const titleStyle = {
      fontSize: savedStyles.titleFontSize || "14px",
      fontWeight: savedStyles.titleFontWeight || "bold",
      color: savedStyles.titleColor || "#000000",
      marginTop: 0,
      marginBottom: "8px",
      fontFamily: savedStyles.fontFamily || "Arial, sans-serif",
    };

    const contentStyle = {
      fontSize: savedStyles.contentFontSize || "12px",
      lineHeight: savedStyles.contentLineHeight || "1.5",
      marginBottom: isActionCard || isPricingCard ? "10px" : "0",
      fontFamily: savedStyles.fontFamily || "Arial, sans-serif",
    };

    const buttonStyle = {
      padding: "6px 12px",
      border: "none",
      borderRadius: "4px",
      backgroundColor: savedStyles.buttonBackgroundColor || "#f1f1f1",
      color: savedStyles.buttonTextColor || "#333333",
      cursor: "pointer",
      fontSize: "10px",
    };

    const primaryButtonStyle = {
      ...buttonStyle,
      backgroundColor: savedStyles.primaryButtonBackgroundColor || "#4a6cf7",
      color: savedStyles.primaryButtonTextColor || "#ffffff",
    };

    return (
      <div style={cardStyle}>
        {isBasicCard && (
          <div style={headerStyle}>{savedStyles.headerText || "Header"}</div>
        )}
        {isImageCard && <div style={imageStyle} />}
        <div style={bodyStyle}>
          <h3 style={titleStyle}>{component.cardTitle || `${type} Card`}</h3>
          <p style={contentStyle}>
            {component.cardContent ||
              `This is a ${type} card with sample content.`}
          </p>
          {(isActionCard || isPricingCard) && (
            <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
              <button style={buttonStyle}>Learn More</button>
              {isPricingCard && (
                <button style={primaryButtonStyle}>Get Started</button>
              )}
            </div>
          )}
        </div>
        {isBasicCard && (
          <div style={footerStyle}>{savedStyles.footerText || "Footer"}</div>
        )}
      </div>
    );
  };

  return (
    <div className="card-dashboard">
      <div
        className="section-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="component-title">
          <strong
            style={{ cursor: "pointer" }}
            onClick={() => setShowFavorites(false)}
          >
            Card Components
          </strong>
          {showFavorites && (
            <span
              className="favourite-link"
              style={{
                marginLeft: "5px",
                fontWeight: "normal",
                cursor: "pointer",
              }}
            >
              /Favourites
            </span>
          )}
        </h2>

        {!showFavorites && (
          <button
            onClick={handleToggleFavorites}
            title="View Card favorites"
            className="fav-button"
          >
            <Heart size={16} />
            <span>Favourites ({cardFavorites.length})</span>
          </button>
        )}
      </div>

      {showFavorites ? (
        <div className="favorites-section">
          {cardFavorites.length > 0 ? (
            <div className="card-grid">
              {cardFavorites.map((component) => (
                <div key={component.id} className="card-list-wrap">
                  <div className="card-wrap-header">
                    <p className="card-wrap-title">
                      {component.favoriteName || `${component.cardType} Card`}
                    </p>
                  </div>
                  <div className="card-wrap">
                    {renderFavoritePreview(component)}
                    <div className="flex-wrap">
                      <button
                        className="card-tool-wrap"
                        title="View code"
                        onClick={() => handleShowFavoriteCode(component)}
                      >
                        <img src={copyIcon} alt="icon" className="input-icon" />
                      </button>
                      <button
                        className="card-tool-wrap"
                        title="Customize styles"
                        onClick={() => handleCustomizeFavorite(component)}
                      >
                        <img src={toolIcon} alt="icon" className="input-icon" />
                      </button>
                      <button
                        className="card-tool-wrap"
                        title="Remove from favorites"
                        onClick={() => handleRemoveFavorite(component.id)}
                        style={{ backgroundColor: "#fee2e2" }}
                      >
                        <Trash2 size={16} color="#dc2626" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            >
              <Heart
                size={48}
                color="#d1d5db"
                style={{ marginBottom: "1rem" }}
              />
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#6b7280" }}>
                No Card Favorites Yet
              </h3>
              <p style={{ margin: 0, color: "#9ca3af" }}>
                Save your customized cards to see them here.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="card-grid">
          {cardTypes.map((card) => (
            <div key={card.type} className="card-list-wrap">
              <p className="card-wrap-title">{card.label}</p>
              <div className="card-wrap">
                {renderFavoritePreview({ cardType: card.type })}
                <div className="flex-wrap">
                  <button
                    className="card-tool-wrap"
                    title="View code"
                    onClick={(e) => handleOpenModal(card.type, e)}
                  >
                    <img
                      src={copyIcon}
                      alt="code icon"
                      className="input-icon"
                    />
                  </button>
                  <button
                    className="card-tool-wrap"
                    title="Customize styles"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/customize-card/${card.type}`, {
                        state: { card },
                      });
                    }}
                  >
                    <img
                      src={toolIcon}
                      alt="tool icon"
                      className="input-icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalVisible && (
        <CardCodeModal
          cardType={selectedCardType}
          cardStyles={selectedCardStyles}
          cardTitle={`${selectedCardType} Card`}
          cardContent={`This is a ${selectedCardType} card with sample content.`}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default CardSelection;
