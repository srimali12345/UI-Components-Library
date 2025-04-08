import React from "react";
import { Copy } from "lucide-react";

const CodeViewer = ({ activeTab, html, css, sass }) => {
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

  return (
    <div className="relative-content">
      <button onClick={copyToClipboard} title="Copy to clipboard">
        <Copy size={18} />
      </button>
      <pre>
        <code>{getActiveCode()}</code>
      </pre>
    </div>
  );
};

export default CodeViewer;
