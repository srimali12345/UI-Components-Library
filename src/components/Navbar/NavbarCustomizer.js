import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PreviewPane from "./PreviewPane";
import CodeViewer from "./CodeViewer";
import { generateHTML, generateCSS, generateSASS } from "./utils/CodeGenerator";
import "../../styles/components/navbarCustomization.scss";
import NavbarToolBox from "./NavbarToolBox";

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

  return (
    <div className="navbar-customizer">
      <div className="container">
        <h1>Navbar Style Studio</h1>

        <div className="grid">
          <NavbarToolBox
            navbarStyle={navbarStyle}
            setNavbarStyle={setNavbarStyle}
            navItems={navItems}
            onAddNavItem={handleAddNavItem}
            onUpdateNavItem={handleUpdateNavItem}
            onDeleteNavItem={handleDeleteNavItem}
            onSetActiveItem={handleSetActiveItem}
          />

          {/* Right Panel */}
          <div>
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
