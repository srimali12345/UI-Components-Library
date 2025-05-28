import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import { buttonTypes } from "./ButtonList";
import CodeModal from "./CodeModal";
import "../../styles/components/buttonsCustomization.scss";
import FavouriteButton from "../../commonComponents/FavouriteButton";
import { buttonDefaults } from "../../constants";
import { useSavedStyles } from "../../contexts/useSavedStyles";

const ButtonSelection = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedButtonType, setSelectedButtonType] = useState("");
  const [selectedButtonStyles, setSelectedButtonStyles] = useState({});

  const CustomizedButton = ({ buttonType, label, defaultStyles, onClick, className = "" }) => {
    const { savedStyles, isLoading } = useSavedStyles("button", buttonType, defaultStyles);

    console.log(`ButtonSelection - ${buttonType}:`, {
      savedStyles,
      defaultStyles,
      borderRadius: savedStyles.borderRadius,
      defaultBorderRadius: defaultStyles.borderRadius
    });

    if (isLoading) {
      return (
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-md"></div>
      );
    }

   const generateBorderRadius = (styles, defaultStyles) => {
  if (styles.borderRadius) {
    if (typeof styles.borderRadius === 'string') {
      const isValid = /^(\d+px\s?){1,4}$/.test(styles.borderRadius.trim());
      if (isValid) {
        return styles.borderRadius;
      } else {
        console.warn(`Invalid borderRadius string: ${styles.borderRadius}. Falling back.`);
      }
    } else if (typeof styles.borderRadius === 'object') {
      const { topLeft, topRight, bottomRight, bottomLeft } = styles.borderRadius;
      const result = `${topLeft || 0}px ${topRight || 0}px ${bottomRight || 0}px ${bottomLeft || 0}px`;
      return result;
    }
  }
  return defaultStyles.borderRadius || "6px";
};


    // Apply ALL styles from savedStyles without any type-specific overrides
    const buttonStyle = {
      backgroundColor: savedStyles.backgroundColor || defaultStyles.backgroundColor,
      color: savedStyles.color || defaultStyles.color,
      border: savedStyles.borderWidth && savedStyles.borderWidth !== "0px" 
        ? `${savedStyles.borderWidth} solid ${savedStyles.borderColor || defaultStyles.borderColor}`
        : savedStyles.borderWidth === "0px" 
        ? "none" 
        : `${defaultStyles.borderWidth || "0px"} solid ${defaultStyles.borderColor || "transparent"}`,
      borderRadius: generateBorderRadius(savedStyles, defaultStyles),
      fontWeight: savedStyles.fontWeight || defaultStyles.fontWeight,
      fontSize: savedStyles.fontSize || defaultStyles.fontSize,
      fontFamily: savedStyles.fontFamily || defaultStyles.fontFamily,
      height: savedStyles.height || defaultStyles.height,
      width: savedStyles.width || defaultStyles.width,
      padding: savedStyles.padding || defaultStyles.padding,
      textDecoration: savedStyles.textDecoration || defaultStyles.textDecoration,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease-in-out",
      outline: "none",
      // Apply any additional custom properties
      ...Object.keys(savedStyles).reduce((acc, key) => {
        // Include any other style properties that might be saved
        if (!['backgroundColor', 'color', 'borderWidth', 'borderColor', 'borderRadius', 
              'fontWeight', 'fontSize', 'fontFamily', 'height', 'width', 'padding', 'textDecoration'].includes(key)) {
          acc[key] = savedStyles[key];
        }
        return acc;
      }, {})
    };

    return (
      <button 
        style={buttonStyle}
        className={className}
        onClick={onClick}
        onMouseEnter={(e) => {
          // Apply hover effects based on button type
          if (buttonType === "Primary") {
            e.target.style.opacity = "0.9";
          } else if (buttonType === "Outline") {
            e.target.style.backgroundColor = savedStyles.color || defaultStyles.color;
            e.target.style.color = savedStyles.backgroundColor || "#ffffff";
          } else if (buttonType === "Link") {
            e.target.style.opacity = "0.8";
          }
        }}
        onMouseLeave={(e) => {
          // Reset to original styles
          e.target.style.backgroundColor = buttonStyle.backgroundColor;
          e.target.style.color = buttonStyle.color;
          e.target.style.opacity = "1";
        }}
      >
        {label}
      </button>
    );
  };

  const handleOpenModal = (type) => {
    setSelectedButtonType(type);
    setModalVisible(true);

    // Get the saved styles for the modal
    const stylesStorageKey = `button-styles-${type}`;
    const savedStyles = localStorage.getItem(stylesStorageKey);

    if (savedStyles) {
      try {
        const parsedStyles = JSON.parse(savedStyles);
        setSelectedButtonStyles({ ...buttonDefaults[type], ...parsedStyles });
      } catch (error) {
        console.error("Error parsing saved styles:", error);
        setSelectedButtonStyles(buttonDefaults[type] || {});
      }
    } else {
      setSelectedButtonStyles(buttonDefaults[type] || {});
    }
  };

  return (
    <div className="button-dashboard">
      <h2 className="component-title">Buttons</h2>
      <div className="button-list">
        {buttonTypes.map((btn) => (
          <div key={btn.type} className="btn-list-wrap">
            <p className="btn-wrap-title">{btn.label}</p>
            <div className="btn-wrap">
              <CustomizedButton
                buttonType={btn.type}
                label={btn.label}
                defaultStyles={buttonDefaults[btn.type] || {}}
                onClick={() => navigate(`/customize/${btn.type}`)}
              />

              <div className="flex-wrap">
                <FavouriteButton
                  component={{
                    id: `button-${btn.type}`,
                    type: "Button",
                    subtype: btn.type,
                    label: btn.label,
                  }}
                />
                <button
                  className="btn-tool-wrap"
                  title="View code"
                  onClick={() => handleOpenModal(btn.type)}
                >
                  <img src={copyIcon} alt="icon" className="btn-icon" />
                </button>
                <button
                  className="btn-tool-wrap"
                  title="Customize styles"
                  onClick={() => navigate(`/customize/${btn.type}`)}
                >
                  <img src={toolIcon} alt="icon" className="btn-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalVisible && (
        <CodeModal
          buttonType={selectedButtonType}
          buttonStyles={selectedButtonStyles}
          buttonText={`${selectedButtonType} Button`}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default ButtonSelection;