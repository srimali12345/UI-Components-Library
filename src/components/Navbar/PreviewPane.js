import React, { useEffect } from "react";
import { Bell, User } from "lucide-react";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-search-icon lucide-search"
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-search-icon lucide-search"
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

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-bell-icon lucide-bell"
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-user-round-icon lucide-user-round"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPane;
