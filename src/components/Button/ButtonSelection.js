import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import { buttonTypes } from "./ButtonList";
import CodeModal from "./CodeModal";
import "../../styles/components/buttonsCustomization.scss";
import { buttonDefaults } from "../../constants";
import { useFavorites } from "../../contexts/FavouriteContext";
import { Heart, Trash2 } from "lucide-react";
import Breadcrumb from "../../commonComponents/Breadcrumb";

const ButtonSelection = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedButtonType, setSelectedButtonType] = useState("");
  const [selectedButtonStyles, setSelectedButtonStyles] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);

  const { favorites, removeFavorite } = useFavorites();

  const handleOpenModal = (type) => {
    setSelectedButtonType(type);
    setModalVisible(true);
    setSelectedButtonStyles(buttonDefaults[type] || {});
  };

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const buttonFavorites = favorites.filter(
    (component) =>
      component.type === "Button" || component.componentType === "BUTTON"
  );

  const handleCustomizeFavorite = (component) => {
    if (component.componentType === "BUTTON" && component.buttonType) {
      navigate(`/customize/${component.buttonType}`, {
        state: {
          fromFavorite: true,
          favoriteId: component.id,
          existingStyles: component.savedStyles || {},
          existingTitle: component.buttonText || component.label || "Button",
        },
      });
    }
  };

  const handleRemoveFavorite = (componentId) => {
    if (window.confirm("Are you sure you want to remove this favorite?")) {
      removeFavorite(componentId);
    }
  };

  const handleShowFavoriteCode = (component) => {
    setSelectedButtonType(component.buttonType || "Primary");
    setSelectedButtonStyles(component.savedStyles || {});
    setModalVisible(true);
  };

  const renderFavoritePreview = (component) => {
    const savedStyles = component.savedStyles || {};

    const borderRadius =
      savedStyles.topLeftRadius ||
      savedStyles.topRightRadius ||
      savedStyles.bottomRightRadius ||
      savedStyles.bottomLeftRadius
        ? `${savedStyles.topLeftRadius || 0} 
           ${savedStyles.topRightRadius || 0} 
           ${savedStyles.bottomRightRadius || 0} 
           ${savedStyles.bottomLeftRadius || 0}`
        : savedStyles.borderRadius || "5px";

    const border =
      component.buttonType === "Primary" && !savedStyles.borderWidth
        ? "none"
        : `${
            savedStyles.borderWidth ||
            (component.buttonType === "Outline" ? "2px" : "0px")
          } solid ${savedStyles.borderColor || "#6d45ff"}`;

    const buttonStyles = {
      ...savedStyles,
      borderRadius: borderRadius,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: border,
      backgroundColor: savedStyles.backgroundColor || "#6d45ff",
      color: savedStyles.color || "#ffffff",
      fontSize: savedStyles.fontSize || "14px",
      fontWeight: savedStyles.fontWeight || "500",
      fontFamily: savedStyles.fontFamily || "inherit",
      height: savedStyles.height || "40px",
      width: savedStyles.width || "150px",
      padding: savedStyles.padding || "8px 16px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textDecoration: savedStyles.textDecoration || "none",
      outline: "none",
    };

    const icon = savedStyles.icon || null;
    const iconPosition = savedStyles.iconPosition || "right";

    return (
      <button style={buttonStyles}>
        {icon && iconPosition === "left" && (
          <img
            src={icon}
            alt="icon"
            style={{
              height: "12px",
              marginRight: "5px",
            }}
          />
        )}

        {component.buttonText ||
          component.label ||
          (component.buttonType
            ? `${component.buttonType} Button`
            : "Default Button")}

        {icon && iconPosition === "right" && (
          <img
            src={icon}
            alt="icon"
            style={{ height: "12px", marginLeft: "5px" }}
          />
        )}
      </button>
    );
  };

  return (
    <div className="button-dashboard">
      <div
        className="section-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <Breadcrumb
          items={[
            {
              label: "Button Components",
              path: "/dashboard", // or current route
              onClick: () => setShowFavorites(false),
            },
            ...(showFavorites
              ? [
                  {
                    label: "Favourites",
                  },
                ]
              : []),
          ]}
        />

        {!showFavorites && (
          <button
            onClick={handleToggleFavorites}
            title="View Button favorites"
            className="fav-button"
          >
            <Heart size={16} />
            <span>Favourites ({buttonFavorites.length})</span>
          </button>
        )}
      </div>

      {showFavorites ? (
        <div className="favorites-section">
          {buttonFavorites.length > 0 ? (
            <div className="button-list">
              {buttonFavorites.map((component) => (
                <div key={component.id} className="btn-list-wrap">
                  <div className="btn-wrap-header">
                    <p className="btn-wrap-title">
                      {component.favoriteName ||
                        `${component.buttonType} Button`}
                    </p>
                  </div>
                  <div className="btn-wrap">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "40px",
                      }}
                    >
                      {renderFavoritePreview(component)}
                    </div>

                    <div className="flex-wrap">
                      <button
                        className="btn-tool-wrap"
                        title="View code"
                        onClick={() => handleShowFavoriteCode(component)}
                      >
                        <img src={copyIcon} alt="icon" className="btn-icon" />
                      </button>
                      <button
                        className="btn-tool-wrap"
                        title="Customize styles"
                        onClick={() => handleCustomizeFavorite(component)}
                      >
                        <img src={toolIcon} alt="icon" className="btn-icon" />
                      </button>
                      <button
                        className="btn-tool-wrap"
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
                No Button Favorites Yet
              </h3>
              <p style={{ margin: 0, color: "#9ca3af" }}>
                Save your customized buttons to see them here.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="button-list">
          {buttonTypes.map((btn) => (
            <div key={btn.type} className="btn-list-wrap">
              <div className="btn-wrap-header">
                <p className="btn-wrap-title">{btn.label}</p>
              </div>
              <div className="btn-wrap">
                <button
                  className={`dashboard-btn ${btn.type}`}
                  onClick={() => navigate(`/customize/${btn.type}`)}
                >
                  {btn.label}
                </button>

                <div className="flex-wrap">
                  <button
                    className="btn-tool-wrap"
                    title="View code"
                    onClick={() => handleOpenModal(btn.type)}
                  >
                    <img src={copyIcon} alt="icon" className="btn-icon" />
                  </button>
                  <button
                    className="btn-tool-wrap"
                    title="Customize styles"
                    onClick={() => navigate(`/customize/${btn.type}`)}
                  >
                    <img src={toolIcon} alt="icon" className="btn-icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalVisible && (
        <CodeModal
          buttonType={selectedButtonType}
          buttonStyles={selectedButtonStyles}
          buttonText={`${selectedButtonType} Button`}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default ButtonSelection;
