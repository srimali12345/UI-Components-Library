import React, { useState, useEffect } from "react";

const ToolBox = ({
  buttonStyles,
  setButtonStyles,
  showBackgroundColor,
  showBorderColor,
  showFontStyling,
  showUnderline,
}) => {
  const [fontList, setFontList] = useState([
    "Arial",
    "Roboto",
    "Open Sans",
    "Lato",
    "Poppins",
    "Montserrat",
    "Oswald",
    "Raleway",
    "Merriweather",
    "Tahoma",
    "Verdana",
  ]);

  useEffect(() => {
    if (buttonStyles.fontFamily) {
      const link = document.createElement("link");
      link.href = `https://fonts.googleapis.com/css2?family=${buttonStyles.fontFamily.replace(
        /\s+/g,
        "+"
      )}&display=swap`;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, [buttonStyles.fontFamily]);

  return (
    <div className="sidebar">
      <h3>ToolBox</h3>

      {showBackgroundColor && (
        <div>
          <label>Background Color:</label>
          <input
            type="color"
            value={buttonStyles.backgroundColor}
            onChange={(e) =>
              setButtonStyles({
                ...buttonStyles,
                backgroundColor: e.target.value,
              })
            }
          />
        </div>
      )}
      {showBorderColor && (
        <div>
          <label>Border Color:</label>
          <input
            type="color"
            value={buttonStyles.borderColor }
            onChange={(e) =>
              setButtonStyles({
                ...buttonStyles,
                borderColor: e.target.value,
              })
            }
          />

          <label>Border Radius:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={parseInt(buttonStyles.borderRadius) || 0}
            onChange={(e) =>
              setButtonStyles((prev) => ({
                ...prev,
                borderRadius: `${e.target.value}px`,
              }))
            }
          />

          <label>Top Left Corner Radius:</label>
          <input
            type="number"
            min="0"
            value={parseInt(buttonStyles.topLeftRadius) || 0}
            onChange={(e) =>
              setButtonStyles((prev) => ({
                ...prev,
                topLeftRadius: `${e.target.value}px`,
              }))
            }
          />

          <label>Top Right Corner Radius:</label>
          <input
            type="number"
            min="0"
            value={parseInt(buttonStyles.topRightRadius) || 0}
            onChange={(e) =>
              setButtonStyles((prev) => ({
                ...prev,
                topRightRadius: `${e.target.value}px`,
              }))
            }
          />

          <label>Bottom Left Corner Radius:</label>
          <input
            type="number"
            min="0"
            value={parseInt(buttonStyles.bottomLeftRadius) || 0}
            onChange={(e) =>
              setButtonStyles((prev) => ({
                ...prev,
                bottomLeftRadius: `${e.target.value}px`,
              }))
            }
          />

          <label>Bottom Right Corner Radius:</label>
          <input
            type="number"
            min="0"
            value={parseInt(buttonStyles.bottomRightRadius) || 0}
            onChange={(e) =>
              setButtonStyles((prev) => ({
                ...prev,
                bottomRightRadius: `${e.target.value}px`,
              }))
            }
          />
          <div>
            <label>Height:</label>
            <input
              type="number"
              min="0"
              value={parseInt(buttonStyles.height) || 40}
              onChange={(e) =>
                setButtonStyles((prev) => ({
                  ...prev,
                  height: `${e.target.value}px`,
                }))
              }
            />

            <label>Width:</label>
            <input
              type="number"
              min="0"
              value={parseInt(buttonStyles.width) || 100}
              onChange={(e) =>
                setButtonStyles((prev) => ({
                  ...prev,
                  width: `${e.target.value}px`,
                }))
              }
            />
          </div>
        </div>
      )}

      {showFontStyling && (
        <div>
          <label>Font Color:</label>
          <input
            type="color"
            value={buttonStyles.color}
            onChange={(e) =>
              setButtonStyles({ ...buttonStyles, color: e.target.value })
            }
          />

          <label>Font Family:</label>
          <select
            value={buttonStyles.fontFamily || "Arial"}
            onChange={(e) =>
              setButtonStyles((prev) => ({
                ...prev,
                fontFamily: e.target.value,
              }))
            }
          >
            {fontList.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>

          <label>Font Size:</label>
          <input
            type="number"
            min="8"
            max="100"
            value={parseInt(buttonStyles.fontSize) || 16}
            onChange={(e) =>
              setButtonStyles((prev) => ({
                ...prev,
                fontSize: `${e.target.value}px`,
              }))
            }
          />

          <label>Font Weight:</label>
          <select
            value={buttonStyles.fontWeight || "normal"}
            onChange={(e) =>
              setButtonStyles((prev) => ({
                ...prev,
                fontWeight: e.target.value,
              }))
            }
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="bolder">Bolder</option>
            <option value="lighter">Lighter</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
          </select>
        </div>
      )}
      {showUnderline && (
        <div>
          <label>Underline:</label>
          <input
            type="checkbox"
            checked={buttonStyles.textDecoration === "underline"}
            onChange={(e) =>
              setButtonStyles({
                ...buttonStyles,
                textDecoration: e.target.checked ? "underline" : "none",
              })
            }
          />
        </div>
      )}
    </div>
  );
};

export default ToolBox;
