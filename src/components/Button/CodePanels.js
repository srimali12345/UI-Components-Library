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

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
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
        {activeTab === "html" && (
          <div className="code-block">
            <pre>{generateHTML({ buttonType, buttonText, buttonStyles })}</pre>
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
    </>
  );
};

export default CodePanel;
