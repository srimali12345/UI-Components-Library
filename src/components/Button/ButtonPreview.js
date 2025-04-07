import React, { useEffect } from "react";

const ButtonPreview = ({ buttonStyles = {}, buttonText, buttonType }) => {
  const icon = buttonStyles.icon || null;
  const iconPosition = buttonStyles.iconPosition || "right";
  const buttonTypeClass = buttonType || "Primary";

  const styles = {
    ...buttonStyles,
    borderRadius:
      buttonStyles.topLeftRadius ||
      buttonStyles.topRightRadius ||
      buttonStyles.bottomRightRadius ||
      buttonStyles.bottomLeftRadius
        ? `${buttonStyles.topLeftRadius || 0} 
                   ${buttonStyles.topRightRadius || 0} 
                   ${buttonStyles.bottomRightRadius || 0} 
                   ${buttonStyles.bottomLeftRadius || 0}`
        : buttonStyles.borderRadius || "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border:
      buttonType === "Primary" && !buttonStyles.borderWidth
        ? "none"
        : `${
            buttonStyles.borderWidth ||
            (buttonType === "Outline" ? "2px" : "0px")
          } solid ${buttonStyles.borderColor || "#6d45ff"}`,
  };

  useEffect(() => {
    const customStyle = document.createElement("style");
    customStyle.innerHTML = `
      .dashboard-btn.${buttonTypeClass}:hover {
        background-color: ${buttonStyles.hoverBackgroundColor || ""} !important;
        color: ${buttonStyles.hoverTextColor || ""} !important;
        border-color: ${buttonStyles.hoverBorderColor || ""} !important;
        ${buttonType === "Link" ? "text-decoration: underline !important;" : ""}
      }
    `;

    if (!document.getElementById("button-hover-styles")) {
      customStyle.id = "button-hover-styles";
      document.head.appendChild(customStyle);
    } else {
      document.getElementById("button-hover-styles").innerHTML =
        customStyle.innerHTML;
    }

    return () => {
      const styleElement = document.getElementById("button-hover-styles");
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [buttonStyles, buttonType, buttonTypeClass]);

  return (
    <div className="button-container">
      <button style={styles} className={`dashboard-btn ${buttonTypeClass}`}>
        {icon && iconPosition === "left" && (
          <img
            src={icon}
            alt="icon"
            style={{
              height: "12px",
              marginRight: "5px",
            }}
          />
        )}

        {buttonText || (buttonType ? `${buttonType} Button` : "Default Button")}

        {icon && iconPosition === "right" && (
          <img
            src={icon}
            alt="icon"
            style={{ height: "12px", marginLeft: "5px" }}
          />
        )}
      </button>
    </div>
  );
};

export default ButtonPreview;
