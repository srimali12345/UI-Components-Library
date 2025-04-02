import React, { useState, useEffect } from "react";
import PreviewPane from "./PreviewPane";
import ColorPicker from "./ColorPicker";
import LogoUploader from "./LogoUploader";
import NavItemEditor from "./NavItemEditor";
import CodeViewer from "./CodeViewer";
import { generateHTML, generateCSS, generateSASS } from "./utils/CodeGenerator";
import "../../styles/components/navbarCustomization.scss";

const NavbarCustomizer = () => {
  const [navbarStyle, setNavbarStyle] = useState({
    backgroundColor: "#ffffff",
    textColor: "#333333",
    activeColor: "#0066cc",
    hoverColor: "#4d94ff",
    logoUrl: "",
    height: "60px",
    padding: "0 20px",
  });

  const [navItems, setNavItems] = useState([
    { id: 1, text: "Home", active: true, url: "/" },
    { id: 2, text: "About", active: false, url: "/about" },
    { id: 3, text: "Services", active: false, url: "/services" },
    { id: 4, text: "Contact", active: false, url: "/contact" },
  ]);

  const [activeTab, setActiveTab] = useState("html");

  const handleColorChange = (colorType, color) => {
    setNavbarStyle({
      ...navbarStyle,
      [colorType]: color,
    });
  };

  const handleLogoUpload = (logoUrl) => {
    setNavbarStyle({
      ...navbarStyle,
      logoUrl,
    });
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
    <div className="navbar-customizer">
      <div className="customizer-layout">
        <div className="customizer-panel">
          <div className="panel-section">
            <h3 className="section-title">Colors</h3>
            <div className="color-pickers">
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

          <div className="panel-section">
            <h3 className="section-title">Logo</h3>
            <LogoUploader
              onUpload={handleLogoUpload}
              currentLogo={navbarStyle.logoUrl}
            />
          </div>

          <div className="panel-section">
            <h3 className="section-title">Navigation Items</h3>
            <NavItemEditor
              navItems={navItems}
              onAdd={handleAddNavItem}
              onUpdate={handleUpdateNavItem}
              onDelete={handleDeleteNavItem}
              onSetActive={handleSetActiveItem}
            />
          </div>
        </div>

        <div className="preview-code-container">
          <div className="preview-container">
            <h3 className="section-title">Live Preview</h3>
            <PreviewPane navbarStyle={navbarStyle} navItems={navItems} />
          </div>

          <div className="code-container">
            <h3 className="section-title">Generated Code</h3>
            <div className="code-tabs">
              <button
                className={`tab-button ${activeTab === "html" ? "active" : ""}`}
                onClick={() => setActiveTab("html")}
              >
                HTML
              </button>
              <button
                className={`tab-button ${activeTab === "css" ? "active" : ""}`}
                onClick={() => setActiveTab("css")}
              >
                CSS
              </button>
              <button
                className={`tab-button ${activeTab === "sass" ? "active" : ""}`}
                onClick={() => setActiveTab("sass")}
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
  );
};

export default NavbarCustomizer;
