import React from "react";
import { Bell, Search, User } from "lucide-react";
import "../../styles/components/navbarCustomization.scss";

const DEFAULT_LOGO_URL = "https://www.pngkey.com/png/full/233-2332677_image-500580-placeholder-transparent.png";

const PreviewPane = ({ navbarStyle, navItems }) => {
  const navbarStyles = {
    backgroundColor: navbarStyle.backgroundColor,
    color: navbarStyle.textColor,
    height: navbarStyle.height,
    padding: navbarStyle.padding,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: navbarStyle.borderRadius,
    hoverColor: navbarStyle.hoverColor,
  };

  const activeItemStyles = {
    color: navbarStyle.activeColor,
    borderBottom: `2px solid ${navbarStyle.activeColor}`,
  };
  const logoUrl = navbarStyle.logoUrl || DEFAULT_LOGO_URL;
  return (
    <div className="preview-pane">
      <div className="navbar-preview" style={navbarStyles}>
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
                  style={item.active ? activeItemStyles : {}}
                >
                  {item.text}
                </a>
              ))}
            </div>
          )}

          {navbarStyle.navPosition === "right" && navbarStyle.hasSearch && (
            <div className="search-container right">
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
            <div className="search-container">
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
  );
};

export default PreviewPane;
