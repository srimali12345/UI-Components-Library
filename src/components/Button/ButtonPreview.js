const ButtonPreview = ({ buttonStyles, buttonText }) => {
  return (
    <div>
      <div className="button">
        <button
          style={{
            ...buttonStyles,
            borderRadius: `${buttonStyles.topLeftRadius || 0} 
                         ${buttonStyles.topRightRadius || 0} 
                         ${buttonStyles.bottomRightRadius || 0} 
                         ${buttonStyles.bottomLeftRadius || 0}`,
          }}
        >
          Button 1
        </button>
      </div>
    </div>
  );
};

export default ButtonPreview;
