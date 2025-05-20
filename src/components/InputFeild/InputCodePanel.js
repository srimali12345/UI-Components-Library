import React, { useState } from "react";
import { Copy } from "lucide-react";
import { generateHTML, generateCSS, generateSCSS } from "./InputCodeGenerator";

const InputCodePanel = ({
  inputStyles = {},
  placeholderText = "",
  inputType = "Text",
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
        return generateHTML({ inputType, placeholderText, inputStyles });
    }
  };

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
              {generateHTML({ inputType, placeholderText, inputStyles })}
            </pre>
            <button
              className="copy-button"
              onClick={() =>
                handleCopy(
                  generateHTML({ inputType, placeholderText, inputStyles })
                )
              }
            >
              <Copy size={16} />
            </button>
          </div>
        )}

        {activeTab === "css" && (
          <div className="code-block">
            <pre>{generateCSS({ inputType, inputStyles })}</pre>
            <button
              className="copy-button"
              onClick={() =>
                handleCopy(generateCSS({ inputType, inputStyles }))
              }
            >
              <Copy size={16} />
            </button>
          </div>
        )}

        {activeTab === "scss" && (
          <div className="code-block">
            <pre
              style={{ margin: 0, fontSize: "14px", whiteSpace: "pre-wrap" }}
            >
              {generateSCSS({ inputType, inputStyles })}
            </pre>
            <button
              className="copy-button"
              onClick={() =>
                handleCopy(generateSCSS({ inputType, inputStyles }))
              }
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "white",
                border: "1px solid #6d45ff",
                color: "#6d45ff",
                padding: "0.3rem 0.6rem",
                borderRadius: "6px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <Copy size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default InputCodePanel;
