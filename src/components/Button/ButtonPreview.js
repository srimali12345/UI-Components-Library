const ButtonPreview = ({ buttonStyles, buttonText, uploadedIcon }) => {
  const icon = uploadedIcon || buttonStyles.icon;
  const iconPosition = buttonStyles.iconPosition || "right"; 
  return (
    <div>
      <div className="button-container">
        <button
          style={{
            ...buttonStyles,
            borderRadius: `${buttonStyles.topLeftRadius || 0} 
                         ${buttonStyles.topRightRadius || 0} 
                         ${buttonStyles.bottomRightRadius || 0} 
                         ${buttonStyles.bottomLeftRadius || 0}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
          {buttonText}
          {icon && iconPosition === "right" && (
            <img
              src={buttonStyles.icon}
              alt="icon"
              style={{ height: "12px", marginLeft: "5px" }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ButtonPreview;
