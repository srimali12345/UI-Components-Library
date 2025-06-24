import React, { useEffect } from "react";
import { Search } from "lucide-react";

const InputPreview = ({ inputStyles = {}, placeholderText, inputType }) => {
  useEffect(() => {
    const customStyle = document.createElement("style");
    customStyle.innerHTML = `
      .custom-input-${inputType}:focus {
        border-color: ${inputStyles.focusBorderColor || "#6d45ff"} !important;
        outline: none;
      }
      .custom-input-${inputType}::placeholder {
        color: ${inputStyles.placeholderColor || "#999"};
        font-size: ${inputStyles.placeholderFontSize || inputStyles.fontSize || "14px"};
        opacity: ${inputStyles.placeholderOpacity || "0.7"};
        font-style: ${inputStyles.placeholderFontStyle || "normal"};
      }
    `;

    customStyle.id = "input-hover-styles";
    document.head.appendChild(customStyle);

    return () => {
      const styleElement = document.getElementById("input-hover-styles");
      if (styleElement) styleElement.remove();
    };
  }, [inputStyles, inputType]);

  const computePadding = () => {
    if (inputType !== "Search" || !inputStyles.showSearchIcon) return inputStyles.padding || "0px 20px";

    const iconSize = inputStyles.iconSize || 20;
    const iconPadding = iconSize + 10;

    return inputStyles.iconPosition === "left"
      ? `0px 12px 0px ${iconPadding}px`
      : `0px ${iconPadding}px 0px 12px`;
  };

  const borderRadius =
    inputStyles.topLeftRadius ||
    inputStyles.topRightRadius ||
    inputStyles.bottomRightRadius ||
    inputStyles.bottomLeftRadius
      ? `${inputStyles.topLeftRadius || "4px"} ${inputStyles.topRightRadius || "4px"} ${inputStyles.bottomRightRadius || "4px"} ${inputStyles.bottomLeftRadius || "4px"}`
      : inputStyles.borderRadius || "4px";

  const styles = {
    width: inputStyles.width || "200px",
    height: inputStyles.height || "40px",
    padding: computePadding(),
    margin: inputStyles.margin || "0",
    backgroundColor: inputStyles.backgroundColor || "#ffffff",
    color: inputStyles.color || "#333333",
    borderWidth: inputStyles.borderWidth || "1px",
    borderStyle: inputStyles.borderStyle || "solid",
    borderColor: inputStyles.borderColor || "#cccccc",
    borderRadius: borderRadius,
    fontSize: inputStyles.fontSize || "14px",
    fontWeight: inputStyles.fontWeight || "normal",
    fontFamily: inputStyles.fontFamily || "Arial",
    display: inputStyles.display || "block",
  };

  const iconStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    ...(inputStyles.iconPosition === "left" ? { left: "20px" } : { right: "20px" }),
    color: inputStyles.iconColor || "#8E9196",
    pointerEvents: "none",
  };

  return (
    <div className="input-container" style={{ position: "relative", display: "inline-block" }}>
      {inputType === "Search" && inputStyles.showSearchIcon && (
        <Search size={inputStyles.iconSize || 18} style={iconStyles} />
      )}
      <input
        type={inputType.toLowerCase() === "search" ? "text" : inputType.toLowerCase()}
        placeholder={placeholderText || `Enter ${inputType}`}
        style={styles}
        className={`custom-input-${inputType}`}
      />
    </div>
  );
};

export default InputPreview;
