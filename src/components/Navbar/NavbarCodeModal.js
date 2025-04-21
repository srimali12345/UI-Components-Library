import React, { useState } from "react";
import { Copy, Bell, Search, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  generateHTML,
  generateCSS,
  generateSASS,
  generateBorderRadius,
} from "././utils/CodeGenerator";

const DEFAULT_LOGO_URL =
  "https://www.pngkey.com/png/full/233-2332677_image-500580-placeholder-transparent.png";

const NavbarCodeModal = ({ template, onClose, templateId }) => {
  const [activeTab, setActiveTab] = useState("html");
  const location = useLocation();
  const selectedTemplate = location.state?.template;

  const getCode = () => {
    switch (activeTab) {
      case "html":
        return generateHTML(template.style, template.navItems);
      case "css":
        return generateCSS(template.style);
      case "scss":
      case "sass":
        return generateSASS(template.style);
      default:
        return "";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    alert("Code copied!");
  };

  // CORRECT border and borderRadius logic here using generateBorderRadius
  const borderVal =
    template.style.borderWidth && parseInt(template.style.borderWidth) > 0
      ? `${template.style.borderWidth} solid ${
          template.style.borderColor || "#000"
        }`
      : "none";

  const borderRadiusVal = generateBorderRadius(template.style);

  const navbarStyles = {
    backgroundColor: template.style.backgroundColor,
    color: template.style.textColor,
    height: template.style.height || "60px",
    padding: template.style.padding || "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: borderVal, // only set if defined
    borderRadius: borderRadiusVal,
  };

  const activeItemStyles = {
    color: template.style.activeColor,
    borderBottom: `2px solid ${template.style.activeColor}`,
  };

  const logoUrl = template.style.logoUrl || DEFAULT_LOGO_URL;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Code for: {template.name}</h3>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="preview-container-navbar">
          <div key={template.id} className="navbar-template">
            <div className="preview-pane">
              <div
                className={`navbar-preview s${template.id}`}
                style={navbarStyles}
              >
                <div
                  className={`navbar-left ${
                    template.style.navPosition === "right" ? "full-width" : ""
                  }`}
                >
                  <div className="navbar-logo">
                    <img src={logoUrl} alt="Logo" className="logo-image" />
                  </div>
                  {template.style.navPosition === "left" && (
                    <div className="nav-links">
                      {template.navItems.map((item) => (
                        <a
                          key={item.id || item.text}
                          href={item.url || "#"}
                          className="nav-link"
                          style={item.active ? activeItemStyles : {}}
                        >
                          {item.text}
                        </a>
                      ))}
                    </div>
                  )}
                  {template.style.navPosition === "right" &&
                    template.style.hasSearch && (
                      <div
                        className="search-container right"
                        style={{
                          backgroundColor:
                            template.style.searchBarBackgroundColor,
                          borderRadius:
                            template.style.SearchBarBorderRadius || "6px",
                          border:
                            template.style.SearchBorderWidth &&
                            parseInt(template.style.SearchBorderWidth) > 0
                              ? `${template.style.SearchBorderWidth} solid ${
                                  template.style.SearchBarBorderColor || "#000"
                                }`
                              : "1px solid #e5e7eb",
                        }}
                      >
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
                      {template.navItems.map((item) => (
                        <a
                          key={item.id || item.text}
                          href={item.url || "#"}
                          className="nav-link"
                          style={item.active ? activeItemStyles : {}}
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
        </div>

        <div className="tabs-copy-container">
          <div className="btn-group">
            <button
              className={
                activeTab === "html" ? "active btn-outline" : "btn-outline"
              }
              onClick={() => setActiveTab("html")}
            >
              HTML
            </button>
            <button
              className={
                activeTab === "css" ? "active btn-outline" : "btn-outline"
              }
              onClick={() => setActiveTab("css")}
            >
              CSS
            </button>
            <button
              className={
                activeTab === "scss" ? "active btn-outline" : "btn-outline"
              }
              onClick={() => setActiveTab("scss")}
            >
              SCSS
            </button>
          </div>
          <button className="copy-btn" onClick={handleCopy}>
            Copy <Copy size={16} />
          </button>
        </div>

        <pre className="code-block">
          <code>{getCode()}</code>
        </pre>
      </div>
    </div>
  );
};

export default NavbarCodeModal;
