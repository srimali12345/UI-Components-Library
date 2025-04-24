import React, { useState } from "react";
import { Copy, Search } from "lucide-react";
import { generateHTML, generateCSS, generateSCSS } from "./InputCodeGenerator";
import "../../styles/components/inputCustomization.scss";

const InputCodeModal = ({
  inputType,
  inputStyles = {},
  placeholderText,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("css");

  const searchInputStyles = inputType.toLowerCase() === "search" 
    ? {
        ...inputStyles,
        showSearchIcon: true,
        iconPosition: "right",
        iconSize: 18,
        iconColor: "#8E9196"
      }
    : inputStyles;

  const getCode = () => {
    switch (activeTab) {
      case "css":
        return generateCSS({ inputType, inputStyles: searchInputStyles });
      case "scss":
        return generateSCSS({ inputType, inputStyles: searchInputStyles });
      case "html":
        return generateHTML({ 
          inputType, 
          placeholderText, 
          inputStyles: searchInputStyles 
        });
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
          <h3>Input - {inputType}</h3>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>

        <div className="input-preview-container">
          <div style={{ position: "relative", display: "inline-block" }}>
            {inputType.toLowerCase() === "search" && (
              <Search 
                size={18} 
                className="svg-icon-search-modal" 
                
              
              />
            )}
            <input
              type={inputType.toLowerCase()}
              className={`custom-input ${inputType}`}
              placeholder={placeholderText}
              style={{
                backgroundColor: inputStyles.backgroundColor || "#ffffff",
                color: inputStyles.color || "#333333",
                border: `${inputStyles.borderWidth || "1px"} ${
                  inputStyles.borderStyle || "solid"
                } ${inputStyles.borderColor || "#cccccc"}`,
                borderRadius: inputStyles.borderRadius || "4px",
                padding: inputType === "Search" ? "0px 40px 0px 12px" : "0px 12px",
                width: "200px",
                height: "40px",
              }}
            />
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

export default InputCodeModal;
