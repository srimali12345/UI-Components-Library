import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Copy, EyeOff, Eye } from "lucide-react";
import { generateHTML, generateCSS, generateSASS } from "./utils/CodeGenerator";
import PreviewPane from "./PreviewPane";
import CodeViewer from "./CodeViewer";
import NavbarToolBox from "./NavbarToolBox";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { templates } from "./NavbarList";
const NavbarCustomizer = ({ onSelect, template }) => {
  const navigate = useNavigate();
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
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

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
    <div className="main-custom-wrap">
      <div className="customization-container">
        <div className="preview-main">
          <div className="customization-container-preview">
            <div className="flex-wrap">
              <button
                className="btn-icon-wrap"
                onClick={() => navigate(`/dashboard/`)}
              >
                <ChevronLeft size={20} />
              </button>
              <span>Customization</span>
            </div>

            <div className="text-gray">Nav - {templates.name} </div>
            <div>
              <button className="btn-icon-wrap vertical">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
          <div className="middle-section">
            <PreviewPane navbarStyle={navbarStyle} navItems={navItems} />
          </div>
        </div>

        <div className="code-panel">
          <div className="code-panel-header">
            <div className="code-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 18L22 12L16 6"
                  stroke="#3E41FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 6L2 12L8 18"
                  stroke="#3E41FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Generated Code</h3>
            <div className="toggle-code-button" onClick={toggleCodeVisibility}>
              {isCodeVisible ? (
                <>
                  <span>Hide Code</span>
                  <EyeOff size={18} />
                </>
              ) : (
                <>
                  <span>View Code</span>
                  <Eye size={18} />
                </>
              )}
            </div>
          </div>

          {isCodeVisible && (
            <div className="code-panel-content">
              <div className="btn-group">
                <div
                  className={`btn-outline ${
                    activeTab === "html" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("html")}
                >
                  HTML
                </div>
                <div
                  className={`btn-outline ${
                    activeTab === "css" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("css")}
                >
                  CSS
                </div>
                <div
                  className={`btn-outline ${
                    activeTab === "scss" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("scss")}
                >
                  SCSS
                </div>
              </div>

              <div className="code-viewer">
                <CodeViewer
                  activeTab={activeTab}
                  html={generateHTML(navbarStyle, navItems)}
                  css={generateCSS(navbarStyle)}
                  sass={generateSASS(navbarStyle)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <NavbarToolBox
        navbarStyle={navbarStyle}
        setNavbarStyle={setNavbarStyle}
        navItems={navItems}
        onAddNavItem={handleAddNavItem}
        onUpdateNavItem={handleUpdateNavItem}
        onDeleteNavItem={handleDeleteNavItem}
        onSetActiveItem={handleSetActiveItem}
      />
    </div>
  );
};

export default NavbarCustomizer;
