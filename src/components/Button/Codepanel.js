import React, { useState } from "react";
import { Copy, EyeOff, Eye } from "lucide-react";

const CodePanel = ({ buttonStyles = {}, buttonText, buttonType }) => {
  const [activeTab, setActiveTab] = useState("html");
  const [isCodeVisible, setIsCodeVisible] = useState(true);

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
    borderColor = "#6d45ff",
    backgroundColor = "#6d45ff",
    textDecoration = "none",
    fontFamily = "Arial",
    icon = null,
    iconPosition = "right",
    hoverBackgroundColor = "red",
    hoverTextColor = "white",
    hoverBorderColor = "red",
  } = buttonStyles;

  const generateBorderRadius = () => {
    return `${topLeftRadius} ${topRightRadius} ${bottomRightRadius} ${bottomLeftRadius}`;
  };

  const generateHTML = () => {
    const buttonTypeClass = buttonType || "Primary";
    const buttonDisplayText =
      buttonText || (buttonType ? `${buttonType} Button` : "Default Button");

    if (!icon || icon === "null") {
      return `<button class="button ${buttonTypeClass}">
  ${buttonDisplayText}
</button>`;
    }

    return iconPosition === "left"
      ? `<button class="button ${buttonTypeClass}">
  <img src="icon.png" alt="icon" />
  ${buttonDisplayText}
</button>`
      : `<button class="button ${buttonTypeClass}">
  ${buttonDisplayText}
  <img src="icon.png" alt="icon" />
</button>`;
  };

  const generateCSS = () => {
    const commonStyles = `
  color: ${color};
  font-weight: ${fontWeight};
  font-size: ${fontSize};
  font-family: ${fontFamily};`;

    const heightAndWidthStyle =
      buttonType !== "Link"
        ? `
  height: ${height};
  width: ${width};`
        : "";

    const borderRadiusStyle =
      buttonType !== "Link"
        ? `
  border-radius: ${generateBorderRadius()};`
        : "";

    switch (buttonType) {
      case "Outline":
        return `.button.Outline {
  background-color: transparent;
  border: ${borderWidth} solid ${borderColor};${borderRadiusStyle}${heightAndWidthStyle}${commonStyles}
}  .button.Outline:hover {
  border-color: ${hoverBorderColor};
  color: ${hoverTextColor};  
}   `;
      case "Link":
        return `.button.Link {
  background-color: transparent;
  border: none;
  text-decoration: ${textDecoration};${commonStyles}
}`;
      default:
        return `.button.Primary {
  background-color: ${backgroundColor};
  border: ${borderWidth} solid ${borderColor};${borderRadiusStyle}${heightAndWidthStyle}${commonStyles}
}

  .button.Primary:hover {
    background-color: ${hoverBackgroundColor};
    color: ${hoverTextColor};  
    border-color: ${hoverBorderColor || borderColor};
  }`;
    }
  };

  const generateSCSS = () => {
    const commonVars = `$button-color: ${color};
$button-font-weight: ${fontWeight};
$button-font-size: ${fontSize};
$button-font-family: ${fontFamily};`;

    const heightAndWidthVar =
      buttonType !== "Link"
        ? `
$button-height: ${height};
$button-width: ${width};`
        : "";

    const borderRadiusVar =
      buttonType !== "Link"
        ? `
$button-border-radius: ${generateBorderRadius()};`
        : "";

    switch (buttonType) {
      case "Outline":
        return `${commonVars}${heightAndWidthVar}${borderRadiusVar}
$button-bg: transparent;
$button-border: ${borderWidth} solid ${borderColor};

.button {
  &.Outline {
    background-color: $button-bg;
    border: $button-border;
    border-radius: $button-border-radius;
    color: $button-color;
    font-weight: $button-font-weight;
    font-size: $button-font-size;
    font-family: $button-font-family;
    height: $button-height;
    width: $button-width;
  }
}`;
      case "Link":
        return `${commonVars}
$button-bg: transparent;
$button-text-decoration: ${textDecoration};

.button {
  &.Link {
    background-color: $button-bg;
    border: none;
    color: $button-color;
    text-decoration: $button-text-decoration;
    font-weight: $button-font-weight;
    font-size: $button-font-size;
    font-family: $button-font-family;
  }
}`;
      default:
        return `${commonVars}${heightAndWidthVar}${borderRadiusVar}
$button-bg: ${backgroundColor};
$button-border: ${borderWidth} solid ${borderColor};

.button {
  &.Primary {
    background-color: $button-bg;
    border: $button-border;
    border-radius: $button-border-radius;
    color: $button-color;
    font-weight: $button-font-weight;
    font-size: $button-font-size;
    font-family: $button-font-family;
    height: $button-height;
    width: $button-width;
  }
}`;
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

  return (
    <div className="code-panel">
      <div className="code-panel-header">
        <div className="code-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 18L22 12L16 6"
              stroke="#3E41FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 6L2 12L8 18"
              stroke="#3E41FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3>Generated Code</h3>
        <div className="toggle-code-button" onClick={toggleCodeVisibility}>
          {isCodeVisible ? (
            <>
              <span>Hide Code</span>
              <EyeOff size={18} />
            </>
          ) : (
            <>
              <span>View Code</span>
              <Eye size={18} />
            </>
          )}
        </div>
      </div>

      {isCodeVisible && (
        <div className="code-panel-content">
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
            {activeTab === "html" && (
              <div className="code-block">
                <pre>{generateHTML()}</pre>
                <button
                  className="copy-button"
                  onClick={() => handleCopy(generateHTML())}
                >
                  <Copy size={16} />
                </button>
              </div>
            )}

            {activeTab === "css" && (
              <div className="code-block">
                <pre>{generateCSS()}</pre>
                <button
                  className="copy-button"
                  onClick={() => handleCopy(generateCSS())}
                >
                  <Copy size={16} />
                </button>
              </div>
            )}

            {activeTab === "scss" && (
              <div className="code-block">
                <pre>{generateSCSS()}</pre>
                <button
                  className="copy-button"
                  onClick={() => handleCopy(generateSCSS())}
                >
                  <Copy size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePanel;
