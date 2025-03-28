import React from "react";
import { CopyToClipboard } from "./utils/CopyToClipboard";

const CodeViewer = ({ activeTab, html, css, sass }) => {
  const getActiveTabContent = () => {
    switch (activeTab) {
      case "html":
        return html;
      case "css":
        return css;
      case "sass":
        return sass;
      default:
        return html;
    }
  };

  return (
    <div className="code-viewer">
      <div className="code-header">
        <span className="code-label">{activeTab.toUpperCase()}</span>
        <CopyToClipboard text={getActiveTabContent()} />
      </div>
      <pre className="code-content">
        <div>{getActiveTabContent()}</div>
      </pre>
    </div>
  );
};

export default CodeViewer;
