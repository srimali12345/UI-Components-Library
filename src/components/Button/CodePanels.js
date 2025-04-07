import React, { useState } from "react";
import { Copy, EyeOff, Eye } from "lucide-react";
import {
  generateBorderRadius,
  generateHTML,
  generateCSS,
  generateSCSS,
} from "./CodeGenerator";

const CodePanel = ({ buttonStyles = {}, buttonText, buttonType }) => {
  const [activeTab, setActiveTab] = useState("html");
  const [isCodeVisible, setIsCodeVisible] = useState(false);

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
                <pre>
                  {generateHTML({ buttonType, buttonText, buttonStyles })}
                </pre>
                <button
                  className="copy-button"
                  onClick={() =>
                    handleCopy(
                      generateHTML({ buttonType, buttonText, buttonStyles })
                    )
                  }
                >
                  <Copy size={16} />
                </button>
              </div>
            )}

            {activeTab === "css" && (
              <div className="code-block">
                <pre>{generateCSS({ buttonType, buttonStyles })}</pre>
                <button
                  className="copy-button"
                  onClick={() =>
                    handleCopy(generateCSS({ buttonType, buttonStyles }))
                  }
                >
                  <Copy size={16} />
                </button>
              </div>
            )}

            {activeTab === "scss" && (
              <div className="code-block">
                <pre>{generateSCSS({ buttonType, buttonStyles })}</pre>
                <button
                  className="copy-button"
                  onClick={() =>
                    handleCopy(generateSCSS({ buttonType, buttonStyles }))
                  }
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
