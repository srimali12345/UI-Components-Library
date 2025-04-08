import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { templates } from "./NavbarList";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import NavbarCodeModal from "./NavbarCodeModal";
import { Bell, Code, Search, Settings, User } from "lucide-react";
import "../../styles/components/navCustomization.scss";

const DEFAULT_LOGO_URL = "https://1billiontech.com/assets/images/logo.png";

const NavbarTemplates = ({ onSelect }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateClick = (template) => {
    navigate(`/customizer/${template.name}`, { state: { template } });
  };
  const handleCopyClick = (template) => {
    setSelectedTemplate(template);
    setModalVisible(true);
  };

  return (
    <div className="nav-dashboard">
      <h2 className="component-title">Navbars</h2>

      <div className="nav-list">
        {templates.map((template) => (
          <div key={template.id} className="btn-list-wrap">
            <p className="btn-wrap-title">{template.name}</p>
            <div className="btn-wrap">
              <div
                className="navbar-template"
                onClick={() => handleTemplateClick(template)}
              >
                <div className="preview-pane">
                  <div
                    className="navbar-preview"
                    style={{
                      backgroundColor: template.style.backgroundColor,
                      color: template.style.textColor,
                      borderRadius: template.style.borderRadius,
                      height: template.style.height || "64px",
                      padding: template.style.padding || "0 1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className={`navbar-left ${
                        template.style.navPosition === "right"
                          ? "full-width"
                          : ""
                      }`}
                    >
                      <div className="navbar-logo">
                        <img
                          src={DEFAULT_LOGO_URL}
                          alt="Logo"
                          className="logo-image"
                          style={{ height: "32px" }}
                        />
                      </div>

                      {template.style.navPosition === "left" && (
                        <div className="nav-links">
                          {template.navItems.map((item, i) => (
                            <a
                              key={i}
                              href="#"
                              className="nav-link"
                              style={
                                item.active
                                  ? {
                                      color: template.style.activeColor,
                                      borderBottom: `2px solid ${template.style.activeColor}`,
                                    }
                                  : {}
                              }
                            >
                              {item.text}
                            </a>
                          ))}
                        </div>
                      )}

                      {template.style.navPosition === "right" &&
                        template.style.hasSearch && (
                          <div className="search-container right">
                            <Search size={14} className="search-icon" />
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
                            <Search size={14} className="search-icon" />
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
                          {template.navItems.map((item, i) => (
                            <a
                              key={i}
                              href="#"
                              className="nav-link"
                              style={
                                item.active
                                  ? {
                                      color: template.style.activeColor,
                                      borderBottom: `2px solid ${template.style.activeColor}`,
                                    }
                                  : {}
                              }
                            >
                              {item.text}
                            </a>
                          ))}
                        </div>
                      )}

                      <Bell size={14} className="notification-icon" />
                      <div className="profile-icon">
                        <User size={12} className="user-icon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-wrap">
                <button
                  className="btn-tool-wrap"
                  title="View code"
                  onClick={(e) => handleCopyClick(template, e)}
                >
                  <img src={copyIcon} alt="icon" className="btn-icon" />
                </button>
                <button
                  className="btn-tool-wrap"
                  title="Customize"
                  onClick={() => handleTemplateClick(template)}
                >
                  <img src={toolIcon} alt="icon" className="btn-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalVisible && selectedTemplate && (
        <NavbarCodeModal
          template={selectedTemplate}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default NavbarTemplates;
