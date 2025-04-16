import React, { useState } from "react";
import { Copy, Bell, Search, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  generateHTML,
  generateCSS,
  generateSASS,
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

  const navbarStyles = {
    backgroundColor: template.style.backgroundColor,
    color: template.style.textColor,
    height: template.style.height || "60px",
    padding: template.style.padding || "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: template.style.borderRadius || "0px",
    border: template.style.borderWidth
      ? `${template.style.borderWidth} solid ${
          template.style.borderColor || "#000"
        }`
      : "none",
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
                          border: template.style.SearchBorderWidth
                            ? `${template.style.SearchBorderWidth} solid ${
                                template.style.SearchBarBorderColor || "#000"
                              }`
                            : "none",
                        }}
                      >
                        <Search size={18} className="search-icon" />
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
                        <Search size={18} className="search-icon" />
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

                  <Bell size={20} className="notification-icon" />
                  <div className="profile-icon">
                    <User size={16} className="user-icon" />
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
