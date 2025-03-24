import React, { useState } from "react";
import codeIcon from "../../images/blue-code-icon.png";

const CodePanel = ({ buttonStyles = {}, buttonText, buttonType }) => {
  const [activeTab, setActiveTab] = useState("css");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedHTML, setGeneratedHTML] = useState("");

  const {
    topLeftRadius = "0px",
    topRightRadius = "0px",
    bottomLeftRadius = "0px",
    bottomRightRadius = "0px",
    color = "#000",
    fontWeight = "400",
    fontSize = "16px",
    height = "40px",
    width = "100px",
    borderWidth = "0px",
    borderColor = "blue",
    backgroundColor = "blue",
    textDecoration = "none",
    padding = "8px 12px",
    icon = "null",
    iconPosition = "",
  } = buttonStyles;

  const generateBorderRadius = () => {
    return `${topLeftRadius} ${topRightRadius} ${bottomLeftRadius} ${bottomRightRadius}`;
  };

  const generateCSS = () => {
    const commonStyles = `
            color: ${color}; 
            font-weight: ${fontWeight};
            font-size: ${fontSize};
    `;

    const heightAndWidthStyle =
      buttonType !== "link"
        ? `height: ${height};
            width: ${width};`
        : "";

    const borderRadiusStyle =
      buttonType !== "link" ? `border-radius: ${generateBorderRadius()};` : "";

    switch (buttonType) {
      case "outline":
        return `
          .button.outline {
            border: ${borderWidth} solid ${borderColor};
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
            text-decoration: ${textDecoration};
            ${commonStyles}
          }
        `;
      default:
        return `
          .button.primary {
            background-color: ${backgroundColor} ;
            border: ${borderWidth} solid ${borderColor};
            ${borderRadiusStyle}
            ${heightAndWidthStyle}  
            ${commonStyles}}`;
    }
  };

  const generateSASS = () => {
    const commonVars = `
      $button-color: ${color};
      $button-padding: ${padding};
    `;

    const heightAndWidthVar =
      buttonType !== "link"
        ? `$button-height: ${height}; $button-width: ${width};`
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
          $button-border: 2px solid ${borderColor};
          ${borderRadiusVar}
          ${heightAndWidthVar}
          
          .button.outline {
            background-color: $button-bg;
            border: $button-border;
            border-radius: $button-border-radius;
            color: $button-color;
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
          $button-bg: ${backgroundColor};
          $button-border: 1px solid ${borderColor};
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

  const generateHTML = () => {
    const iconHtml = `<img src="./path" alt="icon" />`;

    if (!icon || icon === "null" || icon === "") {
      return `<button class="button ${buttonType}">${buttonText}</button>`;
    }

    return iconPosition === "left"
      ? `<button class="button ${buttonType}">${iconHtml}${buttonText}</button>`
      : `<button class="button ${buttonType}">${buttonText}${iconHtml}</button>`;
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  return (
    <div className="code-container">
      <div className="code-header-wrap">
        <img src={codeIcon} alt="icon" className="icon" />
        <span>Code Generator</span>
      </div>
      <div className="code-content-wrap">
        <div className="tab-wrap">
          <div className="btn-group">
            <button className="btn-outline">HTML</button>
            <button className="btn-outline">CSS</button>
            <button className="btn-outline">SCSS</button>
          </div>
          <button
            className="copy-button"
            onClick={() => handleCopy(generateHTML())}
          >
            Copy
          </button>
        </div>
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
    </div>
  );
};

export default CodePanel;
