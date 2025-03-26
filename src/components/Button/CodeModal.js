import React, { useState } from "react";
import { Copy } from "lucide-react";
import { generateHTML, generateCSS, generateSCSS } from "../Button/codeGenerators";

const CodeModal = ({ buttonType, buttonStyles = {}, buttonText, onClose }) => {
  const [activeTab, setActiveTab] = useState("css");

  const getCode = () => {
    switch (activeTab) {
      case "css":
        return generateCSS({ buttonType, buttonStyles });
      case "scss":
      case "sass":
        return generateSCSS({ buttonType, buttonStyles });
      case "html":
        return generateHTML({ buttonType, buttonText, buttonStyles });
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
          <h3>BTN1 - {buttonType} Button</h3>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>

        <div className="btn-preview-container">
          <div className="btn-wrap">
            <button className={`dashboard-btn ${buttonType}`}>
              {buttonText || buttonType || "Click Me"} Button
            </button>
          </div>
        </div>

        <div className="tabs-copy-container">
          <div className="tabs">
          <button 
              className={activeTab === "html" ? "active" : ""} 
              onClick={() => setActiveTab("html")}
            >
              HTML
            </button>
            <button 
              className={activeTab === "css" ? "active" : ""} 
              onClick={() => setActiveTab("css")}
            >
              CSS
            </button>
            <button 
              className={activeTab === "scss" ? "active" : ""} 
              onClick={() => setActiveTab("scss")}
            >
              SCSS
            </button>
           
          </div>
          <button className="copy-btn" onClick={handleCopy}>
            <Copy size={16} /> Copy Code
          </button>
        </div>
        
        <pre className="code-block">
          <div>{getCode()}</div>
        </pre>
      </div>
    </div>
  );
};

export default CodeModal;
