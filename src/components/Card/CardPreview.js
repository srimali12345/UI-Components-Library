import React, { useEffect } from "react";

const CardPreview = ({ cardStyles = {}, cardTitle, cardContent, cardType }) => {
  useEffect(() => {
    const customStyle = document.createElement("style");
    customStyle.innerHTML = `
      .custom-card-${cardType}:hover {
        ${cardStyles.hoverEffect === "shadow" 
          ? `box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);` 
          : cardStyles.hoverEffect === "scale" 
            ? `transform: scale(1.03);` 
            : cardStyles.hoverEffect === "border" 
              ? `border-color: #4a6cf7;` 
              : ''}
      }
    `;

    if (!document.getElementById("card-hover-styles")) {
      customStyle.id = "card-hover-styles";
      document.head.appendChild(customStyle);
    } else {
      document.getElementById("card-hover-styles").innerHTML =
        customStyle.innerHTML;
    }

    return () => {
      const styleElement = document.getElementById("card-hover-styles");
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [cardStyles, cardType]);

  const isImageCard = cardType === "Image";
  const isActionCard = cardType === "Action";
  const isPricingCard = cardType === "Pricing";
  const isBasicCard = cardType === "Basic";
  const isOverlay = cardType === "ImageOverlay";

  const cardStyle = {
    width: cardStyles.width || "300px",
    minHeight: cardStyles.minHeight || "200px",
    backgroundColor: cardStyles.backgroundColor || "#ffffff",
    color: cardStyles.textColor || "#333333",
    borderWidth: cardStyles.borderWidth || "1px",
    borderStyle: cardStyles.borderStyle || "solid",
    borderColor: cardStyles.borderColor || "#e0e0e0",
    borderRadius:
      cardStyles.topLeftRadius ||
      cardStyles.topRightRadius ||
      cardStyles.bottomRightRadius ||
      cardStyles.bottomLeftRadius
        ? `${cardStyles.topLeftRadius || "8px"} 
           ${cardStyles.topRightRadius || "8px"} 
           ${cardStyles.bottomRightRadius || "8px"} 
           ${cardStyles.bottomLeftRadius || "8px"}`
        : cardStyles.borderRadius || "8px",
    boxShadow: cardStyles.boxShadow || "0 2px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "all 0.3s ease",
    position: "relative",
    margin: "0 auto",
    display: isBasicCard ? "flex" : "block",
    flexDirection: isBasicCard ? "column" : "initial",
  };

  const headerStyle = isBasicCard ? {
    padding: "15px",
    borderBottom: `1px solid ${cardStyles.borderColor || "#e0e0e0"}`,
    fontWeight: "bold"
  } : {};
  
  const footerStyle = isBasicCard ? {
    padding: "15px",
    borderTop: `1px solid ${cardStyles.borderColor || "#e0e0e0"}`,
    fontSize: "12px",
    color: "#8E9196"
  } : {};

  const getImageUrl = () => {
    if (cardStyles.customImage) {
      return cardStyles.customImage;
    }
    return "https://source.unsplash.com/random/300x200/?nature";
  };

  const imageStyle = isImageCard ? {
    height: cardStyles.imageHeight || "200px",
    width: "100%",
    backgroundColor: "#e9e9e9",
    backgroundImage: `url('${getImageUrl()}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  } : {};

  const overlayStyle = isOverlay ? {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: cardStyles.overlayColor || "rgba(0, 0, 0, 0.4)",
    zIndex: 1,
  } : {};

  const bodyStyle = {
    padding: cardStyles.padding || "20px",
    position: "relative",
    color: cardStyles.textColor || "#333333",
    flex: isBasicCard ? "1" : "initial",
  };

  const titleStyle = {
    fontSize: cardStyles.titleFontSize || "18px",
    fontWeight: cardStyles.titleFontWeight || "bold",
    color: cardStyles.titleColor || "#000000",
    marginTop: 0,
    marginBottom: "10px",
    fontFamily: cardStyles.fontFamily || "Arial, sans-serif"
  };

  const contentStyle = {
    fontSize: cardStyles.contentFontSize || "14px",
    lineHeight: cardStyles.contentLineHeight || "1.5",
    marginBottom: (isActionCard || isPricingCard) ? "15px" : "0",
    fontFamily: cardStyles.fontFamily || "Arial, sans-serif"
  };

  const actionsStyle = {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: cardStyles.buttonBackgroundColor || "#f1f1f1",
    color: cardStyles.buttonTextColor || "#333333",
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: cardStyles.primaryButtonBackgroundColor || "#4a6cf7",
    color: cardStyles.primaryButtonTextColor || "#ffffff",
  };

  return (
    <div className="card-container">
      <div 
        className={`custom-card custom-card-${cardType}`}
        style={cardStyle}
      >
        {isBasicCard && <div style={headerStyle}>{cardStyles.headerText || "Header"}</div>}
        
        {isImageCard && (
          <div style={imageStyle}>
            {isOverlay && <div style={overlayStyle}></div>}
          </div>
        )}
        
        <div style={bodyStyle}>
          <h3 style={titleStyle}>{cardTitle || `${cardType} Card`}</h3>
          <p style={contentStyle}>{cardContent || `This is a ${cardType} card with sample content.`}</p>
          {(isActionCard || isPricingCard) && (
            <div style={actionsStyle}>
              <button style={buttonStyle}>Learn More</button>
              {isPricingCard && (
                <button style={primaryButtonStyle}>Get Started</button>
              )}
            </div>
          )}
        </div>
        
        {isBasicCard && <div style={footerStyle}>{cardStyles.footerText || "Footer"}</div>}
      </div>
    </div>
  );
};

export default CardPreview;
