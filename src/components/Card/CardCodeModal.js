import React, { useState } from "react";
import { Copy } from "lucide-react";
import { generateHTML, generateCSS, generateSCSS } from "./CardCodeGenerator";

const CardCodeModal = ({
  cardType,
  cardStyles = {},
  cardTitle,
  cardContent,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("css");

  const getCode = () => {
    switch (activeTab) {
      case "css":
        return generateCSS({ cardType, cardStyles });
      case "scss":
        return generateSCSS({ cardType, cardStyles });
      case "html":
        return generateHTML({ cardType, cardTitle, cardContent, cardStyles });
      default:
        return "";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    alert("Code copied!");
  };

  const getImageUrl = () => {
    if (cardStyles.customImage) {
      return cardStyles.customImage;
    }
    return "https://source.unsplash.com/random/300x200/?nature";
  };

  const renderCardPreview = () => {
    const isImageCard = cardType === "Image" || cardType === "ImageOverlay";
    const isActionCard = cardType === "Action";
    const isPricingCard = cardType === "Pricing";
    const isBasicCard = cardType === "Basic";
    const isOverlay = cardType === "ImageOverlay";

    return (
      <div
        className="preview-card"
        style={{
          backgroundColor: cardStyles.backgroundColor || "#ffffff",
          color: cardStyles.textColor || "#333333",
          borderWidth: cardStyles.borderWidth || "1px",
          borderStyle: cardStyles.borderStyle || "solid",
          borderColor: cardStyles.borderColor || "#e0e0e0",
          borderRadius: cardStyles.borderRadius || "8px",
          boxShadow: cardStyles.boxShadow || "0 2px 8px rgba(0, 0, 0, 0.1)",
           width: cardStyles.width ,
           height: cardStyles.height,
          overflow: "hidden",
          position: "relative",
          display: isBasicCard ? "flex" : "block",
          flexDirection: isBasicCard ? "column" : "initial",
        }}
      >
        {isBasicCard && (
          <div
            className="preview-card-header"
            style={{
              padding: "15px",
              borderBottom: `1px solid ${cardStyles.borderColor || "#e0e0e0"}`,
              fontWeight: "bold",
            }}
          >
            {cardStyles.headerText || "Header"}
          </div>
        )}

        {isImageCard && (
          <div
            className="preview-card-image"
            style={{
              height: cardStyles.imageHeight || "200px",
              backgroundColor: "#e9e9e9",
              backgroundImage: `url('${getImageUrl()}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            {isOverlay && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: cardStyles.overlayColor || "rgba(0, 0, 0, 0.4)",
                  zIndex: 1,
                }}
              />
            )}
          </div>
        )}

        <div
          className="preview-card-body"
          style={{
            padding: cardStyles.padding || "20px",
            position: "relative",
            color: cardStyles.textColor || "#333333",
            flex: isBasicCard ? "1" : "initial",
          }}
        >
          <h3
            style={{
              fontSize: cardStyles.titleFontSize || "18px",
              fontWeight: cardStyles.titleFontWeight || "bold",
              color: cardStyles.titleColor || "#000000",
              marginTop: 0,
              marginBottom: "10px",
              fontFamily: cardStyles.fontFamily || "Arial, sans-serif",
            }}
          >
            {cardTitle}
          </h3>
          <p
            style={{
              fontSize: cardStyles.contentFontSize || "14px",
              lineHeight: cardStyles.contentLineHeight || "1.5",
              marginBottom: isActionCard || isPricingCard ? "15px" : "0",
              fontFamily: cardStyles.fontFamily || "Arial, sans-serif",
            }}
          >
            {cardContent}
          </p>
          {(isActionCard || isPricingCard) && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <button
                style={{
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor:
                    cardStyles.buttonBackgroundColor || "#f1f1f1",
                  color: cardStyles.buttonTextColor || "#333333",
                  cursor: "pointer",
                }}
              >
                Learn More
              </button>
              {isPricingCard && (
                <button
                  style={{
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor:
                      cardStyles.primaryButtonBackgroundColor || "#4a6cf7",
                    color: cardStyles.primaryButtonTextColor || "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  Get Started
                </button>
              )}
            </div>
          )}
        </div>

        {isBasicCard && (
          <div
            className="preview-card-footer"
            style={{
              padding: "15px",
              borderTop: `1px solid ${cardStyles.borderColor || "#e0e0e0"}`,
              fontSize: "12px",
              color: "#8E9196",
            }}
          >
            {cardStyles.footerText || "Footer"}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal card-modal">
        <div className="modal-header">
          <h3>Card - {cardType}</h3>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>

        <div className="card-preview-container">{renderCardPreview()}</div>

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

export default CardCodeModal;
