import React, { useState } from "react";
import { Copy } from "lucide-react";
import {
  generateHTML,
  generateCSS,
  generateSCSS,
  generateBorderRadius,
} from "./CodeGenerator";

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

 const previewButtonStyle = {
  backgroundColor:
    buttonType === "Primary"
      ? buttonStyles.backgroundColor || "#6d45ff"
      : "transparent",
  color:
    buttonStyles.color || (buttonType === "Primary" ? "#ffffff" : "#6d45ff"),
  border:
    buttonType === "Link"
      ? "none"
      : `${buttonStyles.borderWidth || "0px"} ${buttonStyles.borderStyle || "solid"} ${buttonStyles.borderColor || "#6d45ff"}`,
 borderRadius: `${buttonStyles.topLeftRadius} ${buttonStyles.topRightRadius} ${buttonStyles.bottomRightRadius} ${buttonStyles.bottomLeftRadius}`,
  fontWeight: buttonStyles.fontWeight || "normal",
  fontSize: buttonStyles.fontSize || "16px",
  height: buttonStyles.height || "40px",
  width: buttonStyles.width || "auto",
  padding: buttonStyles.padding || "6px 16px",
  fontFamily: buttonStyles.fontFamily || "Arial",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration:
    buttonType === "Link" &&
    buttonStyles.textDecoration === "underline"
      ? "underline"
      : "none",
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
            <button
              style={previewButtonStyle}
              className={`dashboard-btn ${buttonType}`}
            >
              {buttonText || buttonType || "Click Me"}
            </button>
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
          <div>{getCode()}</div>
        </pre>
      </div>
    </div>
  );
};

export default CodeModal;
