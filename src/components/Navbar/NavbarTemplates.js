import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { templates } from "./NavbarList";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import NavbarCodeModal from "./NavbarCodeModal";
import { Heart, Trash2 } from "lucide-react";
import { useFavorites } from "../../contexts/FavouriteContext";
import Breadcrumb from "../../commonComponents/Breadcrumb";
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
        { id: 3, text: "Contact", active: false, url: "/contact" },
      ],
      style: template.style || {},
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
        { id: 3, text: "Contact", active: false, url: "/contact" },
      ],
      createdAt: new Date().toISOString(),
    };
    addFavorite(favoriteData);
  };

  const handleRemoveFavorite = (componentId) => {
    if (window.confirm("Are you sure you want to remove this favorite?")) {
      removeFavorite(componentId);
    }
  };

  // Helper function to get the most current saved data for a component
  const getCurrentSavedData = (component) => {
    const componentId = component.navbarType || component.id;
    
    console.log("Getting current saved data for component:", componentId);
    
    // Get saved data from localStorage
    const savedStyles = localStorage.getItem(`navbar-styles-${componentId}`);
    const savedNavItems = localStorage.getItem(`navbar-navItems-${componentId}`);
    const savedTitle = localStorage.getItem(`navbar-title-${componentId}`);
    
    console.log("Raw localStorage data:", {
      savedStyles,
      savedNavItems,
      savedTitle
    });
    
    const parseSafeJSON = (jsonString, fallback) => {
      try {
        return jsonString ? JSON.parse(jsonString) : fallback;
      } catch (error) {
        console.warn("Failed to parse JSON:", error);
        return fallback;
      }
    };

    // Default nav items fallback
    const defaultNavItems = [
      { id: 1, text: "Home", active: true, url: "/" },
      { id: 2, text: "About", active: false, url: "/about" },
      { id: 3, text: "Contact", active: false, url: "/contact" },
    ];

    // Use saved data if available, otherwise fall back to component's stored data
    const finalStyles = savedStyles ? 
      parseSafeJSON(savedStyles, component.savedStyles || {}) : 
      component.savedStyles || {};
    
    // Priority: localStorage > component.navItems > defaults
    let finalNavItems;
    if (savedNavItems) {
      finalNavItems = parseSafeJSON(savedNavItems, defaultNavItems);
    } else if (component.navItems && Array.isArray(component.navItems) && component.navItems.length > 0) {
      finalNavItems = component.navItems;
    } else {
      finalNavItems = defaultNavItems;
    }

    const finalTitle = savedTitle || component.favoriteName || `${componentId} Navbar`;

    console.log("Final processed data:", {
      finalStyles,
      finalNavItems,
      finalTitle
    });

    return { finalStyles, finalNavItems, finalTitle };
  };

  const handleCustomizeFavorite = (component) => {
    const { finalStyles, finalNavItems, finalTitle } = getCurrentSavedData(component);

    console.log("Navigating to customize with saved data:", {
      savedStyles: finalStyles,
      savedNavItems: finalNavItems,
      savedTitle: finalTitle,
      component
    });

    navigate(`/customize-navbar/${component.navbarType}`, {
      state: {
        fromFavorite: true,
        favoriteId: component.id,
        existingStyles: finalStyles,
        existingNavItems: finalNavItems,
        existingTitle: finalTitle,
      },
    });
  };

  const navbarFavorites = favorites.filter(
    (component) =>
      component.type === "Navbar" || component.componentType === "NAVBAR"
  );

  const renderNavbarPreview = (navbarStyle, navItems, templateId = null) => {
    console.log("Rendering navbar preview with:", { navbarStyle, navItems });
    
    // Calculate border radius similar to PreviewPane
    const borderRadiusVal =
      navbarStyle.topLeftRadius ||
      navbarStyle.topRightRadius ||
      navbarStyle.bottomRightRadius ||
      navbarStyle.bottomLeftRadius
        ? `${navbarStyle.topLeftRadius || "6px"} 
           ${navbarStyle.topRightRadius || "6px"} 
           ${navbarStyle.bottomRightRadius || "6px"} 
           ${navbarStyle.bottomLeftRadius || "6px"}`
        : navbarStyle.borderRadius || "6px";

    const activeItemStyles = {
      color: navbarStyle.activeColor || navbarStyle.textColor || "#333333",
      borderBottom: `2px solid ${
        navbarStyle.activeColor || navbarStyle.textColor || "#333333"
      }`,
    };

    // Ensure navItems is an array and has content
    const displayNavItems = Array.isArray(navItems) && navItems.length > 0 ? navItems : [
      { id: 1, text: "Home", active: true, url: "/" },
      { id: 2, text: "About", active: false, url: "/about" },
      { id: 3, text: "Contact", active: false, url: "/contact" },
    ];

    console.log("Display nav items:", displayNavItems);

    // Check if icons should be shown
    const showNotificationIcon = navbarStyle.icons?.notification?.show !== false && 
                                navbarStyle.hasNotification !== false;
    const showProfileIcon = navbarStyle.icons?.profile?.show !== false && 
                           navbarStyle.hasProfile !== false;

    // Get icon colors
    const notificationIconColor = navbarStyle.icons?.notification?.color || navbarStyle.textColor || "#333333";
    const profileIconColor = navbarStyle.icons?.profile?.color || navbarStyle.textColor || "#333333";

    return (
      <div className="navbar-template" style={{ width: "100%" }}>
        <div className="preview-pane" style={{ width: "100%" }}>
          <div
            className={`navbar-preview ${templateId ? `s${templateId}` : ''}`}
            style={{
              backgroundColor: navbarStyle.backgroundColor,
              color: navbarStyle.textColor,
              borderRadius: borderRadiusVal,
              height: navbarStyle.height || "64px",
              padding: navbarStyle.padding || "0 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              border: navbarStyle.borderWidth
                ? `${navbarStyle.borderWidth} solid ${
                    navbarStyle.borderColor || "#e5e7eb"
                  }`
                : "none",
            }}
          >
            <div
              className={`navbar-left ${
                navbarStyle.navPosition === "right" ? "full-width" : ""
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

              {navbarStyle.navPosition !== "right" && (
                <div className="nav-links">
                  {displayNavItems.slice(0, 3).map((item) => (
                    <a
                      key={item.id}
                      href="#"
                      className="nav-link"
                      style={item.active ? activeItemStyles : { color: navbarStyle.textColor || "#333333" }}
                    >
                      {item.text}
                    </a>
                  ))}
                </div>
              )}

              {navbarStyle.navPosition === "right" && navbarStyle.hasSearch && (
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
                    style={{ color: navbarStyle.textColor }}
                  />
                </div>
              )}
            </div>

            <div className="navbar-right">
              {navbarStyle.navPosition !== "right" && navbarStyle.hasSearch && (
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
                    style={{ color: navbarStyle.textColor }}
                  />
                </div>
              )}

              {navbarStyle.navPosition === "right" && (
                <div className="nav-links right">
                  {displayNavItems.slice(0, 3).map((item) => (
                    <a
                      key={item.id}
                      href="#"
                      className="nav-link"
                      style={item.active ? activeItemStyles : { color: navbarStyle.textColor || "#333333" }}
                    >
                      {item.text}
                    </a>
                  ))}
                </div>
              )}

              <div className="icon-container" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {showNotificationIcon && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={notificationIconColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bell-icon lucide-bell"
                  >
                    <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                    <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                  </svg>
                )}
                {showProfileIcon && (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={profileIconColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-user-round-icon lucide-user-round"
                    >
                      <circle cx="12" cy="8" r="5" />
                      <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                  </div>
                )}
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
        <Breadcrumb
          items={[
            {
              label: "Navbars",
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
              {navbarFavorites.map((component) => {
                // Get the most current saved data for this component
                const { finalStyles, finalNavItems, finalTitle } = getCurrentSavedData(component);

                return (
                  <div
                    key={component.id}
                    className="btn-list-wrap"
                    style={{ width: "100%" }}
                  >
                    <div className="btn-wrap-header">
                      <p className="btn-wrap-title">
                        {finalTitle}
                      </p>
                    </div>
                    <div className="btn-wrap">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minHeight: "64px",
                          width: "100%",
                        }}
                      >
                        {renderNavbarPreview(finalStyles, finalNavItems)}
                      </div>

                      <div className="flex-wrap">
                        <button
                          className="btn-tool-wrap"
                          title="View code"
                          onClick={() => {
                            const completeTemplate = {
                              id: component.id,
                              name: finalTitle,
                              style: finalStyles,
                              navItems: finalNavItems,
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
                );
              })}
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
              <div
                key={template.id}
                className="btn-list-wrap"
                style={{ width: "100%" }}
              >
                <div className="btn-wrap-header">
                  <p className="btn-wrap-title">{template.name}</p>
                </div>
                <div className="btn-wrap">
                  <div
                    className="navbar-template"
                    onClick={() => handleTemplateClick(template)}
                    style={{ width: "100%" }}
                  >
                    {renderNavbarPreview(template.style, template.navItems, template.id)}
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
