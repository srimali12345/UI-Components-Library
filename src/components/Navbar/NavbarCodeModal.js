import React, { useState } from "react";
import { Copy } from "lucide-react";
import { generateHTML, generateCSS, generateSASS } from "./utils/CodeGenerator";

const NavbarCodeModal = ({ template, onClose }) => {
  const [activeTab, setActiveTab] = useState("html");

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

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Code for: {template.name}</h3>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>

        <div className="btn-preview-container">
          <div key={template.id} className="navbar-template">
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

              {template.style.hasSearch && (
                <div className="search-icon">🔍</div>
              )}

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
