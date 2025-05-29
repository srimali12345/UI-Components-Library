import React, { useState } from "react";
import { Copy } from "lucide-react";
import {
  generateLoginHTML,
  generateLoginCSS,
  generateLoginSCSS,
} from "./LoginCodeGenerator";

const LoginCodeModal = ({ loginType, loginStyles = {}, onClose }) => {
  const [activeTab, setActiveTab] = useState("css");

  const getCode = () => {
    switch (activeTab) {
      case "css":
        return generateLoginCSS({ loginType, loginStyles });
      case "scss":
        return generateLoginSCSS({ loginType, loginStyles });
      case "html":
        return generateLoginHTML({ loginType, loginTitle: "Login Form", loginStyles });
      default:
        return "";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    alert("Code copied!");
  };

  // Preview styles
  const previewFormStyle = {
    backgroundColor: loginStyles.backgroundColor || "#ffffff",
    border: `${loginStyles.borderWidth || "1px"} solid ${loginStyles.borderColor || "#e1e5e9"}`,
    borderRadius: loginStyles.borderRadius || "8px",
    padding: "16px",
    width: "200px",
    boxShadow: loginStyles.boxShadow || "0 4px 12px rgba(0, 0, 0, 0.1)",
    transform: "scale(0.7)",
    transformOrigin: "center top"
  };

  const previewTitleStyle = {
    color: loginStyles.titleColor || "#1a1a1a",
    fontSize: "16px",
    fontWeight: loginStyles.titleFontWeight || "600",
    margin: "0 0 12px 0",
    textAlign: "center"
  };

  const previewInputStyle = {
    backgroundColor: loginStyles.inputBackgroundColor || "#ffffff",
    border: `1px solid ${loginStyles.inputBorderColor || "#d1d5db"}`,
    borderRadius: loginStyles.inputBorderRadius || "6px",
    padding: "6px",
    width: "100%",
    fontSize: "10px",
    marginBottom: "8px",
    boxSizing: "border-box"
  };

  const previewButtonStyle = {
    backgroundColor: loginStyles.buttonBackgroundColor || "#3b82f6",
    color: loginStyles.buttonColor || "#ffffff",
    border: "none",
    borderRadius: loginStyles.buttonBorderRadius || "6px",
    padding: "6px 12px",
    width: "100%",
    fontSize: "10px",
    fontWeight: loginStyles.buttonFontWeight || "500",
    cursor: "pointer"
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>LOGIN1 - {loginType} Form</h3>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>

        <div className="btn-preview-container">
          <div className="login-preview-wrap">
            <form style={previewFormStyle}>
              <h3 style={previewTitleStyle}>Login Form</h3>
              <div style={{ marginBottom: "8px" }}>
                <label style={{ fontSize: "8px", color: loginStyles.labelColor || "#374151" }}>Username:</label>
                <input style={previewInputStyle} placeholder="Enter username" readOnly />
              </div>
              <div style={{ marginBottom: "8px" }}>
                <label style={{ fontSize: "8px", color: loginStyles.labelColor || "#374151" }}>Password:</label>
                <input style={previewInputStyle} type="password" placeholder="Enter password" readOnly />
              </div>
              <div style={{ marginBottom: "8px", fontSize: "8px", color: loginStyles.rememberMeColor || "#374151" }}>
                <input type="checkbox" style={{ marginRight: "4px" }} readOnly />
                Remember me
              </div>
              <button style={previewButtonStyle}>Login</button>
            </form>
          </div>
        </div>

        <div className="tabs-copy-container">
          <div className="btn-group">
            <button
              className={
                activeTab === "html" ? "active btn-outline" : "btn-outline"
              }
              onClick={() => setActiveTab("html")}
            >
              HTML
            </button>
            <button
              className={
                activeTab === "css" ? "active btn-outline" : "btn-outline"
              }
              onClick={() => setActiveTab("css")}
            >
              CSS
            </button>
            <button
              className={
                activeTab === "scss" ? "active btn-outline" : "btn-outline"
              }
              onClick={() => setActiveTab("scss")}
            >
              SCSS
            </button>
          </div>
          <button className="copy-btn" onClick={handleCopy}>
            Copy <Copy size={16} />
          </button>
        </div>

        <pre className="code-block">
          <div>{getCode()}</div>
        </pre>
      </div>
    </div>
  );
};

export default LoginCodeModal;