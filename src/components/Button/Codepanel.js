import React, { useState } from "react";

const CodePanel = ({
  buttonStyles,
  buttonText,
  buttonType,
  buttonDefaults,
}) => {
  const [activeTab, setActiveTab] = useState("css");

  const generateBorderRadius = () => {
    const {
      topLeftRadius = "0px",
      topRightRadius = "0px",
      bottomLeftRadius = "0px",
      bottomRightRadius = "0px",
      borderRadius = "0px",
    } = buttonStyles;

    return `${topLeftRadius} ${topRightRadius} ${bottomRightRadius} ${bottomLeftRadius}`;
  };

  const generateCSS = () => {
    const commonStyles = `
    color: ${buttonStyles.color || "#000"}; 
    font-family: ${buttonStyles.fontFamily || "Arial, sans-serif"};
    font-weight:${buttonStyles.fontWeight || "400"};
    font-size:${buttonStyles.fontSize || "14px"};
    `;
    const heightAndWidthStyle =
      buttonType !== "link"
        ? `height: ${buttonStyles.height || "40px"}; width: ${
            buttonStyles.width || "100px"
          };`
        : "";

    const borderRadiusStyle =
      buttonType !== "link" ? `border-radius: ${generateBorderRadius()};` : "";

    switch (buttonType) {
      case "outline":
        return `
  .button.outline {
    border: 1px solid ${buttonStyles.borderColor || "#000"};
    ${borderRadiusStyle}
    ${heightAndWidthStyle}
    ${commonStyles}
  }
        `;
      case "link":
        return `
  .button.link {
    background-color: transparent;
    border: none;
    text-decoration: ${buttonStyles.textDecoration || "none"};
    ${commonStyles}
  }
        `;
      default:
        return `
  .button.primary {
    background-color: ${buttonStyles.backgroundColor || "#007bff"};
    border: 1px solid ${buttonStyles.borderColor || "#007bff"};
    ${borderRadiusStyle}
    ${heightAndWidthStyle}
    ${commonStyles}
  }
        `;
    }
  };

  const generateSASS = () => {
    const commonVars = `
  $button-color: ${buttonStyles.color || "#000"};
  $button-font-family: ${buttonStyles.fontFamily || "Arial, sans-serif"};
  $button-padding: ${buttonStyles.padding || "8px 12px"};
    `;

    const heightAndWidthVar =
      buttonType !== "link"
        ? `$button-height: ${buttonStyles.height || "40px"}; $button-width: ${
            buttonStyles.width || "100px"
          };`
        : "";

    const borderRadiusVar =
      buttonType !== "link"
        ? `$button-border-radius: ${generateBorderRadius()};`
        : "";

    switch (buttonType) {
      case "outline":
        return `
  ${commonVars}
  $button-bg: transparent;
  $button-border: 2px solid ${buttonStyles.borderColor || "#000"};
  ${borderRadiusVar}
  ${heightAndWidthVar}
  
  .button.outline {
    background-color: $button-bg;
    border: $button-border;
    border-radius: $button-border-radius;
    color: $button-color;
    font-family: $button-font-family;
    height: $button-height;
    width: $button-width;
    padding: $button-padding;
  }
        `;
      case "link":
        return `${commonVars}
  $button-bg: transparent;
  $button-border: none;
  $button-text-decoration: underline;
  
  .button.link {
    background-color: $button-bg;
    border: $button-border;
    color: $button-color;
    text-decoration: $button-text-decoration;
    font-family: $button-font-family;
    padding: $button-padding;
  }
        `;
      default:
        return `${commonVars}
  $button-bg: ${buttonStyles.backgroundColor || "#007bff"};
  $button-border: 1px solid ${buttonStyles.borderColor || "#007bff"};
  ${borderRadiusVar}
  ${heightAndWidthVar}
  
  .button.primary {
    background-color: $button-bg;
    border: $button-border;
    border-radius: $button-border-radius;
    color: $button-color;
    font-family: $button-font-family;
    height: $button-height;
    width: $button-width;
    padding: $button-padding;
  }
        `;
    }
  };

  const generateHTML = () => `
<button class="button ${buttonType}">${buttonText}</button>
`;

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  return (
    <div className="code-container">
      <div className="code-section">
        <div className="code-header">
          <h3>HTML</h3>
          <button
            className="copy-button"
            onClick={() => handleCopy(generateHTML())}
          >
            Copy
          </button>
        </div>
        <pre className="code">{generateHTML()}</pre>
      </div>

      <div className="code-section">
        <div className="code-header">
          <h3>CSS / SASS</h3>
          <div className="tab-buttons">
            <button
              className={activeTab === "css" ? "active" : ""}
              onClick={() => setActiveTab("css")}
            >
              CSS
            </button>
            <button
              className={activeTab === "sass" ? "active" : ""}
              onClick={() => setActiveTab("sass")}
            >
              SASS
            </button>
          </div>
          <button
            className="copy-button"
            onClick={() =>
              handleCopy(activeTab === "css" ? generateCSS() : generateSASS())
            }
          >
            Copy
          </button>
        </div>
        <pre className="code">
          {activeTab === "css" ? generateCSS() : generateSASS()}
        </pre>
      </div>
    </div>
  );
};

export default CodePanel;
