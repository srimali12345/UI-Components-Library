import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavouriteContext";
import { Heart, Trash2 } from "lucide-react";
import "../styles/pages/favourite.scss";

const Favorites = () => {
  const navigate = useNavigate();
  const favoritesContext = useFavorites();
  const [activeCategory, setActiveCategory] = useState("Buttons");
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [activeCodeTab, setActiveCodeTab] = useState("html");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!favoritesContext) {
    return (
      <div className="favorites-page">
        <div className="favorites-content">
          <div className="main-content">
            <h2 className="content-title">Favourites</h2>
            <div className="empty-state">
              <p>Loading favorites...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { favorites, removeFavorite, clearAllFavorites } = favoritesContext;

  const categories = [
    "Buttons",
    "Cards",
    "Forms",
    "Themes",
    "Login",
    "Navigation",
  ];

  const filteredFavorites = favorites.filter((component) => {
    if (activeCategory === "Buttons")
      return (
        component.type === "Button" || component.componentType === "BUTTON"
      );
    if (activeCategory === "Cards")
      return component.type === "Card" || component.componentType === "CARD";
    if (activeCategory === "Forms")
      return component.type === "Forms" || component.componentType === "FORM";
    if (activeCategory === "Navigation")
      return (
        component.type === "Navigation" || component.componentType === "NAV"
      );
    if (activeCategory === "Login")
      return component.type === "Login" || component.componentType === "LOGIN";
    if (activeCategory === "Themes")
      return component.type === "Themes" || component.componentType === "THEME";
    return component.type === activeCategory;
  });

  const handleShowCode = (component) => {
    setSelectedComponent(component);
    setShowCodeModal(true);
    setActiveCodeTab("html");
  };

  const handleCustomizeComponent = (component) => {
    console.log("Customizing component:", component);

    // Pass the complete favorite data when navigating to customize
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
    if (component.componentType === "CARD" && component.cardType) {
      navigate(`/customize-card/${component.cardType}`, {
        state: {
          fromFavorite: true,
          favoriteId: component.id,
          existingStyles: component.savedStyles || {},
          existingTitle: component.cardTitle || "Card Title",
          existingContent: component.cardContent || "Card content...",
        },
      });
    }
    if (component.componentType === "FORM" && component.formType) {
      navigate(`/customize/form/${component.formType}`, {
        state: {
          fromFavorite: true,
          favoriteId: component.id,
          existingStyles: component.savedStyles || {},
        },
      });
    }
  };

  const handleRemoveFavorite = (componentId) => {
    if (window.confirm("Are you sure you want to remove this favorite?")) {
      removeFavorite(componentId);
    }
  };

  const handleClearAll = () => {
    setShowClearConfirm(true);
  };

  const confirmClearAll = () => {
    clearAllFavorites();
    setShowClearConfirm(false);
  };

  const renderComponentPreview = (component) => {
    const baseStyles = component.savedStyles || {};

    switch (component.componentType) {
      case "BUTTON":
        const buttonStyles = {
          backgroundColor: baseStyles.backgroundColor || "#6d45ff",
          color: baseStyles.color || "#ffffff",
          border: baseStyles.border || "none",
          borderRadius: baseStyles.borderRadius || "4px",
          fontSize: baseStyles.fontSize || "14px",
          fontWeight: baseStyles.fontWeight || "500",
          height: baseStyles.height || "40px",
          width: baseStyles.width || "150px",
          padding: "8px 16px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          borderColor: baseStyles.borderColor,
          borderWidth: baseStyles.borderWidth,
          textDecoration: baseStyles.textDecoration || "none",
          textTransform: baseStyles.textTransform || "none",
          letterSpacing: baseStyles.letterSpacing || "normal",
          boxShadow: baseStyles.boxShadow,
          outline: "none",
        };

        return (
          <div className="component-display">
            <div className="preview-button">
              <button style={buttonStyles}>
                {component.buttonText || component.label || "Button"}
              </button>
            </div>
          </div>
        );

      case "CARD":
        return (
          <div className="component-display">
            <div
              className="preview-component"
              style={{
                backgroundColor: baseStyles.backgroundColor || "#ffffff",
                border: `${baseStyles.borderWidth || "1px"} solid ${
                  baseStyles.borderColor || "#e0e0e0"
                }`,
                borderRadius: baseStyles.borderRadius || "8px",
                padding: baseStyles.padding || "16px",
                boxShadow:
                  baseStyles.boxShadow || "0 2px 8px rgba(0, 0, 0, 0.1)",
                color: baseStyles.textColor || "#333333",
                fontFamily: baseStyles.fontFamily || "Arial, sans-serif",
                maxWidth: "200px",
                textAlign: "center",
              }}
            >
              <h4
                style={{
                  fontSize: baseStyles.titleFontSize || "16px",
                  color: baseStyles.titleColor || "#000000",
                  margin: "0 0 8px 0",
                }}
              >
                {component.cardTitle || "Card Title"}
              </h4>
              <p
                style={{
                  fontSize: baseStyles.contentFontSize || "12px",
                  margin: "0",
                }}
              >
                {component.cardContent || "Card content..."}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="component-display">
            <div className="preview-component" style={baseStyles}>
              {component.buttonText || component.label || "Component"}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="favorites-page">
      <div className="favorites-content">
        <div className="sidebar">
          <div className="sidebar-section">
            <h3>Favourites</h3>
            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-item ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="content-header">
            <h2 className="content-title">Favourites</h2>
            {favorites.length > 0 && (
              <button className="clear-all-btn" onClick={handleClearAll}>
                <Trash2 size={16} />
                Clear All
              </button>
            )}
          </div>

          {filteredFavorites.length > 0 ? (
            <div className="favorites-grid">
              {filteredFavorites.map((component) => (
                <div key={component.id} className="favorite-card">
                  <div className="card-header">
                    <span className="card-title">{component.favoriteName}</span>
                    <button
                      className="remove-favorite-btn"
                      title="Remove from favorites"
                      onClick={() => handleRemoveFavorite(component.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="card-preview">
                    {renderComponentPreview(component)}
                  </div>
                  <div className="card-actions">
                    <button
                      className="action-icon"
                      title="View code"
                      onClick={() => handleShowCode(component)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="16,18 22,12 16,6"></polyline>
                        <polyline points="8,6 2,12 8,18"></polyline>
                      </svg>
                    </button>
                    <button
                      className="action-icon"
                      title="Customize styles"
                      onClick={() => handleCustomizeComponent(component)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No {activeCategory.toLowerCase()} saved in favorites yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Code Modal */}
      {showCodeModal && selectedComponent && (
        <div
          className="code-modal-overlay"
          onClick={() => setShowCodeModal(false)}
        >
          <div
            className="code-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="code-modal-header">
              <h3>Generated Code - {selectedComponent.favoriteName}</h3>
              <button onClick={() => setShowCodeModal(false)}>×</button>
            </div>
            <div className="code-modal-body">
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {["html", "css", "scss"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveCodeTab(tab)}
                      style={{
                        padding: "8px 16px",
                        background:
                          activeCodeTab === tab ? "#3b82f6" : "transparent",
                        color: activeCodeTab === tab ? "white" : "#64748b",
                        border: "none",
                        borderRadius: "4px 4px 0 0",
                        cursor: "pointer",
                        textTransform: "uppercase",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="code-section">
                <div className="code-container">
                  <pre>
                    <code>
                      {activeCodeTab === "html" &&
                        (selectedComponent.savedCode?.html ||
                          "No HTML code available")}
                      {activeCodeTab === "css" &&
                        (selectedComponent.savedCode?.css ||
                          "No CSS code available")}
                      {activeCodeTab === "scss" &&
                        (selectedComponent.savedCode?.scss ||
                          "No SCSS code available")}
                    </code>
                  </pre>
                  <button
                    className="copy-code-btn"
                    onClick={() => {
                      const code =
                        activeCodeTab === "html"
                          ? selectedComponent.savedCode?.html || ""
                          : activeCodeTab === "css"
                          ? selectedComponent.savedCode?.css || ""
                          : selectedComponent.savedCode?.scss || "";
                      navigator.clipboard.writeText(code);
                      alert("Code copied to clipboard!");
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-overlay-favourite">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Clear All Favorites</h3>
              <button
                className="modal-close"
                onClick={() => setShowClearConfirm(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to remove all favorites? This action
                cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="btn-save"
                onClick={confirmClearAll}
                style={{ backgroundColor: "#ef4444" }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
