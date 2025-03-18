import React, { useState, useEffect } from "react";

const ToolBox = ({
  buttonStyles,
  setButtonStyles,
  showBackgroundColor,
  showBorderColor,
  showFontStyling,
  showUnderline,
  buttonText,
  setButtonText,
  showUploadIcon,
  iconPosition
}) => {
  const [fontList] = useState([
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
  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setButtonStyles((prev) => ({
          ...prev,
          icon: reader.result, // Store base64 image URL
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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
      <h3 className="sidebar-title">ToolBox</h3>
      <div className="input-group">
        <label>Button Text:</label>
        <input
          type="text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
        />
      </div>
      {showBackgroundColor && (
        <div className="input-group">
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

{showFontStyling && (
        <div className="font-styling">
          <div className="input-group">
            <label>Font Color:</label>
            <input
              type="color"
              value={buttonStyles.color}
              onChange={(e) =>
                setButtonStyles({ ...buttonStyles, color: e.target.value })
              }
            />
          </div>


          <div className="input-group">
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
          </div>

          <div className="input-group">
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
        </div>
      )}

      {showBorderColor && (
        <>


<div className="border-settings">
      

      <div className="input-group">
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
      </div>

      <div className="input-group">
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
      </div>

      <div className="input-group">
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
      </div>

      <div className="input-group">
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
      </div>
    </div>
    <div className="size-settings">
        <div className="input-group">
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
        </div>

        <div className="input-group">
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
      <div className="input-group">
          <label>Upload Icon:</label>
          <input type="file" accept="image/*" onChange={handleIconUpload} />
          {buttonStyles.icon && (
            <div className="icon-preview">
              <img src={buttonStyles.icon} alt="Button Icon" width="50" height="50" />
            </div>
          )}
         
      
        </div>
        <div className="input-group" >
        <label>Icon Position:</label>
          <select
            value={buttonStyles.iconPosition || "left"}
            onChange={(e) =>
              setButtonStyles({ ...buttonStyles, iconPosition: e.target.value })
            }
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
        </>
       

        
      )}
    

    

      {showUnderline && (
        <div className="checkbox-group">
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
