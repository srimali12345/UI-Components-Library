import React, { useState } from "react";
import { Copy } from "lucide-react";
import { generateHTML, generateCSS, generateSCSS } from "./CardCodeGenerator";

const CardCodePanel = ({
  cardStyles = {},
  cardTitle = "",
  cardContent = "",
  cardType = "Basic"
}) => {
  const [activeTab, setActiveTab] = useState("html");

  const getCode = () => {
    switch (activeTab) {
      case "css":
        return generateCSS({ cardType, cardStyles });
      case "scss":
        return generateSCSS({ cardType, cardStyles });
      case "html":
      default:
        return generateHTML({ cardType, cardTitle, cardContent, cardStyles });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
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

      <div className="code-block" 
      >
        <pre style={{ margin: 0, fontSize: "14px", whiteSpace: "pre-wrap" }}>{getCode()}</pre>
      </div>
    </div>
  );
};

export default CardCodePanel;