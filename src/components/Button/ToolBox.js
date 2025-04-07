import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const ToolBox = ({
  buttonStyles,
  setButtonStyles,
  showBackgroundColor = true,
  showBorderColor = true,
  showFontStyling = true,
  showUnderline = false,
  buttonText,
  setButtonText,
  buttonType,
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

  const [activeTab, setActiveTab] = useState("design");
  const [expandedSections, setExpandedSections] = useState({
    text: true,
    background: false,
    border: false,
    dimensions: false,
    icon: false,
    font: false,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setButtonStyles((prev) => ({
          ...prev,
          icon: reader.result,
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
    <div className="toolbar">
      <div className="toolbar-tabs">
        <div
          className={`toolbar-tab ${activeTab === "design" ? "active" : ""}`}
          onClick={() => setActiveTab("design")}
        >
          <div className="tab-icon design-icon"></div>
          <span>Design</span>
        </div>
        <div
          className={`toolbar-tab ${activeTab === "animation" ? "active" : ""}`}
          onClick={() => setActiveTab("animation")}
        >
          <div className="tab-icon animation-icon"></div>
          <span>Animation</span>
        </div>
      </div>

      <div className="toolbar-content">
        {activeTab === "design" && (
          <div className="design-tab-content">
            <div className="collapsible-section">
              <div
                className="section-header"
                onClick={() => toggleSection("text")}
              >
                <span>Text</span>
                {expandedSections.text ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
              {expandedSections.text && (
                <div className="section-content">
                  <div className="input-group">
                    <label>Button Text:</label>
                    <input
                      type="text"
                      value={
                        buttonText ||
                        (buttonType ? `${buttonType} Button` : "Default Button")
                      }
                      onChange={(e) => setButtonText(e.target.value)}
                    />
                  </div>
                  {showUnderline && (
                    <div className="input-group">
                      <label>Underline:</label>
                      <input
                        type="checkbox"
                        checked={buttonStyles.textDecoration === "underline"}
                        onChange={(e) =>
                          setButtonStyles({
                            ...buttonStyles,
                            textDecoration: e.target.checked
                              ? "underline"
                              : "none",
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {showBackgroundColor && (
              <div className="collapsible-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection("background")}
                >
                  <span>Background</span>
                  {expandedSections.background ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
                {expandedSections.background && (
                  <div className="section-content">
                    <div className="input-group">
                      <label>Background Color:</label>
                      <input
                        type="color"
                        value={buttonStyles.backgroundColor || "#6d45ff"}
                        onChange={(e) =>
                          setButtonStyles({
                            ...buttonStyles,
                            backgroundColor: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="input-group">
                      <label>Hover Background Color:</label>
                      <input
                        type="color"
                        value={buttonStyles.hoverBackgroundColor || "#5a35e0"}
                        onChange={(e) =>
                          setButtonStyles({
                            ...buttonStyles,
                            hoverBackgroundColor: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {showFontStyling && (
              <div className="collapsible-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection("font")}
                >
                  <span>Typography</span>
                  {expandedSections.font ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
                {expandedSections.font && (
                  <div className="section-content">
                    <div className="input-group">
                      <label>Color:</label>
                      <input
                        type="color"
                        value={buttonStyles.color || "#ffffff"}
                        onChange={(e) =>
                          setButtonStyles({
                            ...buttonStyles,
                            color: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="input-group">
                      <label>Hover Text Color:</label>
                      <input
                        type="color"
                        value={buttonStyles.hoverTextColor || "#ffffff"}
                        onChange={(e) =>
                          setButtonStyles({
                            ...buttonStyles,
                            hoverTextColor: e.target.value,
                          })
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

                    <div className="input-group">
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
                    </div>
                  </div>
                )}
              </div>
            )}

            {showBorderColor && (
              <div className="collapsible-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection("border")}
                >
                  <span>Border</span>
                  {expandedSections.border ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
                {expandedSections.border && (
                  <div className="section-content">
                    <div className="input-group">
                      <label>Border Color:</label>
                      <input
                        type="color"
                        value={buttonStyles.borderColor || "#6d45ff"}
                        onChange={(e) =>
                          setButtonStyles({
                            ...buttonStyles,
                            borderColor: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="input-group">
                      <label> Hover Border Color:</label>
                      <input
                        type="color"
                        value={buttonStyles.hoverBorderColor || "#5a35e0"}
                        onChange={(e) =>
                          setButtonStyles({
                            ...buttonStyles,
                            hoverBorderColor: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="input-group">
                      <label>Border Radius:</label>
                      <div className="border-radius-inputs">
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
                          placeholder="TL"
                        />
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
                          placeholder="TR"
                        />
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
                          placeholder="BL"
                        />
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
                          placeholder="BR"
                        />
                        <span>px</span>
                      </div>
                    </div>

                    <div className="input-group">
                      <label>Border Width:</label>
                      <input
                        type="number"
                        min="0"
                        value={parseInt(buttonStyles.borderWidth) || 0}
                        onChange={(e) =>
                          setButtonStyles((prev) => ({
                            ...prev,
                            borderWidth: `${e.target.value}px`,
                          }))
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="collapsible-section">
              <div
                className="section-header"
                onClick={() => toggleSection("dimensions")}
              >
                <span>Dimensions</span>
                {expandedSections.dimensions ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
              {expandedSections.dimensions && (
                <div className="section-content">
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
                      value={parseInt(buttonStyles.width) || 150}
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
            </div>

            <div className="collapsible-section">
              <div
                className="section-header"
                onClick={() => toggleSection("icon")}
              >
                <span>Icon</span>
                {expandedSections.icon ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
              {expandedSections.icon && (
                <div className="section-content">
                  <div className="input-group">
                    <label>Upload Icon:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIconUpload}
                    />
                    {buttonStyles.icon && (
                      <div className="icon-preview">
                        <img
                          src={buttonStyles.icon}
                          alt="Button Icon"
                          width="50"
                          height="50"
                        />
                      </div>
                    )}
                  </div>
                  <div className="input-group">
                    <label>Icon Position:</label>
                    <select
                      value={buttonStyles.iconPosition || "right"}
                      onChange={(e) =>
                        setButtonStyles({
                          ...buttonStyles,
                          iconPosition: e.target.value,
                        })
                      }
                    >
                      <option value="right">Right</option>
                      <option value="left">Left</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "animation" && (
          <div className="animation-tab-content">
            <div className="placeholder-message">
              Animation settings will be available soon.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolBox;
