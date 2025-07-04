
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { templates } from "./NavbarList";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import NavbarCodeModal from "./NavbarCodeModal";
import { Heart, Trash2 } from "lucide-react";
import { useFavorites } from "../../contexts/FavouriteContext";
import Breadcrumb from "../../commonComponents/Breadcrumb";
import PreviewPane from "./PreviewPane";
import "../../styles/components/navCustomization.scss";

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
      style: {
        ...template.style,
        // Ensure all properties are included
        searchPlaceholderColor: template.style?.searchPlaceholderColor || "#999999",
        searchIconColor: template.style?.searchIconColor || template.style?.textColor || "#999999",
        searchBorderRadius: template.style?.searchBorderRadius || "6px",
        icons: {
          notification: {
            show: template.style?.icons?.notification?.show !== false,
            variant: template.style?.icons?.notification?.variant || "bell",
            color: template.style?.icons?.notification?.color || template.style?.textColor || "#ffffff",
          },
          profile: {
            show: template.style?.icons?.profile?.show !== false,
            variant: template.style?.icons?.profile?.variant || "user",
            color: template.style?.icons?.profile?.color || template.style?.textColor || "#ffffff",
          },
        },
      },
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
      savedStyles: {
        ...template.style,
        // Ensure all style properties are saved
        searchPlaceholderColor: template.style?.searchPlaceholderColor || "#999999",
        searchIconColor: template.style?.searchIconColor || template.style?.textColor || "#999999",
        searchBorderRadius: template.style?.searchBorderRadius || "6px",
        icons: {
          notification: {
            show: template.style?.icons?.notification?.show !== false,
            variant: template.style?.icons?.notification?.variant || "bell",
            color: template.style?.icons?.notification?.color || template.style?.textColor || "#ffffff",
          },
          profile: {
            show: template.style?.icons?.profile?.show !== false,
            variant: template.style?.icons?.profile?.variant || "user",
            color: template.style?.icons?.profile?.color || template.style?.textColor || "#ffffff",
          },
        },
      },
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

  const getCurrentSavedData = (component) => {
    const componentId = component.navbarType || component.id;
    const savedStyles = localStorage.getItem(`navbar-styles-${componentId}`);
    const savedNavItems = localStorage.getItem(`navbar-navItems-${componentId}`);
    const savedTitle = localStorage.getItem(`navbar-title-${componentId}`);

    const parseSafeJSON = (jsonString, fallback) => {
      try {
        return jsonString ? JSON.parse(jsonString) : fallback;
      } catch (error) {
        console.warn("Failed to parse JSON:", error);
        return fallback;
      }
    };

    const defaultNavItems = [
      { id: 1, text: "Home", active: true, url: "/" },
      { id: 2, text: "About", active: false, url: "/about" },
      { id: 3, text: "Contact", active: false, url: "/contact" },
    ];

    // Merge saved styles with component styles, ensuring all properties are preserved
    const baseStyles = component.savedStyles || {};
    const parsedSavedStyles = savedStyles ? parseSafeJSON(savedStyles, {}) : {};
    
    const finalStyles = {
      ...baseStyles,
      ...parsedSavedStyles,
      // Ensure icon properties are properly merged
      icons: {
        notification: {
          show: parsedSavedStyles.icons?.notification?.show ?? baseStyles.icons?.notification?.show ?? true,
          variant: parsedSavedStyles.icons?.notification?.variant || baseStyles.icons?.notification?.variant || "bell",
          color: parsedSavedStyles.icons?.notification?.color || baseStyles.icons?.notification?.color || baseStyles.textColor || "#ffffff",
        },
        profile: {
          show: parsedSavedStyles.icons?.profile?.show ?? baseStyles.icons?.profile?.show ?? true,
          variant: parsedSavedStyles.icons?.profile?.variant || baseStyles.icons?.profile?.variant || "user",
          color: parsedSavedStyles.icons?.profile?.color || baseStyles.icons?.profile?.color || baseStyles.textColor || "#ffffff",
        },
      },
      // Ensure search colors are preserved
      searchPlaceholderColor: parsedSavedStyles.searchPlaceholderColor || baseStyles.searchPlaceholderColor || "#999999",
      searchIconColor: parsedSavedStyles.searchIconColor || baseStyles.searchIconColor || baseStyles.textColor || "#999999",
      searchBorderRadius: parsedSavedStyles.searchBorderRadius || baseStyles.searchBorderRadius || "6px",
    };

    // Handle nav items with proper fallback logic
    let finalNavItems;
    if (savedNavItems) {
      finalNavItems = parseSafeJSON(savedNavItems, defaultNavItems);
    } else if (component.navItems && Array.isArray(component.navItems) && component.navItems.length > 0) {
      finalNavItems = component.navItems;
    } else {
      finalNavItems = defaultNavItems;
    }

    const finalTitle = savedTitle || component.favoriteName || `${componentId} Navbar`;

    console.log("getCurrentSavedData result:", {
      componentId,
      finalStyles,
      finalNavItems,
      finalTitle,
      savedNavItems: savedNavItems ? "exists" : "null",
      componentNavItems: component.navItems ? "exists" : "null"
    });

    return { finalStyles, finalNavItems, finalTitle };
  };

  const handleCustomizeFavorite = (component) => {
    const { finalStyles, finalNavItems, finalTitle } = getCurrentSavedData(component);

    console.log("Navigating to customize with:", {
      finalStyles,
      finalNavItems,
      finalTitle
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
    (component) => component.type === "Navbar" || component.componentType === "NAVBAR"
  );

  return (
    <div className="nav-dashboard">
      <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <Breadcrumb
          items={[
            { label: "Navbars", path: "/dashboard", onClick: () => setShowFavorites(false) },
            ...(showFavorites ? [{ label: "Favourites" }] : []),
          ]}
        />

        {!showFavorites && (
          <button onClick={handleToggleFavorites} title="View Navbar favorites" className="fav-button">
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
                const { finalStyles, finalNavItems, finalTitle } = getCurrentSavedData(component);

                return (
                  <div key={component.id} className="btn-list-wrap" style={{ width: "100%" }}>
                    <div className="btn-wrap-header">
                      <p className="btn-wrap-title">{finalTitle}</p>
                    </div>
                    <div className="btn-wrap">
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "64px", width: "100%" }}>
                        <PreviewPane navbarStyle={finalStyles} navItems={finalNavItems} templateId={component.id} />
                      </div>
                      <div className="flex-wrap">
                        <button className="btn-tool-wrap" title="View code" onClick={() => {
                          const completeTemplate = {
                            id: component.id,
                            name: finalTitle,
                            style: finalStyles,
                            navItems: finalNavItems,
                          };
                          setSelectedTemplate(completeTemplate);
                          setModalVisible(true);
                        }}>
                          <img src={copyIcon} alt="icon" className="btn-icon" />
                        </button>
                        <button className="btn-tool-wrap" title="Customize styles" onClick={() => handleCustomizeFavorite(component)}>
                          <img src={toolIcon} alt="icon" className="btn-icon" />
                        </button>
                        <button className="btn-tool-wrap" title="Remove from favorites" onClick={() => handleRemoveFavorite(component.id)} style={{ backgroundColor: "#fee2e2" }}>
                          <Trash2 size={16} color="#dc2626" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
              <Heart size={48} color="#d1d5db" style={{ marginBottom: "1rem" }} />
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#6b7280" }}>No Navbar Favorites Yet</h3>
              <p style={{ margin: 0, color: "#9ca3af" }}>Save your customized navbars to see them here.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="nav-list">
          {templates.map((template) => {
            const isFavorite = favorites.some(
              (fav) => (fav.type === "Navbar" || fav.componentType === "NAVBAR") && fav.navbarType === template.id.toString()
            );

            return (
              <div key={template.id} className="btn-list-wrap" >
                <div className="btn-wrap-header">
                  <p className="btn-wrap-title">{template.name}</p>
                </div>
                <div className="btn-wrap">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "64px", width: "100%" }} onClick={() => handleTemplateClick(template)}>
                    <PreviewPane navbarStyle={template.style} navItems={template.navItems} templateId={template.id} />
                  </div>
                  <div className="flex-wrap">
                    <button className="btn-tool-wrap" title="View code" onClick={(e) => {
                      e.stopPropagation();
                      handleCopyClick(template);
                    }}>
                      <img src={copyIcon} alt="icon" className="btn-icon" />
                    </button>
                    <button className="btn-tool-wrap" title="Customize" onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateClick(template);
                    }}>
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
