import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { templates } from "./NavbarList";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import NavbarCodeModal from "./NavbarCodeModal";
import { Heart, Trash2 } from "lucide-react";
import { useFavorites } from "../../contexts/FavouriteContext";
import "../../styles/components/navCustomization.scss";

const DEFAULT_LOGO_URL =
  "https://www.pngkey.com/png/full/233-2332677_image-500580-placeholder-transparent.png";

const NavbarTemplates = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handleTemplateClick = (template) => {
    navigate(`/customize-navbar/${template.name}`, { state: { template } });
  };

  const handleCopyClick = (template) => {
    const completeTemplate = {
      ...template,
      navItems: template.navItems || [
        { id: 1, text: "Home", active: true, url: "/" },
        { id: 2, text: "About", active: false, url: "/about" },
        { id: 3, text: "Contact", active: false, url: "/contact" }
      ],
      style: template.style || {}
    };
    setSelectedTemplate(completeTemplate);
    setModalVisible(true);
  };

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleAddFavorite = (template, e) => {
    e.stopPropagation();
    const favoriteData = {
      id: `navbar-${Date.now()}`,
      type: "Navbar",
      componentType: "NAVBAR",
      navbarType: template.id.toString(),
      favoriteName: `${template.name} Navbar`,
      savedStyles: template.style || {},
      navItems: template.navItems || [
        { id: 1, text: "Home", active: true, url: "/" },
        { id: 2, text: "About", active: false, url: "/about" },
        { id: 3, text: "Contact", active: false, url: "/contact" }
      ],
      createdAt: new Date().toISOString()
    };
    addFavorite(favoriteData);
  };

  const handleRemoveFavorite = (componentId) => {
    if (window.confirm("Are you sure you want to remove this favorite?")) {
      removeFavorite(componentId);
    }
  };

  const handleCustomizeFavorite = (component) => {
    navigate(`/customize-navbar/${component.navbarType}`, {
      state: {
        fromFavorite: true,
        favoriteId: component.id,
        existingStyles: component.savedStyles || {},
        existingNavItems: component.navItems || [
          { id: 1, text: "Home", active: true, url: "/" },
          { id: 2, text: "About", active: false, url: "/about" },
          { id: 3, text: "Contact", active: false, url: "/contact" }
        ]
      }
    });
  };

  const navbarFavorites = favorites.filter(
    (component) =>
      component.type === "Navbar" || 
      component.componentType === "NAVBAR"
  );

  const renderFavoritePreview = (component) => {
    const savedStyles = component.savedStyles || {};
    const navItems = component.navItems || [
      { id: 1, text: "Home", active: true, url: "/" },
      { id: 2, text: "About", active: false, url: "/about" },
      { id: 3, text: "Contact", active: false, url: "/contact" }
    ];

    // Calculate border radius similar to PreviewPane
    const borderRadiusVal = 
      savedStyles.topLeftRadius ||
      savedStyles.topRightRadius ||
      savedStyles.bottomRightRadius ||
      savedStyles.bottomLeftRadius
        ? `${savedStyles.topLeftRadius || "6px"} 
           ${savedStyles.topRightRadius || "6px"} 
           ${savedStyles.bottomRightRadius || "6px"} 
           ${savedStyles.bottomLeftRadius || "6px"}`
        : savedStyles.borderRadius || "6px";

    const activeItemStyles = {
      color: savedStyles.activeColor || savedStyles.textColor || '#333333',
      borderBottom: `2px solid ${savedStyles.activeColor || savedStyles.textColor || '#333333'}`,
    };

    return (
      <div className="navbar-template" style={{ width: "100%" }}>
        <div className="preview-pane" style={{ width: "100%" }}>
          <div
            className="navbar-preview"
            style={{
              backgroundColor: savedStyles.backgroundColor,
              color: savedStyles.textColor,
              borderRadius: borderRadiusVal,
              height: savedStyles.height || "64px",
              padding: savedStyles.padding || "0 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              border: savedStyles.borderWidth
                ? `${savedStyles.borderWidth} solid ${savedStyles.borderColor || "#e5e7eb"}`
                : "none",
            }}
          >
            <div
              className={`navbar-left ${
                savedStyles.navPosition === "right" ? "full-width" : ""
              }`}
            >
              <div className="navbar-logo">
                <img
                  src={DEFAULT_LOGO_URL}
                  alt="Logo"
                  className="logo-image"
                  style={{ height: "32px" }}
                />
              </div>

              {savedStyles.navPosition !== "right" && (
                <div className="nav-links">
                  {navItems.slice(0, 3).map((item) => (
                    <a
                      key={item.id}
                      href="#"
                      className="nav-link"
                      style={
                        item.active ? activeItemStyles : {}
                      }
                    >
                      {item.text}
                    </a>
                  ))}
                </div>
              )}

              {savedStyles.navPosition === "right" &&
                savedStyles.hasSearch && (
                  <div className="search-container right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-search-icon lucide-search"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search"
                      className="search-input"
                      style={{ color: savedStyles.textColor }}
                    />
                  </div>
                )}
            </div>

            <div className="navbar-right">
              {savedStyles.navPosition !== "right" &&
                savedStyles.hasSearch && (
                  <div className="search-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-search-icon lucide-search"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search"
                      className="search-input"
                      style={{ color: savedStyles.textColor }}
                    />
                  </div>
                )}

              {savedStyles.navPosition === "right" && (
                <div className="nav-links right">
                  {navItems.slice(0, 3).map((item) => (
                    <a
                      key={item.id}
                      href="#"
                      className="nav-link"
                      style={
                        item.active ? activeItemStyles : {}
                      }
                    >
                      {item.text}
                    </a>
                  ))}
                </div>
              )}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bell-icon lucide-bell"
              >
                <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
              </svg>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user-round-icon lucide-user-round"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nav-dashboard">
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
            Navbars
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
            title="View Navbar favorites"
            className="fav-button"
          >
            <Heart size={16} />
            <span>Favourites ({navbarFavorites.length})</span>
          </button>
        )}
      </div>

      {showFavorites ? (
        <div className="favorites-section">
          {navbarFavorites.length > 0 ? (
            <div className="nav-list">
              {navbarFavorites.map((component) => (
                <div key={component.id} className="btn-list-wrap" style={{ width: "100%" }}>
                  <div className="btn-wrap-header">
                    <p className="btn-wrap-title">
                      {component.favoriteName ||
                        `${component.navbarType} Navbar`}
                    </p>
                  </div>
                  <div className="btn-wrap" >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "64px",
                        width: "100%"
                      }}
                    >
                      {renderFavoritePreview(component)}
                    </div>

                    <div className="flex-wrap">
                      <button
                        className="btn-tool-wrap"
                        title="View code"
                        onClick={() => {
                          const completeTemplate = {
                            id: component.id,
                            name: component.favoriteName || `${component.navbarType} Navbar`,
                            style: component.savedStyles || {},
                            navItems: component.navItems || [
                              { id: 1, text: "Home", active: true, url: "/" },
                              { id: 2, text: "About", active: false, url: "/about" },
                              { id: 3, text: "Contact", active: false, url: "/contact" }
                            ]
                          };
                          setSelectedTemplate(completeTemplate);
                          setModalVisible(true);
                        }}
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
                No Navbar Favorites Yet
              </h3>
              <p style={{ margin: 0, color: "#9ca3af" }}>
                Save your customized navbars to see them here.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="nav-list">
          {templates.map((template) => {
            const isFavorite = favorites.some(
              (fav) => 
                (fav.type === "Navbar" || fav.componentType === "NAVBAR") && 
                fav.navbarType === template.id.toString()
            );
            
            return (
              <div key={template.id} className="btn-list-wrap" style={{ width: "100%" }}>
                <div className="btn-wrap-header">
                  <p className="btn-wrap-title">{template.name}</p>
                </div>
                <div className="btn-wrap" >
                  <div
                    className="navbar-template"
                    onClick={() => handleTemplateClick(template)}
                    style={{ width: "100%" }}
                  >
                    <div className="preview-pane" style={{ width: "100%" }}>
                      <div
                        className={`navbar-preview s${template.id}`}
                        style={{
                          backgroundColor: template.style.backgroundColor,
                          color: template.style.textColor,
                          borderRadius: template.style.borderRadius,
                          height: template.style.height || "64px",
                          padding: template.style.padding || "0 1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <div
                          className={`navbar-left ${
                            template.style.navPosition === "right"
                              ? "full-width"
                              : ""
                          }`}
                        >
                          <div className="navbar-logo">
                            <img
                              src={DEFAULT_LOGO_URL}
                              alt="Logo"
                              className="logo-image"
                              style={{ height: "32px" }}
                            />
                          </div>

                          {template.style.navPosition === "left" && (
                            <div className="nav-links">
                              {template.navItems.map((item, i) => (
                                <a
                                  key={i}
                                  href="#"
                                  className="nav-link"
                                  style={
                                    item.active
                                      ? {
                                          color: template.style.activeColor,
                                          borderBottom: `2px solid ${template.style.activeColor}`,
                                        }
                                      : {}
                                  }
                                >
                                  {item.text}
                                </a>
                              ))}
                            </div>
                          )}

                          {template.style.navPosition === "right" &&
                            template.style.hasSearch && (
                              <div className="search-container right">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-search-icon lucide-search"
                                >
                                  <circle cx="11" cy="11" r="8" />
                                  <path d="m21 21-4.3-4.3" />
                                </svg>
                                <input
                                  type="text"
                                  placeholder="Search"
                                  className="search-input"
                                  style={{ color: template.style.textColor }}
                                />
                              </div>
                            )}
                        </div>

                        <div className="navbar-right">
                          {template.style.navPosition === "left" &&
                            template.style.hasSearch && (
                              <div className="search-container">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-search-icon lucide-search"
                                >
                                  <circle cx="11" cy="11" r="8" />
                                  <path d="m21 21-4.3-4.3" />
                                </svg>
                                <input
                                  type="text"
                                  placeholder="Search"
                                  className="search-input"
                                  style={{ color: template.style.textColor }}
                                />
                              </div>
                            )}

                          {template.style.navPosition === "right" && (
                            <div className="nav-links right">
                              {template.navItems.map((item, i) => (
                                <a
                                  key={i}
                                  href="#"
                                  className="nav-link"
                                  style={
                                    item.active
                                      ? {
                                          color: template.style.activeColor,
                                          borderBottom: `2px solid ${template.style.activeColor}`,
                                        }
                                      : {}
                                  }
                                >
                                  {item.text}
                                </a>
                              ))}
                            </div>
                          )}

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-bell-icon lucide-bell"
                          >
                            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                          </svg>
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-user-round-icon lucide-user-round"
                            >
                              <circle cx="12" cy="8" r="5" />
                              <path d="M20 21a8 8 0 0 0-16 0" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-wrap">
                    <button
                      className="btn-tool-wrap"
                      title="View code"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyClick(template);
                      }}
                    >
                      <img src={copyIcon} alt="icon" className="btn-icon" />
                    </button>
                    <button
                      className="btn-tool-wrap"
                      title="Customize"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateClick(template);
                      }}
                    >
                      <img src={toolIcon} alt="icon" className="btn-icon" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalVisible && selectedTemplate && (
        <NavbarCodeModal
          template={selectedTemplate}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default NavbarTemplates;