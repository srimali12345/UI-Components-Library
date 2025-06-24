import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { inputTypes } from "./InputList";
import CodeModal from "./InputCodeModel";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import { Search, Heart, Trash2 } from "lucide-react";
import "../../styles/components/inputCustomization.scss";
import { inputDefaults } from "../../constants";
import { useFavorites } from "../../contexts/FavouriteContext";

const InputSelection = ({ inputType }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInputType, setSelectedInputType] = useState("");
  const [selectedInputStyles, setSelectedInputStyles] = useState({});
  const [selectedPlaceholderText, setSelectedPlaceholderText] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const { favorites, removeFavorite } = useFavorites();

  // Apply dynamic styles for all favorites when they change
  useEffect(() => {
    const inputFavorites = favorites.filter(
      (component) =>
        component.type === "Input" || component.componentType === "INPUT"
    );

    // Create styles for all favorites
    inputFavorites.forEach((component) => {
      const savedStyles = component.savedStyles || {};
      const uniqueClassName = `custom-input-favorite-${component.id}`;

      // Remove existing style if it exists
      const existingStyle = document.getElementById(
        `favorite-style-${component.id}`
      );
      if (existingStyle) {
        existingStyle.remove();
      }

      // Create new style
      const customStyle = document.createElement("style");
      customStyle.innerHTML = `
        .${uniqueClassName}::placeholder {
          color: ${savedStyles.placeholderColor || "#999"} !important;
          font-size: ${
            savedStyles.placeholderFontSize || savedStyles.fontSize || "14px"
          } !important;
          opacity: ${savedStyles.placeholderOpacity || "0.7"} !important;
          font-style: ${
            savedStyles.placeholderFontStyle || "normal"
          } !important;
        }
      `;

      customStyle.id = `favorite-style-${component.id}`;
      document.head.appendChild(customStyle);
    });

    // Cleanup function
    return () => {
      inputFavorites.forEach((component) => {
        const styleElement = document.getElementById(
          `favorite-style-${component.id}`
        );
        if (styleElement) {
          styleElement.remove();
        }
      });
    };
  }, [favorites]);

  const handleOpenModal = (type, e) => {
    e.stopPropagation();
    setSelectedInputType(type);
    setModalVisible(true);
    setSelectedInputStyles(inputDefaults[type] || {});
    setSelectedPlaceholderText(`Enter ${type}`);
  };

  const handleInputClick = (type, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/customize-input/${type}`);
  };

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const inputFavorites = favorites.filter(
    (component) =>
      component.type === "Input" || component.componentType === "INPUT"
  );

  const handleCustomizeFavorite = (component) => {
    console.log("Customizing favorite:", component);

    const inputType =
      component.inputType || component.favoriteName?.split(" ")[0] || "Text";
    const placeholder = component.placeholderText || `Enter ${inputType}`;
    const styles = component.savedStyles || {};

    if (inputType) {
      navigate(`/customize-input/${inputType}`, {
        state: {
          fromFavorite: true,
          favoriteId: component.id,
          existingStyles: styles,
          existingPlaceholder: placeholder,
        },
      });
    } else {
      alert("Invalid favorite component data");
    }
  };

  const handleRemoveFavorite = (componentId) => {
    if (window.confirm("Are you sure you want to remove this favorite?")) {
      removeFavorite(componentId);
    }
  };

  const handleShowFavoriteCode = (component) => {
    const inputTypeForCode =
      component.inputType || component.favoriteName?.split(" ")[0] || "Text";
    const placeholderForCode =
      component.placeholderText || `Enter ${inputTypeForCode}`;

    console.log("Showing code for:", {
      inputType: inputTypeForCode,
      placeholder: placeholderForCode,
      styles: component.savedStyles,
    });

    setSelectedInputType(inputTypeForCode);
    setSelectedInputStyles(component.savedStyles || {});
    setSelectedPlaceholderText(placeholderForCode);
    setModalVisible(true);
  };

  const computePadding = (inputType, savedStyles) => {
    if (inputType !== "Search" || !savedStyles.showSearchIcon) {
      return savedStyles.padding || "0px 12px";
    }

    const iconSize = savedStyles.iconSize || 18;
    const iconPadding = iconSize + 10;

    if (savedStyles.iconPosition === "left") {
      return `0px 12px 0px ${iconPadding}px`;
    } else {
      return `0px ${iconPadding}px 0px 12px`;
    }
  };

  const renderFavoritePreview = (component) => {
    const savedStyles = component.savedStyles || {};
    const inputType =
      component.inputType || component.favoriteName?.split(" ")[0] || "Text";
    const placeholderText = component.placeholderText || `Enter ${inputType}`;

    const borderRadius =
      savedStyles.topLeftRadius ||
      savedStyles.topRightRadius ||
      savedStyles.bottomRightRadius ||
      savedStyles.bottomLeftRadius
        ? `${savedStyles.topLeftRadius || "4px"} 
           ${savedStyles.topRightRadius || "4px"} 
           ${savedStyles.bottomRightRadius || "4px"} 
           ${savedStyles.bottomLeftRadius || "4px"}`
        : savedStyles.borderRadius || "4px";

    const inputStyles = {
      width: savedStyles.width || "200px",
      height: savedStyles.height || "40px",
      padding: computePadding(inputType, savedStyles),
      margin: savedStyles.margin || "0",
      backgroundColor: savedStyles.backgroundColor || "#ffffff",
      color: savedStyles.color || "#333333",
      borderWidth: savedStyles.borderWidth || "1px",
      borderStyle: savedStyles.borderStyle || "solid",
      borderColor: savedStyles.borderColor || "#cccccc",
      borderRadius: borderRadius,
      fontSize: savedStyles.fontSize || "14px",
      fontWeight: savedStyles.fontWeight || "normal",
      fontFamily: savedStyles.fontFamily || "Arial",
      display: "block",
      outline: "none",
    };

    const iconStyles = {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      ...(savedStyles.iconPosition === "left"
        ? { left: "12px" }
        : { right: "12px" }),
      color: savedStyles.iconColor || "#8E9196",
      pointerEvents: "none",
    };

    // Create a unique class name for this specific favorite
    const uniqueClassName = `custom-input-favorite-${component.id}`;

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        {inputType === "Search" && savedStyles.showSearchIcon && (
          <Search size={savedStyles.iconSize || 18} style={iconStyles} />
        )}
        <input
          type={
            inputType.toLowerCase() === "search"
              ? "text"
              : inputType.toLowerCase()
          }
          placeholder={placeholderText}
          style={inputStyles}
          className={uniqueClassName}
          readOnly
        />
      </div>
    );
  };

  return (
    <div className="input-dashboard">
      <div
        className="section-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2 className="component-title">
          <strong
            style={{
              cursor: "pointer",
            }}
            onClick={() => setShowFavorites(false)}
          >
            Input Fields
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
            title="View Input favorites"
            className="fav-button"
          >
            <Heart size={16} />
            <span>Favourites ({inputFavorites.length})</span>
          </button>
        )}
      </div>

      {showFavorites ? (
        <div className="favorites-section">
          {inputFavorites.length > 0 ? (
            <div className="input-list">
              {inputFavorites.map((component) => (
                <div key={component.id} className="input-list-wrap">
                  <div className="input-wrap-header">
                    <p className="input-wrap-title">
                      {component.favoriteName ||
                        `${component.inputType || "Input"} Input`}
                    </p>
                  </div>
                  <div className="input-wrap">
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
                        className="input-tool-wrap"
                        title="View code"
                        onClick={() => handleShowFavoriteCode(component)}
                      >
                        <img src={copyIcon} alt="icon" className="input-icon" />
                      </button>
                      <button
                        className="input-tool-wrap"
                        title="Customize styles"
                        onClick={() => handleCustomizeFavorite(component)}
                      >
                        <img src={toolIcon} alt="icon" className="input-icon" />
                      </button>
                      <button
                        className="input-tool-wrap"
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
                No Input Favorites Yet
              </h3>
              <p style={{ margin: 0, color: "#9ca3af" }}>
                Save your customized inputs to see them here.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="input-list">
          {inputTypes.map((input) => (
            <div key={input.type} className="input-list-wrap">
              <p className="input-wrap-title">{input.label}</p>
              <div className="input-wrap">
                {input.type === "Search" && (
                  <Search size={18} className="svg-icon-search" />
                )}
                <input
                  type={input.type.toLowerCase()}
                  className={`dashboard-input ${input.type}`}
                  placeholder={`Enter ${input.type}`}
                  onClick={(e) => handleInputClick(input.type, e)}
                />
                <div className="flex-wrap">
                  <button
                    className="input-tool-wrap"
                    title="View code"
                    onClick={(e) => handleOpenModal(input.type, e)}
                  >
                    <img src={copyIcon} alt="icon" className="input-icon" />
                  </button>
                  <button
                    className="input-tool-wrap"
                    title="Customize styles"
                    onClick={() => {
                      navigate(`/customize-input/${input.type}`, {
                        state: { input },
                      });
                    }}
                  >
                    <img src={toolIcon} alt="icon" className="input-icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalVisible && (
        <CodeModal
          inputType={selectedInputType}
          inputStyles={selectedInputStyles}
          placeholderText={selectedPlaceholderText}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default InputSelection;
