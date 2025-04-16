import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react";

const CodeViewer = ({ html, css, sass }) => {
  const getActiveCode = () => {
    switch (activeTab) {
      case "html":
        return html;
      case "css":
        return css;
      case "sass":
        return sass;
      default:
        return "";
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getActiveCode());
      alert("Code copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Failed to copy code");
    }
  };
  const [activeTab, setActiveTab] = useState("html");

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
      <div className="relative-content">
        <button onClick={copyToClipboard} title="Copy to clipboard">
          <Copy size={18} />
        </button>
        <pre>
          <code>{getActiveCode()}</code>
        </pre>
      </div>
    </>
  );
};

export default CodeViewer;
