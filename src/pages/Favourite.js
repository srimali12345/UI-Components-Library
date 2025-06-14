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
    const savedStyles = component.savedStyles || {};

    switch (component.componentType) {
      case "BUTTON":
        // Use the EXACT same logic as ButtonPreview component
        const buttonTypeClass = component.buttonType || "Primary";
        
        // EXACT border radius logic from ButtonPreview
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

        // EXACT border logic from ButtonPreview
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
          <div className="component-display">
            <div className="button-preview-container">
              <button 
                className={`dashboard-btn ${buttonTypeClass} preview-button-element`}
                style={buttonStyles}
              >
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

                {component.buttonText || component.label || (component.buttonType ? `${component.buttonType} Button` : "Default Button")}

                {icon && iconPosition === "right" && (
                  <img
                    src={icon}
                    alt="icon"
                    style={{ height: "12px", marginLeft: "5px" }}
                  />
                )}
              </button>
            </div>
          </div>
        );

      case "CARD":
        // Use CardPreview styling logic
        const cardStyles = {
          backgroundColor: savedStyles.backgroundColor || '#ffffff',
          border: savedStyles.borderWidth && savedStyles.borderColor 
            ? `${savedStyles.borderWidth} solid ${savedStyles.borderColor}` 
            : savedStyles.border || '1px solid #e0e0e0',
          borderRadius: savedStyles.borderRadius || '8px',
          padding: savedStyles.padding || '16px',
          boxShadow: savedStyles.boxShadow || '0 2px 8px rgba(0, 0, 0, 0.1)',
          color: savedStyles.textColor || savedStyles.color || '#333333',
          fontFamily: savedStyles.fontFamily || 'Arial, sans-serif',
          fontSize: savedStyles.fontSize || '14px',
          fontWeight: savedStyles.fontWeight || 'normal',
          maxWidth: '200px',
          textAlign: savedStyles.textAlign || 'center',
          width: savedStyles.width || 'auto',
          height: savedStyles.height || 'auto',
        };

        const titleStyles = {
          fontSize: savedStyles.titleFontSize || '16px',
          fontWeight: savedStyles.titleFontWeight || '600',
          color: savedStyles.titleColor || savedStyles.color || '#000000',
          fontFamily: savedStyles.titleFontFamily || savedStyles.fontFamily || 'inherit',
          margin: '0 0 8px 0',
        };

        const contentStyles = {
          fontSize: savedStyles.contentFontSize || '12px',
          fontWeight: savedStyles.contentFontWeight || 'normal',
          color: savedStyles.contentColor || savedStyles.textColor || savedStyles.color || '#666666',
          fontFamily: savedStyles.contentFontFamily || savedStyles.fontFamily || 'inherit',
          margin: '0',
        };

        return (
          <div className="component-display">
            <div className="card-preview-container">
              <div className="preview-card-element" style={cardStyles}>
                <h4 style={titleStyles}>
                  {component.cardTitle || "Card Title"}
                </h4>
                <p style={contentStyles}>
                  {component.cardContent || "Card content..."}
                </p>
              </div>
            </div>
          </div>
        );

      case "INPUT":
        // Use InputPreview styling logic
        const inputContainerStyles = {
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxWidth: '250px',
        };

        const inputStyles = {
          padding: savedStyles.padding || '10px 12px',
          fontSize: savedStyles.fontSize || '14px',
          fontFamily: savedStyles.fontFamily || 'inherit',
          fontWeight: savedStyles.fontWeight || 'normal',
          color: savedStyles.color || '#333333',
          backgroundColor: savedStyles.backgroundColor || '#ffffff',
          border: savedStyles.borderWidth && savedStyles.borderColor 
            ? `${savedStyles.borderWidth} solid ${savedStyles.borderColor}`
            : savedStyles.border || '1px solid #ccc',
          borderRadius: savedStyles.borderRadius || '4px',
          outline: 'none',
          width: savedStyles.width || '100%',
          height: savedStyles.height || 'auto',
          boxShadow: savedStyles.boxShadow || 'none',
        };

        return (
          <div className="component-display">
            <div style={inputContainerStyles}>
              <input
                type={component.inputType === "Password" ? "password" : "text"}
                placeholder={component.placeholderText || `Enter ${component.inputType || 'text'}`}
                style={inputStyles}
                readOnly
              />
            </div>
          </div>
        );

      case "LOGIN":
        // Use LoginPreview styling logic
        const loginContainerStyles = {
          backgroundColor: savedStyles.backgroundColor || '#ffffff',
          border: savedStyles.border || '1px solid #e0e0e0',
          borderRadius: savedStyles.borderRadius || '8px',
          padding: savedStyles.padding || '24px',
          boxShadow: savedStyles.boxShadow || '0 4px 12px rgba(0, 0, 0, 0.1)',
          fontFamily: savedStyles.fontFamily || 'Arial, sans-serif',
          maxWidth: '300px',
          width: '100%',
        };

        const loginTitleStyles = {
          fontSize: savedStyles.titleFontSize || '24px',
          fontWeight: savedStyles.titleFontWeight || '600',
          color: savedStyles.titleColor || savedStyles.color || '#333333',
          textAlign: 'center',
          marginBottom: '20px',
        };

        const loginInputStyles = {
          width: '100%',
          padding: '10px 12px',
          marginBottom: '12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
        };

        const loginButtonStyles = {
          width: '100%',
          padding: '12px',
          backgroundColor: savedStyles.buttonColor || '#6d45ff',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
        };

        return (
          <div className="component-display">
            <div style={loginContainerStyles}>
              <h3 style={loginTitleStyles}>
                {component.loginTitle || "Login"}
              </h3>
              <input
                type="email"
                placeholder="Email"
                style={loginInputStyles}
                readOnly
              />
              <input
                type="password"
                placeholder="Password"
                style={loginInputStyles}
                readOnly
              />
              <button style={loginButtonStyles}>
                Login
              </button>
            </div>
          </div>
        );

      case "NAV":
      case "NAVBAR":
        // Use NavbarPreview styling logic
        const navbarStyles = {
          backgroundColor: savedStyles.backgroundColor || '#ffffff',
          borderBottom: savedStyles.borderBottom || '1px solid #e0e0e0',
          padding: savedStyles.padding || '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: savedStyles.fontFamily || 'Arial, sans-serif',
          fontSize: savedStyles.fontSize || '14px',
          maxWidth: '300px',
          width: '100%',
        };

        const navTitleStyles = {
          fontSize: savedStyles.titleFontSize || '18px',
          fontWeight: savedStyles.titleFontWeight || 'bold',
          color: savedStyles.titleColor || savedStyles.color || '#333333',
          margin: 0,
        };

        const navItemsStyles = {
          display: 'flex',
          gap: '16px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        };

        const navItemStyle = {
          color: savedStyles.linkColor || savedStyles.color || '#666666',
          textDecoration: 'none',
          fontSize: '14px',
        };

        return (
          <div className="component-display">
            <nav style={navbarStyles}>
              <h4 style={navTitleStyles}>
                {component.navbarTitle || "Brand"}
              </h4>
              <ul style={navItemsStyles}>
                <li><a href="#" style={navItemStyle}>Home</a></li>
                <li><a href="#" style={navItemStyle}>About</a></li>
                <li><a href="#" style={navItemStyle}>Contact</a></li>
              </ul>
            </nav>
          </div>
        );

      default:
        return (
          <div className="component-display">
            <div className="preview-component" style={savedStyles}>
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
