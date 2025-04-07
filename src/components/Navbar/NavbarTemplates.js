import React from "react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: 1,
    name: "Dark Navbar",
    style: {
      backgroundColor: "#1A1F2C",
      textColor: "#ffffff",
      activeColor: "#9b87f5",
      hoverColor: "#7E69AB",
      borderRadius: "0px",
      hasSearch: false,
      navPosition: "left",
    },
    navItems: [
      { id: 1, text: "Item1", active: true, url: "/" },
      { id: 2, text: "Item2", active: false, url: "/item2" },
      { id: 3, text: "Item3", active: false, url: "/item3" },
    ],
    thumbnail: "dark-navbar.png",
  },
  {
    id: 2,
    name: "Dark Navbar with Search",
    style: {
      backgroundColor: "#1A1F2C",
      textColor: "#ffffff",
      activeColor: "#9b87f5",
      hoverColor: "#7E69AB",
      borderRadius: "0px",
      hasSearch: true,
      navPosition: "left",
    },
    navItems: [
      { id: 1, text: "Item1", active: true, url: "/" },
      { id: 2, text: "Item2", active: false, url: "/item2" },
      { id: 3, text: "Item3", active: false, url: "/item3" },
    ],
    thumbnail: "dark-navbar-search.png",
  },
  {
    id: 3,
    name: "Light Rounded Navbar",
    style: {
      backgroundColor: "#ffffff",
      textColor: "#333333",
      activeColor: "#9b87f5",
      hoverColor: "#7E69AB",
      borderRadius: "8px",
      hasSearch: true,
      navPosition: "right",
    },
    navItems: [
      { id: 1, text: "Item1", active: true, url: "/" },
      { id: 2, text: "Item2", active: false, url: "/item2" },
      { id: 3, text: "Item3", active: false, url: "/item3" },
    ],
    thumbnail: "light-navbar.png",
  },
];

const NavbarTemplates = ({ onSelect }) => {
  const navigate = useNavigate();
  const handleTemplateClick = (template) => {
    navigate("/customizer", { state: { template } });
  };

  return (
    <div className="navbar-templates-container">
      {templates.map((template) => (
        <div
          key={template.id}
          className="navbar-template"
          onClick={() => handleTemplateClick(template)}
        >
          <div
            className="navbar-header"
            style={{
              backgroundColor: template.style.backgroundColor,
              color: template.style.textColor,
              borderRadius: template.style.borderRadius,
            }}
          >
            <div className="icon-placeholder"></div>

            {template.style.navPosition === "left" && (
              <div className="nav-items-left">
                {template.navItems.map((item, i) => (
                  <div
                    key={i}
                    className={item.active ? "nav-item-active" : undefined}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            )}

            {template.style.hasSearch && <div className="search-icon">🔍</div>}

            {template.style.navPosition === "right" && (
              <div className="nav-items-right">
                {template.navItems.map((item, i) => (
                  <div
                    key={i}
                    className={item.active ? "nav-item-active" : undefined}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="navbar-name">{template.name}</div>
        </div>
      ))}
    </div>
  );
};

export default NavbarTemplates;
