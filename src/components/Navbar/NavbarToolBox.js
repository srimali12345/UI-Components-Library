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
            {expandedSections.background && (
              <div className="section-content">
                <div className="input-group">
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
                  value={navbarStyle.hoverColor}
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

                <div>
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
