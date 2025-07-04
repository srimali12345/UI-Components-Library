
import React, { useState } from "react";
import { Copy, Bell, Search, User, BellRing, BellPlus, UserCircle, UserRound } from "lucide-react";
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
    border: borderVal,
    borderRadius: borderRadiusVal,
  };

  const activeItemStyles = {
    color: template.style.activeColor,
    borderBottom: `2px solid ${template.style.activeColor}`,
  };

  const logoUrl = template.style.logoUrl || DEFAULT_LOGO_URL;

  // Get proper icon colors
  const notificationIconColor = template.style.icons?.notification?.color || template.style.textColor;
  const profileIconColor = template.style.icons?.profile?.color || template.style.textColor;
  const searchIconColor = template.style.searchIconColor || template.style.textColor;
  const placeholderColor = template.style.searchPlaceholderColor || "#999999";

  const searchContainerStyles = {
    backgroundColor: template.style.searchBarBackgroundColor || "rgba(255, 255, 255, 0.1)",
    borderRadius: template.style.searchBorderTopLeftRadius ||
      template.style.searchBorderTopRightRadius ||
      template.style.searchBorderBottomRightRadius ||
      template.style.searchBorderBottomLeftRadius
        ? `${template.style.searchBorderTopLeftRadius || "6px"} 
           ${template.style.searchBorderTopRightRadius || "6px"} 
           ${template.style.searchBorderBottomRightRadius || "6px"}
           ${template.style.searchBorderBottomLeftRadius || "6px"} `
        : template.style.searchBorderRadius || "6px",
    border: template.style.SearchBorderWidth && parseInt(template.style.SearchBorderWidth) > 0
      ? `${template.style.SearchBorderWidth} solid ${template.style.SearchBarBorderColor || "#000"}`
      : "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    padding: "6px 12px",
    gap: "8px",
  };

  // Get appropriate icon components based on settings
  const getNotificationIcon = () => {
    const iconProps = {
      size: 18,
      color: notificationIconColor,
    };

    switch (template.style.icons?.notification?.variant) {
      case "bell-ring":
        return <BellRing {...iconProps} />;
      case "bell-plus":
        return <BellPlus {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  const getProfileIcon = () => {
    const iconProps = {
      size: 18,
      color: profileIconColor,
    };

    switch (template.style.icons?.profile?.variant) {
      case "user-circle":
        return <UserCircle {...iconProps} />;
      case "user-round":
        return <UserRound {...iconProps} />;
      default:
        return <User {...iconProps} />;
    }
  };

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
                      {(template.navItems || []).map((item) => (
                        <a
                          key={item.id || item.text}
                          href={item.url || "#"}
                          className="nav-link"
                          style={item.active ? activeItemStyles : { color: template.style.textColor }}
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
                        style={searchContainerStyles}
                      >
                        <Search size={18} color={searchIconColor} />
                        <input
                          type="text"
                          placeholder="Search"
                          className="search-input"
                          style={{ 
                            color: template.style.textColor,
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            flex: 1,
                          }}
                        />
                      </div>
                    )}
                </div>
                <div className="navbar-right">
                  {template.style.navPosition === "left" &&
                    template.style.hasSearch && (
                      <div className="search-container" style={searchContainerStyles}>
                        <Search size={18} color={searchIconColor} />
                        <input
                          type="text"
                          placeholder="Search"
                          className="search-input"
                          style={{ 
                            color: template.style.textColor,
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            flex: 1,
                          }}
                        />
                      </div>
                    )}
                  {template.style.navPosition === "right" && (
                    <div className="nav-links right">
                      {(template.navItems || []).map((item) => (
                        <a
                          key={item.id || item.text}
                          href={item.url || "#"}
                          className="nav-link"
                          style={item.active ? activeItemStyles : { color: template.style.textColor }}
                        >
                          {item.text}
                        </a>
                      ))}
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {template.style.icons?.notification?.show !== false && (
                      <div className="notification-icon">{getNotificationIcon()}</div>
                    )}
                    {template.style.icons?.profile?.show !== false && (
                      <div className="profile-icon">{getProfileIcon()}</div>
                    )}
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

        {/* Add CSS for proper placeholder styling */}
        <style>{`
          .search-input::placeholder {
            color: ${placeholderColor} !important;
            opacity: 1 !important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default NavbarCodeModal;
