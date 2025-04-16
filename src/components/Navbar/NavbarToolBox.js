import React, { useState } from "react";
import LogoUploader from "./LogoUploader";
import { ChevronDown, ChevronRight } from "lucide-react";
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
    border:false,
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

  const handleAddNavItem = (newItem) => {
    setNavItems([...navItems, { ...newItem, id: Date.now() }]);
  };

  const handleUpdateNavItem = (updatedItem) => {
    setNavItems(
      navItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteNavItem = (itemId) => {
    setNavItems(navItems.filter((item) => item.id !== itemId));
  };

  const handleSetActiveItem = (itemId) => {
    setNavItems(
      navItems.map((item) => ({
        ...item,
        active: item.id === itemId,
      }))
    );
  };
  return (
    <div className="toolbar">
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
            {expandedSections.background &&  (
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
                  {navbarStyle.hasSearch &&(
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
                  )}
                
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
                  value={navbarStyle.hoverColor || '#ffffff'}
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

      {/* borde section */}
     
              <div className="collapsible-section">
                <div
                  className="section-header"
                  onClick={() => toggle("border")}
                >
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
                      <label>SearchField Border Color:</label>
                      <input
                        type="color"
                        value={navbarStyle.SearchBarBorderColor}
                        onChange={(e) =>
                          setNavbarStyle({
                            ...navbarStyle,
                            SearchBarBorderColor: e.target.value,
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
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="hasSearch"
                    checked={navbarStyle.hasSearch}
                    onChange={handleToggleSearch}
                  />
                  <label htmlFor="hasSearch">Include Search Bar</label>
                </div>

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

        <div>
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
    </div>
  );
};

export default NavbarToolBox;
