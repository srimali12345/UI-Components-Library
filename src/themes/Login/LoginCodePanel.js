import React, { useState } from "react";
import { Copy } from "lucide-react";
import {
  generateLoginHTML,
  generateLoginCSS,
  generateLoginSCSS,
} from "./LoginCodeGenerator";

const LoginCodePanel = ({ loginStyles = {}, loginTitle, loginType }) => {
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
            <pre>{generateLoginHTML({ loginType, loginTitle, loginStyles })}</pre>
            <button
              className="copy-button"
              onClick={() =>
                handleCopy(
                  generateLoginHTML({ loginType, loginTitle, loginStyles })
                )
              }
            >
              <Copy size={16} />
            </button>
          </div>
        )}

        {activeTab === "css" && (
          <div className="code-block">
            <pre>{generateLoginCSS({ loginType, loginStyles })}</pre>
            <button
              className="copy-button"
              onClick={() =>
                handleCopy(generateLoginCSS({ loginType, loginStyles }))
              }
            >
              <Copy size={16} />
            </button>
          </div>
        )}

        {activeTab === "scss" && (
          <div className="code-block">
            <pre>{generateLoginSCSS({ loginType, loginStyles })}</pre>
            <button
              className="copy-button"
              onClick={() =>
                handleCopy(generateLoginSCSS({ loginType, loginStyles }))
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

export default LoginCodePanel;