const ButtonPreview = ({
  buttonStyles = {},
  buttonText,
  uploadedIcon,
  buttonType,
}) => {
  const icon = uploadedIcon || buttonStyles.icon;
  const iconPosition = buttonStyles.iconPosition || "right";
  const buttonTypeClass = buttonType || "Primary";

  const styles = {
    ...buttonStyles,
    borderRadius: `${buttonStyles.topLeftRadius || 0} 
                 ${buttonStyles.topRightRadius || 0} 
                 ${buttonStyles.bottomRightRadius || 0} 
                 ${buttonStyles.bottomLeftRadius || 0}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const customStyle = document.createElement("style");
  customStyle.innerHTML = `
    .dashboard-btn.${buttonTypeClass}:hover {
      background-color: ${buttonStyles.hoverBackgroundColor || ""} !important;
      color: ${buttonStyles.hoverTextColor || ""} !important;
      border-color: ${buttonStyles.hoverBorderColor || ""} !important;
    }
  `;
  if (!document.getElementById("button-hover-styles")) {
    customStyle.id = "button-hover-styles";
    document.head.appendChild(customStyle);
  } else {
    document.getElementById("button-hover-styles").innerHTML =
      customStyle.innerHTML;
  }

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
