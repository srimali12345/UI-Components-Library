import React, { useEffect } from "react";

const LoginPreview = ({ loginStyles = {}, loginTitle, loginType }) => {
  const styles = {
    backgroundColor: loginStyles.backgroundColor || "#ffffff",
    border: `${loginStyles.borderWidth || "1px"} solid ${loginStyles.borderColor || "#e1e5e9"}`,
    borderRadius: loginStyles.borderRadius || "8px",
    padding: loginStyles.padding || "32px",
    width: loginStyles.width || "400px",
    boxShadow: loginStyles.boxShadow || "0 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    maxWidth: "100%"
  };

  const titleStyles = {
    color: loginStyles.titleColor || "#1a1a1a",
    fontSize: loginStyles.titleFontSize || "24px",
    fontWeight: loginStyles.titleFontWeight || "600",
    margin: "0 0 24px 0",
    textAlign: "center"
  };

  const labelStyles = {
    color: loginStyles.labelColor || "#374151",
    fontSize: loginStyles.labelFontSize || "14px",
    fontWeight: "500",
    display: "block",
    marginBottom: "6px"
  };

  const inputStyles = {
    backgroundColor: loginStyles.inputBackgroundColor || "#ffffff",
    border: `1px solid ${loginStyles.inputBorderColor || "#d1d5db"}`,
    borderRadius: loginStyles.inputBorderRadius || "6px",
    padding: loginStyles.inputPadding || "12px",
    width: "100%",
    fontSize: loginStyles.inputFontSize || "16px",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box"
  };

  const buttonStyles = {
    backgroundColor: loginStyles.buttonBackgroundColor || "#3b82f6",
    color: loginStyles.buttonColor || "#ffffff",
    border: "none",
    borderRadius: loginStyles.buttonBorderRadius || "6px",
    padding: loginStyles.buttonPadding || "12px 24px",
    width: "100%",
    fontSize: "16px",
    fontWeight: loginStyles.buttonFontWeight || "500",
    cursor: "pointer",
    transition: "opacity 0.2s"
  };

  const rememberMeStyles = {
    color: loginStyles.rememberMeColor || "#374151",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "16px 0"
  };

  useEffect(() => {
    const customStyle = document.createElement("style");
    customStyle.innerHTML = `
      .login-form-input:focus {
        border-color: ${loginStyles.buttonBackgroundColor || "#3b82f6"} !important;
        box-shadow: 0 0 0 3px ${loginStyles.buttonBackgroundColor || "#3b82f6"}20 !important;
      }
      .login-form-button:hover {
        opacity: 0.9 !important;
      }
    `;

    if (!document.getElementById("login-hover-styles")) {
      customStyle.id = "login-hover-styles";
      document.head.appendChild(customStyle);
    } else {
      document.getElementById("login-hover-styles").innerHTML = customStyle.innerHTML;
    }

    return () => {
      const styleElement = document.getElementById("login-hover-styles");
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [loginStyles]);

  return (
    <div className="login-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
      <form style={styles} className="login-form">
        <h2 style={titleStyles}>{loginTitle || "Login Form"}</h2>
        
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyles}>Username:</label>
          <input 
            style={inputStyles}
            className="login-form-input"
            type="text" 
            placeholder="Enter your username"
          />
        </div>
        
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyles}>Password:</label>
          <input 
            style={inputStyles}
            className="login-form-input"
            type="password" 
            placeholder="Enter your password"
          />
        </div>
        
        <div style={rememberMeStyles}>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        
        <button 
          style={buttonStyles}
          className="login-form-button"
          type="button"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPreview;