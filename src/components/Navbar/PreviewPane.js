import React, { useEffect, useState } from "react";
import {
  Bell,
  User,
  BellRing,
  BellPlus,
  UserCircle,
  UserRound,
} from "lucide-react";

const DEFAULT_LOGO_URL =
  "https://www.pngkey.com/png/full/233-2332677_image-500580-placeholder-transparent.png";

const PreviewPane = ({ navbarStyle, navItems, templateId }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

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
    width: "100%",
    boxSizing: "border-box",
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
    borderRadius:
      navbarStyle.searchBorderTopLeftRadius ||
      navbarStyle.searchBorderTopRightRadius ||
      navbarStyle.searchBorderBottomRightRadius ||
      navbarStyle.searchBorderBottomLeftRadius
        ? `${navbarStyle.searchBorderTopLeftRadius || "6px"} 
           ${navbarStyle.searchBorderTopRightRadius || "6px"} 
           ${navbarStyle.searchBorderBottomRightRadius || "6px"}
           ${navbarStyle.searchBorderBottomLeftRadius || "6px"} `
        : navbarStyle.searchBorderRadius || "6px",
    border: `${navbarStyle.SearchBorderWidth || "1px"} solid ${
      navbarStyle.SearchBarBorderColor || "rgba(255, 255, 255, 0.2)"
    }`,
    color: navbarStyle.textColor,
    display: "flex",
    alignItems: "center",
    padding: "6px 12px",
  };

  // Toggle dropdown menu
  const toggleDropdown = (itemId) => {
    if (activeDropdown === itemId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(itemId);
    }
  };

  // Get appropriate icon based on settings
  const getNotificationIcon = () => {
    const iconProps = {
      size: 18,
      color: navbarStyle.icons?.notification?.color || navbarStyle.textColor,
    };

    switch (navbarStyle.icons?.notification?.variant) {
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
      color: navbarStyle.icons?.profile?.color || navbarStyle.textColor,
    };

    switch (navbarStyle.icons?.profile?.variant) {
      case "user-circle":
        return <UserCircle {...iconProps} />;
      case "user-round":
        return <UserRound {...iconProps} />;
      default:
        return <User {...iconProps} />;
    }
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
                <div key={item.id} className="nav-item-container">
                  <div className="nav-item-wrapper">
                    <a
                      href={item.url}
                      className={`nav-link ${
                        item.submenu && item.submenu.length > 0
                          ? "has-submenu"
                          : ""
                      }`}
                      style={{
                        color: navbarStyle.textColor,
                        ...(item.active ? activeItemStyles : {}),
                      }}
                      onClick={
                        item.submenu && item.submenu.length > 0
                          ? (e) => {
                              e.preventDefault();
                              toggleDropdown(item.id);
                            }
                          : undefined
                      }
                    >
                      {item.text}
                      {item.submenu && item.submenu.length > 0 && (
                        <span className="dropdown-arrow">▼</span>
                      )}
                    </a>
                  </div>

                  {item.submenu &&
                    item.submenu.length > 0 &&
                    activeDropdown === item.id && (
                      <div
                        className="submenu-dropdown"
                        style={{
                          backgroundColor: navbarStyle.backgroundColor,
                          borderColor: navbarStyle.borderColor,
                        }}
                      >
                        {item.submenu.map((submenu) => (
                          <a
                            key={submenu.id}
                            href={submenu.url}
                            className="submenu-item"
                            style={{ color: navbarStyle.textColor }}
                          >
                            {submenu.text}
                          </a>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}

          {navbarStyle.navPosition === "right" && navbarStyle.hasSearch && (
            <div
              style={searchContainerStyles}
              className="search-container right"
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
                style={{ color: navbarStyle.textColor }}
              />
            </div>
          )}
        </div>

        <div className="navbar-right">
          {navbarStyle.navPosition === "left" && navbarStyle.hasSearch && (
            <div className="search-container" style={searchContainerStyles}>
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
                style={{ color: navbarStyle.textColor }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                style={{
                  color: navbarStyle.textColor,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                }}
              />
            </div>
          )}

          {navbarStyle.navPosition === "right" && (
            <div className="nav-links right">
              {navItems.map((item) => (
                <div key={item.id} className="nav-item-container">
                  <div className="nav-item-wrapper">
                    <a
                      href={item.url}
                      className={`nav-link ${
                        item.submenu && item.submenu.length > 0
                          ? "has-submenu"
                          : ""
                      }`}
                      style={{
                        color: navbarStyle.textColor,
                        ...(item.active ? activeItemStyles : {}),
                      }}
                      onClick={
                        item.submenu && item.submenu.length > 0
                          ? (e) => {
                              e.preventDefault();
                              toggleDropdown(item.id);
                            }
                          : undefined
                      }
                    >
                      {item.text}
                      {item.submenu && item.submenu.length > 0 && (
                        <span className="dropdown-arrow">▼</span>
                      )}
                    </a>
                  </div>

                  {item.submenu &&
                    item.submenu.length > 0 &&
                    activeDropdown === item.id && (
                      <div
                        className="submenu-dropdown"
                        style={{
                          backgroundColor: navbarStyle.backgroundColor,
                          borderColor: navbarStyle.borderColor,
                        }}
                      >
                        {item.submenu.map((submenu) => (
                          <a
                            key={submenu.id}
                            href={submenu.url}
                            className="submenu-item"
                            style={{ color: navbarStyle.textColor }}
                          >
                            {submenu.text}
                          </a>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}

          <div
            className="icon-container"
            style={{ display: "flex", gap: "12px", alignItems: "center" }}
          >
            {navbarStyle.icons?.notification?.show !== false && (
              <div className="notification-icon">{getNotificationIcon()}</div>
            )}

            {navbarStyle.icons?.profile?.show !== false && (
              <div className="profile-icon">{getProfileIcon()}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPane;
