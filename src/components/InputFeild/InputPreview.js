import React, { useEffect } from "react";

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
        font-size: ${
          inputStyles.placeholderFontSize || inputStyles.fontSize || "14px"
        };
        opacity: ${inputStyles.placeholderOpacity || "0.7"};
        font-style: ${inputStyles.placeholderFontStyle || "normal"};
      }
    `;

    if (!document.getElementById("input-hover-styles")) {
      customStyle.id = "input-hover-styles";
      document.head.appendChild(customStyle);
    } else {
      document.getElementById("input-hover-styles").innerHTML =
        customStyle.innerHTML;
    }

    return () => {
      const styleElement = document.getElementById("input-hover-styles");
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [inputStyles, inputType]);

  const styles = {
    width: inputStyles.width || "200px",
    height: inputStyles.height || "40px",
    padding: inputStyles.padding || "8px 12px",
    margin: inputStyles.margin || "0",
    backgroundColor: inputStyles.backgroundColor || "#ffffff",
    color: inputStyles.color || "#333333",
    borderWidth: inputStyles.borderWidth || "1px",
    borderStyle: inputStyles.borderStyle || "solid",
    borderColor: inputStyles.borderColor || "#cccccc",
    borderRadius:
      inputStyles.topLeftRadius ||
      inputStyles.topRightRadius ||
      inputStyles.bottomRightRadius ||
      inputStyles.bottomLeftRadius
        ? `${inputStyles.topLeftRadius || "4px"} 
           ${inputStyles.topRightRadius || "4px"} 
           ${inputStyles.bottomRightRadius || "4px"} 
           ${inputStyles.bottomLeftRadius || "4px"}`
        : inputStyles.borderRadius || "4px",
    fontSize: inputStyles.fontSize || "14px",
    fontWeight: inputStyles.fontWeight || "normal",
    fontFamily: inputStyles.fontFamily || "Arial",
    display: inputStyles.display || "block",
  };

  return (
    <div className="input-container">
      <input
        type={inputType.toLowerCase()}
        placeholder={placeholderText || `Enter ${inputType}`}
        style={styles}
        className={`custom-input-${inputType}`}
      />
    </div>
  );
};

export default InputPreview;
