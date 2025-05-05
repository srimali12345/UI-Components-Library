import React from "react";

const Card = ({
  children,
  header,
  footer,

  backgroundColor = "#ffffff",
  backgroundGradient = null,

  borderWidth = "1px",
  borderStyle = "solid",
  borderColor = "#e0e0e0",
  borderRadius = "8px",
  topLeftRadius,
  topRightRadius,
  bottomLeftRadius,
  bottomRightRadius,

  boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)",
  hoverBoxShadow = "0 4px 12px rgba(0, 0, 0, 0.12)",

  width = "100%",
  maxWidth,
  minWidth,
  height = "auto",
  maxHeight,
  minHeight,

  padding = "24px",
  headerPadding,
  bodyPadding,
  footerPadding,
  margin = "0",
  gap = "16px",

  // Typography options
  fontFamily = "'Inter', 'Roboto', 'Arial', sans-serif",
  titleColor = "#333333",
  subtitleColor = "#666666",
  bodyColor = "#333333",
  textAlign = "left",

  hoverBorderColor,
  hoverBackgroundColor,
  hoverOutline = "none",
  hoverable = false,

  className = "",
  style = {},
  onClick,
}) => {

  const computedBorderRadius = `${topLeftRadius || borderRadius} ${
    topRightRadius || borderRadius
  } ${bottomRightRadius || borderRadius} ${bottomLeftRadius || borderRadius}`;

  const backgroundStyle = backgroundGradient || backgroundColor;

  const cardStyle = {
    width,
    maxWidth,
    minWidth,
    height,
    maxHeight,
    minHeight,
    padding: "0",
    margin,
    background: backgroundStyle,
    borderWidth,
    borderStyle,
    borderColor,
    borderRadius: computedBorderRadius,
    boxShadow,
    fontFamily,
    textAlign,
    ...style,
  };

  const headerStyle = {
    padding: headerPadding || padding,
    color: titleColor,
  };

  const bodyStyle = {
    padding: bodyPadding || padding,
    color: bodyColor,
    gap,
  };

  const footerStyle = {
    padding: footerPadding || padding,
    color: bodyColor,
  };

  return (
    <div
      className={`card ${hoverable ? "card--hoverable" : ""} ${className}`}
      style={cardStyle}
      onClick={onClick}
      data-hover-border-color={hoverBorderColor || borderColor}
      data-hover-background-color={hoverBackgroundColor || backgroundStyle}
      data-hover-box-shadow={hoverBoxShadow}
      data-hover-outline={hoverOutline}
    >
      {header && (
        <div className="card__header" style={headerStyle}>
          {header}
        </div>
      )}

      <div className="card__body" style={bodyStyle}>
        {children}
      </div>

      {footer && (
        <div className="card__footer" style={footerStyle}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
