import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PreviewPane from "./PreviewPane";
import ColorPicker from "./ColorPicker";
import LogoUploader from "./LogoUploader";
import NavItemEditor from "./NavItemEditor";
import CodeViewer from "./CodeViewer";
import NavbarTemplates from "./NavbarTemplates";
import { generateHTML, generateCSS, generateSASS } from "./utils/CodeGenerator";
import "../../styles/components/navbarCustomization.scss";

const NavbarCustomizer = ({ onSelect }) => {
  const location = useLocation();
  const selectedTemplate = location.state?.template;
  const [navbarStyle, setNavbarStyle] = useState({
    backgroundColor: "#1A1F2C",
    textColor: "#ffffff",
    activeColor: "#9b87f5",
    hoverColor: "#7E69AB",
    logoUrl: "",
    height: "60px",
    padding: "0 20px",
    borderRadius: "0px",
    hasSearch: false,
    navPosition: "left",
  });

  const [navItems, setNavItems] = useState([
    { id: 1, text: "Item1", active: true, url: "/" },
    { id: 2, text: "Item2", active: false, url: "/item2" },
    { id: 3, text: "Item3", active: false, url: "/item3" },
  ]);

  useEffect(() => {
    if (selectedTemplate) {
      setNavbarStyle((prev) => ({ ...prev, ...selectedTemplate.style }));
      setNavItems(selectedTemplate.navItems);
    }
  }, [selectedTemplate]);

  const [activeTab, setActiveTab] = useState("html");

  const handleColorChange = (colorType, color) => {
    setNavbarStyle((prevStyle) => ({
      ...prevStyle,
      [colorType]: color,
    }));
  };

  const handleLogoUpload = (logoUrl) => {
    setNavbarStyle((prevStyle) => ({
      ...prevStyle,
      logoUrl,
    }));
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

  const handleTemplateSelect = (template) => {
    setNavbarStyle((prevStyle) => ({
      ...prevStyle,
      ...template.style,
    }));
    setNavItems(template.navItems);
  };

  const handleToggleSearch = () => {
    setNavbarStyle((prevStyle) => ({
      ...prevStyle,
      hasSearch: !prevStyle.hasSearch,
    }));
  };

  const handleBorderRadiusChange = (radius) => {
    setNavbarStyle((prevStyle) => ({
      ...prevStyle,
      borderRadius: radius,
    }));
  };

  const handleNavPositionChange = (position) => {
    setNavbarStyle((prevStyle) => ({
      ...prevStyle,
      navPosition: position,
    }));
  };

  return (
    <div className="navbar-customizer">
      <div className="container">
        <h1>Navbar Style Studio</h1>

        <div className="grid">
          <div>
            {/* Color Panel */}
            <div className="navbar-panel">
              <h3 className="navbar-section-title">Colors</h3>
              <div className="color-picker-container">
                <ColorPicker
                  label="Background"
                  color={navbarStyle.backgroundColor}
                  onChange={(color) =>
                    handleColorChange("backgroundColor", color)
                  }
                />
                <ColorPicker
                  label="Text"
                  color={navbarStyle.textColor}
                  onChange={(color) => handleColorChange("textColor", color)}
                />
                <ColorPicker
                  label="Active"
                  color={navbarStyle.activeColor}
                  onChange={(color) => handleColorChange("activeColor", color)}
                />
                <ColorPicker
                  label="Hover"
                  color={navbarStyle.hoverColor}
                  onChange={(color) => handleColorChange("hoverColor", color)}
                />
              </div>
            </div>

            {/* Logo Panel */}
            <div className="navbar-panel">
              <h3 className="navbar-section-title">Logo</h3>
              <LogoUploader
                onUpload={handleLogoUpload}
                currentLogo={navbarStyle.logoUrl}
              />
            </div>

            {/* Layout & Features Panel */}
            <div className="navbar-panel">
              <h3 className="navbar-section-title">Layout & Features</h3>
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
                  <label>Border Radius</label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={parseInt(navbarStyle.borderRadius)}
                    onChange={(e) =>
                      handleBorderRadiusChange(`${e.target.value}px`)
                    }
                    className="range-slider"
                  />
                  <div>{navbarStyle.borderRadius}</div>
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

            {/* Nav Items Panel */}
            <div className="navbar-panel">
              <h3 className="navbar-section-title">Navigation Items</h3>
              <NavItemEditor
                navItems={navItems}
                onAdd={handleAddNavItem}
                onUpdate={handleUpdateNavItem}
                onDelete={handleDeleteNavItem}
                onSetActive={handleSetActiveItem}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-8">
            {/* Preview Pane */}
            <div className="preview-container">
              <h3 className="navbar-section-title">Live Preview</h3>
              <PreviewPane navbarStyle={navbarStyle} navItems={navItems} />
            </div>

            {/* Code Viewer */}
            <div className="code-container">
              <h3 className="navbar-section-title">Generated Code</h3>
              <div className="code-tabs">
                <button
                  onClick={() => setActiveTab("html")}
                  className={activeTab === "html" ? "active" : ""}
                >
                  HTML
                </button>
                <button
                  onClick={() => setActiveTab("css")}
                  className={activeTab === "css" ? "active" : ""}
                >
                  CSS
                </button>
                <button
                  onClick={() => setActiveTab("sass")}
                  className={activeTab === "sass" ? "active" : ""}
                >
                  SASS
                </button>
              </div>
              <CodeViewer
                activeTab={activeTab}
                html={generateHTML(navbarStyle, navItems)}
                css={generateCSS(navbarStyle)}
                sass={generateSASS(navbarStyle)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarCustomizer;
