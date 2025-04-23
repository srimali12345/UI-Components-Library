
import React, { useState } from "react";
import { Copy } from "lucide-react";
import { generateHTML, generateCSS, generateSCSS } from "./InputCodeGenerator";

const InputCodePanel = ({
  inputStyles = {},
  placeholderText = "",
  inputType = "Text" // fallback
}) => {
  const [activeTab, setActiveTab] = useState("html");

  const getCode = () => {
    switch (activeTab) {
      case "css":
        return generateCSS({ inputType, inputStyles });
      case "scss":
        return generateSCSS({ inputType, inputStyles });
      case "html":
      default:
        return generateHTML({ inputType, placeholderText });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    // (Optional) You may want to show a toast here instead of alert!
    alert("Code copied!");
  };

  return (
    <div>
      <div className="btn-group" style={{ marginBottom: "1rem" }}>
        {["html", "css", "scss"].map((tab) => (
          <button
            key={tab}
            className={`btn-outline ${activeTab === tab ? "active" : ""}`}
            style={{
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
        <button
          className="copy-btn"
          style={{
            marginLeft: "auto",
            border: "1px solid #6d45ff",
            color: "#6d45ff",
            padding: "0.5rem 1.2rem",
            borderRadius: "6px",
            background: "white",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem"
          }}
          onClick={handleCopy}
        >
          Copy <Copy size={16} />
        </button>
      </div>

      <div className="code-block" style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        background: "#f9f9fa",
        padding: "1rem",
        minHeight: "140px",
        textAlign: "left"
      }}>
        <pre style={{ margin: 0, fontSize: "14px", whiteSpace: "pre-wrap" }}>{getCode()}</pre>
      </div>
    </div>
  );
};

export default InputCodePanel;