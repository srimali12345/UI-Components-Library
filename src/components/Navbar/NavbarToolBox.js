import React, { useState } from "react";
import LogoUploader from "./LogoUploader";
import { ChevronDown, ChevronRight, Bell, User } from "lucide-react";
import NavItemEditor from "./NavItemEditor";

const NavbarToolBox = ({
  navbarStyle,
  setNavbarStyle,
  navItems,
  onAddNavItem,
  onUpdateNavItem,
  onDeleteNavItem,
  onSetActiveItem,
  setNavItems,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    background: false,
    text: false,
    border: false,
    layout: false,
    logo: false,
    searchField: false,
    navItem: false,
    icons: false,
  });

  const toggle = (section) =>
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const handleLogoUpload = (logoUrl) => {
    setNavbarStyle((prevStyle) => ({
      ...prevStyle,
      logoUrl,
    }));
  };

  const handleToggleSearch = () => {
    setNavbarStyle((prevStyle) => ({
      ...prevStyle,
      hasSearch: !prevStyle.hasSearch,
    }));
  };

  const handleNavPositionChange = (position) => {
    setNavbarStyle((prevStyle) => ({
      ...prevStyle,
      navPosition: position,
    }));
  };

  const handleTemplateSelect = (template) => {
    setNavbarStyle((prevStyle) => ({
      ...prevStyle,
      ...template.style,
    }));
    setNavItems(template.navItems);
  };

  const handleIconToggle = (iconType) => {
    setNavbarStyle((prevStyle) => ({
      ...prevStyle,
      icons: {
        ...(prevStyle.icons || {}),
        [iconType]: {
          ...(prevStyle.icons?.[iconType] || {}),
          show: !(prevStyle.icons?.[iconType]?.show ?? true),
        },
      },
    }));
  };

  const handleIconTypeChange = (iconType, iconVariant) => {
    setNavbarStyle((prevStyle) => ({
      ...prevStyle,
      icons: {
        ...(prevStyle.icons || {}),
        [iconType]: {
          ...(prevStyle.icons?.[iconType] || {}),
          variant: iconVariant,
        },
      },
    }));
  };

  const handleIconColorChange = (iconType, color) => {
    setNavbarStyle((prevStyle) => ({
      ...prevStyle,
      icons: {
        ...(prevStyle.icons || {}),
        [iconType]: {
          ...(prevStyle.icons?.[iconType] || {}),
          color: color,
        },
      },
    }));
  };

  const [activeTab, setActiveTab] = useState("design");

  return (
    <div className="toolbar">
      <div className="toolbar-tabs">
        <div
          className={`toolbar-tab ${activeTab === "design" ? "active" : ""}`}
          onClick={() => setActiveTab("design")}
        >
          <span>Design</span>
        </div>
      </div>

      {/* Background Section */}
      <div className="toolbar-content">
        <div className="design-tab-content">
          <div className="collapsible-section">
            <div
              className="section-header"
              onClick={() => toggle("background")}
            >
              <span>Background</span>
              {expandedSections.background ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
            {expandedSections.background && (
              <div className="section-content">
                <div className="input-group">
                  <label> Background Color:</label>
                  <input
                    type="color"
                    value={navbarStyle.backgroundColor}
                    onChange={(e) =>
                      setNavbarStyle({
                        ...navbarStyle,
                        backgroundColor: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Text Colors Section */}
        <div className="collapsible-section">
          <div className="section-header" onClick={() => toggle("font")}>
            <span>Typography</span>
            {expandedSections.font ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {expandedSections.font && (
            <div className="section-content">
              <div className="input-group">
                <label>Color:</label>
                <input
                  type="color"
                  value={navbarStyle.textColor}
                  onChange={(e) =>
                    setNavbarStyle({
                      ...navbarStyle,
                      textColor: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-group">
                <label>Active Text Color:</label>
                <input
                  type="color"
                  value={navbarStyle.activeColor}
                  onChange={(e) =>
                    setNavbarStyle({
                      ...navbarStyle,
                      activeColor: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-group">
                <label>Hover Text Color:</label>
                <input
                  type="color"
                  value={navbarStyle.hoverColor || "#ffffff"}
                  onChange={(e) =>
                    setNavbarStyle({
                      ...navbarStyle,
                      hoverColor: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Border section */}
        <div className="collapsible-section">
          <div className="section-header" onClick={() => toggle("border")}>
            <span>Border</span>
            {expandedSections.border ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {expandedSections.border && (
            <div className="section-content">
              <div className="input-group">
                <label>Border Color:</label>
                <input
                  type="color"
                  value={navbarStyle.borderColor || "#6d45ff"}
                  onChange={(e) =>
                    setNavbarStyle({
                      ...navbarStyle,
                      borderColor: e.target.value,
                    })
                  }
                />
              </div>

              <div className="input-group">
                <label>Border Radius:</label>
                <div className="border-radius-inputs">
                  <input
                    type="number"
                    min="0"
                    value={parseInt(navbarStyle.topLeftRadius) || 6}
                    onChange={(e) => {
                      const newValue = `${e.target.value}px`;
                      setNavbarStyle((prev) => ({
                        ...prev,
                        topLeftRadius: newValue,
                      }));
                    }}
                    placeholder="TL"
                  />
                  <input
                    type="number"
                    min="0"
                    value={parseInt(navbarStyle.topRightRadius) || 6}
                    onChange={(e) => {
                      const newValue = `${e.target.value}px`;
                      setNavbarStyle((prev) => ({
                        ...prev,
                        topRightRadius: newValue,
                      }));
                    }}
                    placeholder="TR"
                  />
                  <input
                    type="number"
                    min="0"
                    value={parseInt(navbarStyle.bottomLeftRadius) || 6}
                    onChange={(e) => {
                      const newValue = `${e.target.value}px`;
                      setNavbarStyle((prev) => ({
                        ...prev,
                        bottomLeftRadius: newValue,
                      }));
                    }}
                    placeholder="BL"
                  />
                  <input
                    type="number"
                    min="0"
                    value={parseInt(navbarStyle.bottomRightRadius) || 6}
                    onChange={(e) => {
                      const newValue = `${e.target.value}px`;
                      setNavbarStyle((prev) => ({
                        ...prev,
                        bottomRightRadius: newValue,
                      }));
                    }}
                    placeholder="BR"
                  />
                  <span>px</span>
                </div>
              </div>

              <div className="input-group">
                <label>Border Width:</label>
                <input
                  type="number"
                  min="0"
                  value={parseInt(navbarStyle.borderWidth) || 0}
                  onChange={(e) =>
                    setNavbarStyle((prev) => ({
                      ...prev,
                      borderWidth: `${e.target.value}px`,
                    }))
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Logo Section */}
        <div className="collapsible-section">
          <div className="section-header" onClick={() => toggle("logo")}>
            <span>Logo</span>
            {expandedSections.logo ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {expandedSections.logo && (
            <div className="section-content">
              <h3 className="navbar-section-title">Logo</h3>

              <LogoUploader
                onUpload={handleLogoUpload}
                currentLogo={navbarStyle.logoUrl}
              />
            </div>
          )}
        </div>

        {/* Layout & Features Section */}
        <div className="collapsible-section">
          <div className="section-header" onClick={() => toggle("layout")}>
            <span>Layout & Features</span>
            {expandedSections.layout ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {expandedSections.layout && (
            <div className="section-content">
              <div className="layout-section">
                <div className="nav-search-wrap">
                  <label>Nav Items Position</label>
                  <div className="position-buttons">
                    <button
                      onClick={() => handleNavPositionChange("left")}
                      className={
                        navbarStyle.navPosition === "left" ? "active" : ""
                      }
                    >
                      Left
                    </button>
                    <button
                      onClick={() => handleNavPositionChange("right")}
                      className={
                        navbarStyle.navPosition === "right" ? "active" : ""
                      }
                    >
                      Right
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Icon Customization Section - NEW */}
        <div className="collapsible-section">
          <div className="section-header" onClick={() => toggle("icons")}>
            <span>Icons</span>
            {expandedSections.icons ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {expandedSections.icons && (
            <div className="section-content">
              {/* Notification Icon */}
              <div className="icon-customization">
                <h4>Notification Icon</h4>

                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="hasNotificationIcon"
                    checked={navbarStyle.icons?.notification?.show !== false}
                    onChange={() => handleIconToggle("notification")}
                  />
                  <label htmlFor="hasNotificationIcon">
                    Show Notification Icon
                  </label>
                </div>

                {navbarStyle.icons?.notification?.show !== false && (
                  <>
                    <div className="input-group">
                      <label>Icon Style:</label>
                      <select
                        value={
                          navbarStyle.icons?.notification?.variant || "bell"
                        }
                        onChange={(e) =>
                          handleIconTypeChange("notification", e.target.value)
                        }
                      >
                        <option value="bell">Bell</option>
                        <option value="bell-ring">Bell Ring</option>
                        <option value="bell-plus">Bell Plus</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label>Icon Color:</label>
                      <input
                        type="color"
                        value={
                          navbarStyle.icons?.notification?.color ||
                          navbarStyle.textColor ||
                          "#ffffff"
                        }
                        onChange={(e) =>
                          handleIconColorChange("notification", e.target.value)
                        }
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Profile Icon */}
              <div className="icon-customization">
                <h4>Profile Icon</h4>

                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="hasProfileIcon"
                    checked={navbarStyle.icons?.profile?.show !== false}
                    onChange={() => handleIconToggle("profile")}
                  />
                  <label htmlFor="hasProfileIcon">Show Profile Icon</label>
                </div>

                {navbarStyle.icons?.profile?.show !== false && (
                  <>
                    <div className="input-group">
                      <label>Icon Style:</label>
                      <select
                        value={navbarStyle.icons?.profile?.variant || "user"}
                        onChange={(e) =>
                          handleIconTypeChange("profile", e.target.value)
                        }
                      >
                        <option value="user">User</option>
                        <option value="user-circle">User Circle</option>
                        <option value="user-round">User Round</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label>Icon Color:</label>
                      <input
                        type="color"
                        value={
                          navbarStyle.icons?.profile?.color ||
                          navbarStyle.textColor ||
                          "#ffffff"
                        }
                        onChange={(e) =>
                          handleIconColorChange("profile", e.target.value)
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Search field section */}
        <div className="collapsible-section">
          <div className="section-header" onClick={() => toggle("searchField")}>
            <span>Search Field </span>
            {expandedSections.searchField ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {expandedSections.searchField && (
            <div className="section-content">
              {/* Toggle Search Bar */}
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="hasSearch"
                  checked={navbarStyle.hasSearch}
                  onChange={handleToggleSearch}
                />
                <label htmlFor="hasSearch">Include Search Bar</label>
              </div>

              {/* Only show styles if search is enabled */}
              {navbarStyle.hasSearch && (
                <>
                  <div className="input-group">
                    <label> SearchBar Background Color:</label>
                    <input
                      type="color"
                      value={navbarStyle.searchBarBackgroundColor}
                      onChange={(e) =>
                        setNavbarStyle({
                          ...navbarStyle,
                          searchBarBackgroundColor: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="input-group">
                    <label>SearchBar Border Color:</label>
                    <input
                      type="color"
                      value={navbarStyle.SearchBarBorderColor || "#cccccc"}
                      onChange={(e) =>
                        setNavbarStyle({
                          ...navbarStyle,
                          SearchBarBorderColor: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>SearchBar Border Width:</label>
                    <input
                      type="number"
                      min="0"
                      value={parseInt(navbarStyle.SearchBorderWidth)}
                      onChange={(e) =>
                        setNavbarStyle({
                          ...navbarStyle,
                          SearchBorderWidth: `${e.target.value}px`,
                        })
                      }
                    />
                  </div>
                  <div className="input-group">
                    <label>SearchBar Border Radius:</label>
                    <div className="border-radius-inputs">
                      <input
                        type="number"
                        min="0"
                        value={
                          parseInt(navbarStyle.searchBorderTopLeftRadius) || 6
                        }
                        onChange={(e) =>
                          setNavbarStyle({
                            ...navbarStyle,
                            searchBorderTopLeftRadius: `${e.target.value}px`,
                          })
                        }
                        placeholder="TL"
                      />
                      <input
                        type="number"
                        min="0"
                        value={
                          parseInt(navbarStyle.searchBorderTopRightRadius) || 6
                        }
                        onChange={(e) =>
                          setNavbarStyle({
                            ...navbarStyle,
                            searchBorderTopRightRadius: `${e.target.value}px`,
                          })
                        }
                        placeholder="TR"
                      />
                      <input
                        type="number"
                        min="0"
                        value={
                          parseInt(navbarStyle.searchBorderBottomLeftRadius) ||
                          6
                        }
                        onChange={(e) =>
                          setNavbarStyle({
                            ...navbarStyle,
                            searchBorderBottomLeftRadius: `${e.target.value}px`,
                          })
                        }
                        placeholder="BL"
                      />
                      <input
                        type="number"
                        min="0"
                        value={
                          parseInt(navbarStyle.searchBorderBottomRightRadius) ||
                          6
                        }
                        onChange={(e) =>
                          setNavbarStyle({
                            ...navbarStyle,
                            searchBorderBottomRightRadius: `${e.target.value}px`,
                          })
                        }
                        placeholder="BR"
                      />
                      <span>px</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <div className="collapsible-section">
          <div className="section-header" onClick={() => toggle("navItem")}>
            <span>Navigation Items</span>
            {expandedSections.navItem ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {expandedSections.navItem && (
            <div className="section-content">
              <NavItemEditor
                navItems={navItems}
                onAdd={onAddNavItem}
                onUpdate={onUpdateNavItem}
                onDelete={onDeleteNavItem}
                onSetActive={onSetActiveItem}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarToolBox;
