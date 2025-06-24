import React, { useState } from "react";
import { Copy } from "lucide-react";
import { generateHTML, generateCSS, generateSCSS } from "./InputCodeGenerator";
import InputPreview from "./InputPreview";
import "../../styles/components/inputCustomization.scss";

const InputCodeModal = ({
  inputType,
  inputStyles = {},
  placeholderText,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("css");

  const getCode = () => {
    switch (activeTab) {
      case "css":
        return generateCSS({ inputType, inputStyles });
      case "scss":
        return generateSCSS({ inputType, inputStyles });
      case "html":
        return generateHTML({
          inputType,
          placeholderText,
          inputStyles,
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
          <InputPreview
            inputStyles={inputStyles}
            placeholderText={placeholderText}
            inputType={inputType}
          />
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
