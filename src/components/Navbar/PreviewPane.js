import React, { useEffect } from "react";
import { Bell, Search, User } from "lucide-react";

const DEFAULT_LOGO_URL =
  "https://www.pngkey.com/png/full/233-2332677_image-500580-placeholder-transparent.png";

const PreviewPane = ({ navbarStyle, navItems, templateId }) => {
  const navbarStyles = {
    backgroundColor: navbarStyle.backgroundColor,
    color: navbarStyle.textColor,
    height: navbarStyle.height,
    padding: navbarStyle.padding,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: navbarStyle.borderWidth
      ? `${navbarStyle.borderWidth} solid ${
          navbarStyle.borderColor || "#e5e7eb"
        }`
      : "none",
    borderRadius:
      navbarStyle.topLeftRadius ||
      navbarStyle.topRightRadius ||
      navbarStyle.bottomRightRadius ||
      navbarStyle.bottomLeftRadius
        ? `${navbarStyle.topLeftRadius || "6px"} 
           ${navbarStyle.topRightRadius || "6px"} 
           ${navbarStyle.bottomRightRadius || "6px"} 
           ${navbarStyle.bottomLeftRadius || "6px"}`
        : navbarStyle.borderRadius || "6px",
  };

  const activeItemStyles = {
    color: navbarStyle.activeColor,
    borderBottom: `2px solid ${navbarStyle.activeColor}`,
  };

  const logoUrl = navbarStyle.logoUrl || DEFAULT_LOGO_URL;

  const setHoverColor = () => {
    document.documentElement.style.setProperty(
      "--nav-hover-color",
      navbarStyle.hoverColor || "#7E69AB"
    );
  };

  useEffect(() => {
    setHoverColor();
  }, [navbarStyle.hoverColor]);

  const searchContainerStyles = {
    backgroundColor:
      navbarStyle.searchBarBackgroundColor || "rgba(255, 255, 255, 0.1)",
    borderRadius: navbarStyle.SearchBarBorderRadius || "6px",
    border: navbarStyle.SearchBorderWidth
      ? `${navbarStyle.SearchBorderWidth}px solid ${
          navbarStyle.SearchBarBorderColor || "#e5e7eb"
        }`
      : "none",
  };

  return (
    <div className="preview-pane border-box">
      <div
        className={`navbar-preview ${templateId ? `s${templateId}` : ""}`}
        style={navbarStyles}
      >
        <div
          className={`navbar-left ${
            navbarStyle.navPosition === "right" ? "full-width" : ""
          }`}
        >
          <div className="navbar-logo">
            <img src={logoUrl} alt="Logo" className="logo-image" />
          </div>

          {navbarStyle.navPosition === "left" && (
            <div className="nav-links">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  className="nav-link"
                  style={{
                    color: navbarStyle.textColor,
                    ...(item.active ? activeItemStyles : {}),
                  }}
                >
                  {item.text}
                </a>
              ))}
            </div>
          )}

          {navbarStyle.navPosition === "right" && navbarStyle.hasSearch && (
            <div
              style={searchContainerStyles}
              className="search-container right"
            >
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                style={{ color: navbarStyle.textColor }}
              />
            </div>
          )}
        </div>

        <div className="navbar-right">
          {navbarStyle.navPosition === "left" && navbarStyle.hasSearch && (
            <div className="search-container" style={searchContainerStyles}>
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                style={{ color: navbarStyle.textColor }}
              />
            </div>
          )}

          {navbarStyle.navPosition === "right" && (
            <div className="nav-links right">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  className="nav-link"
                  style={{
                    color: navbarStyle.textColor,
                    ...(item.active ? activeItemStyles : {}),
                  }}
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
  );
};

export default PreviewPane;
