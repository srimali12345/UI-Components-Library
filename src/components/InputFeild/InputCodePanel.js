import React, { useState } from "react";
import { Copy } from "lucide-react";

const InputCodePanel = ({ inputStyles = {}, placeholderText, inputType }) => {
  const [activeTab, setActiveTab] = useState("html");

  const generateHTML = () => {
    return `<input
  type="${inputType.toLowerCase()}"
  class="custom-input ${inputType}"
  placeholder="${placeholderText}"
/>`;
  };

  const generateCSS = () => {
    const styles = { ...inputStyles };
    return `.custom-input.${inputType} {
  width: ${styles.width || "200px"};
  height: ${styles.height || "40px"};
  padding: ${styles.padding || "8px 12px"};
  background-color: ${styles.backgroundColor || "#ffffff"};
  color: ${styles.color || "#333333"};
  border: ${styles.borderWidth || "1px"} ${styles.borderStyle || "solid"} ${
      styles.borderColor || "#cccccc"
    };
  border-radius: ${styles.borderRadius || "4px"};
  font-size: ${styles.fontSize || "14px"};
  font-weight: ${styles.fontWeight || "normal"};
  font-family: ${styles.fontFamily || "Arial"};
  display: ${styles.display || "block"};
}

.custom-input.${inputType}:focus {
  outline: none;
  border-color: ${styles.focusBorderColor || "#6d45ff"};
}

.custom-input.${inputType}::placeholder {
  color: ${styles.placeholderColor || "#999999"};
  font-size: ${styles.placeholderFontSize || styles.fontSize || "14px"};
  opacity: ${styles.placeholderOpacity || "0.7"};
  font-style: ${styles.placeholderFontStyle || "normal"};
}`;
  };

  const generateSCSS = () => {
    const styles = { ...inputStyles };
    return `$input-bg: ${styles.backgroundColor || "#ffffff"};
$input-color: ${styles.color || "#333333"};
$input-border: ${styles.borderWidth || "1px"} ${
      styles.borderStyle || "solid"
    } ${styles.borderColor || "#cccccc"};
$input-radius: ${styles.borderRadius || "4px"};
$placeholder-color: ${styles.placeholderColor || "#999999"};

.custom-input {
  &.${inputType} {
    width: ${styles.width || "200px"};
    height: ${styles.height || "40px"};
    padding: ${styles.padding || "8px 12px"};
    background-color: $input-bg;
    color: $input-color;
    border: $input-border;
    border-radius: $input-radius;
    font-size: ${styles.fontSize || "14px"};
    font-weight: ${styles.fontWeight || "normal"};
    font-family: ${styles.fontFamily || "Arial"};
    display: ${styles.display || "block"};
    
    &:focus {
      outline: none;
      border-color: ${styles.focusBorderColor || "#6d45ff"};
    }
    
    &::placeholder {
      color: $placeholder-color;
      font-size: ${styles.placeholderFontSize || styles.fontSize || "14px"};
      opacity: ${styles.placeholderOpacity || "0.7"};
      font-style: ${styles.placeholderFontStyle || "normal"};
    }
  }
}`;
  };

  const getCode = () => {
    switch (activeTab) {
      case "css":
        return generateCSS();
      case "scss":
        return generateSCSS();
      case "html":
      default:
        return generateHTML();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    alert("Code copied!");
  };

  return (
    <>
      <div className="btn-group">
        <div
          className={`btn-outline ${activeTab === "html" ? "active" : ""}`}
          onClick={() => setActiveTab("html")}
        >
          HTML
        </div>
        <div
          className={`btn-outline ${activeTab === "css" ? "active" : ""}`}
          onClick={() => setActiveTab("css")}
        >
          CSS
        </div>
        <div
          className={`btn-outline ${activeTab === "scss" ? "active" : ""}`}
          onClick={() => setActiveTab("scss")}
        >
          SCSS
        </div>
      </div>

      <div className="code-viewer">
        <div className="code-block">
          <pre>{getCode()}</pre>
          <button className="copy-button" onClick={handleCopy}>
            <Copy size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default InputCodePanel;
