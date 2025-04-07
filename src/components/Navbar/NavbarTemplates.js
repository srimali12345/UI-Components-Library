import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { templates } from "./NavbarList";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import NavbarCodeModal from "./NavbarCodeModal";

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
    <div className="button-dashboard">
      <h2 className="component-title">Navbars</h2>

      <div className="button-list">
        {templates.map((template) => (
          <div className="btn-list-wrap">
            <p className="btn-wrap-title">{template.name}</p>
            <div className="btn-wrap">
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
                          className={
                            item.active ? "nav-item-active" : undefined
                          }
                        >
                          {item.text}
                        </div>
                      ))}
                    </div>
                  )}

                  {template.style.hasSearch && (
                    <div className="search-icon">🔍</div>
                  )}

                  {template.style.navPosition === "right" && (
                    <div className="nav-items-right">
                      {template.navItems.map((item, i) => (
                        <div
                          key={i}
                          className={
                            item.active ? "nav-item-active" : undefined
                          }
                        >
                          {item.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-wrap">
                <button
                  className="btn-tool-wrap"
                  title="Customize styles"
                  onClick={() => handleCopyClick(template)}
                >
                  <img src={copyIcon} alt="icon" className="btn-icon" />
                </button>
                <button
                  className="btn-tool-wrap"
                  title="Customize styles"
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
