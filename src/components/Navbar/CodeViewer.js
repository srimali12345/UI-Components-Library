import React, { useState } from "react";
import { Copy } from "lucide-react";

const CodeViewer = ({ html = "", css = "", sass = "" }) => {
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
          className={`btn-outline ${activeTab === "sass" ? "active" : ""}`}
          onClick={() => setActiveTab("sass")}
        >
          SCSS
        </div>
      </div>

      <div className="code-viewer">
        {activeTab === "html" && (
          <div className="code-block">
            <pre>{html}</pre>
            <button className="copy-button" onClick={() => handleCopy(html)}>
              <Copy size={16} />
            </button>
          </div>
        )}

        {activeTab === "css" && (
          <div className="code-block">
            <pre>{css}</pre>
            <button className="copy-button" onClick={() => handleCopy(css)}>
              <Copy size={16} />
            </button>
          </div>
        )}

        {activeTab === "sass" && (
          <div className="code-block">
            <pre>{sass}</pre>
            <button className="copy-button" onClick={() => handleCopy(sass)}>
              <Copy size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CodeViewer;
