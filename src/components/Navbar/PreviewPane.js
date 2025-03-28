import React from "react";

const PreviewPane = ({ navbarStyle, navItems }) => {
  const navbarStyles = {
    backgroundColor: navbarStyle.backgroundColor,
    color: navbarStyle.textColor,
    height: navbarStyle.height,
    padding: navbarStyle.padding,
  };

  const navItemStyles = {
    color: navbarStyle.textColor,
  };

  const activeItemStyles = {
    color: navbarStyle.activeColor,
  };

  return (
    <div className="preview-pane">
      <div className="navbar-preview" style={navbarStyles}>
        <div className="navbar-container">
          {navbarStyle.logoUrl && (
            <div className="logo-container">
              <img
                src={navbarStyle.logoUrl}
                alt="Logo"
                className="navbar-logo"
              />
            </div>
          )}
          <nav className="nav-items">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href="#"
                    style={item.active ? activeItemStyles : navItemStyles}
                    className={`nav-link ${item.active ? "active" : ""}`}
                    data-hover-color={navbarStyle.hoverColor}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PreviewPane;
