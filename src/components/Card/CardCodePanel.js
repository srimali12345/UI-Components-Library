import React, { useState } from "react";
import { Copy } from "lucide-react";
import { generateHTML, generateCSS, generateSCSS } from "./CardCodeGenerator";

const CardCodePanel = ({
  cardStyles = {},
  cardTitle = "",
  cardContent = "",
  cardType = "Basic",
}) => {
  const [activeTab, setActiveTab] = useState("html");

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  return (
    <>
      <div className="btn-group" style={{ marginBottom: "1rem" }}>
        {["html", "css", "scss"].map((tab) => (
          <button
            key={tab}
            className={`btn-outline ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="code-viewer">
        {activeTab === "html" && (
          <div className="code-block">
            <pre>
              {generateHTML({ cardType, cardTitle, cardContent, cardStyles })}
            </pre>
            <button
              className="copy-button"
              onClick={() =>
                handleCopy(
                  generateHTML({ cardType, cardTitle, cardContent, cardStyles })
                )
              }
            >
              <Copy size={16} />
            </button>
          </div>
        )}

        {activeTab === "css" && (
          <div className="code-block">
            <pre>{generateCSS({ cardType, cardStyles })}</pre>
            <button
              className="copy-button"
              onClick={() => handleCopy(generateCSS({ cardType, cardStyles }))}
            >
              <Copy size={16} />
            </button>
          </div>
        )}

        {activeTab === "scss" && (
          <div className="code-block">
            <pre>{generateSCSS({ cardType, cardStyles })}</pre>
            <button
              className="copy-button"
              onClick={() => handleCopy(generateSCSS({ cardType, cardStyles }))}
            >
              <Copy size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CardCodePanel;
