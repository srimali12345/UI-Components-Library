const ButtonPreview = ({ buttonStyles, buttonText, uploadedIcon }) => {
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
          {buttonStyles.icon && buttonStyles.iconPosition === "left" && (
            <img
              src={buttonStyles.icon}
              alt="icon"
              style={{
                height: "12px",
                marginRight: "5px",
              }}
            />
          )}
          {buttonText}
          {buttonStyles.icon && buttonStyles.iconPosition === "right" && (
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
