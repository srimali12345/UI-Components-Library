import React, { useState } from "react";
import { ChevronDown, ChevronRight, RotateCcw } from "lucide-react";

const InputToolBox = ({
  inputStyles,
  setInputStyles,
  placeholderText,
  setPlaceholderText,
  inputType,
  onRevert,
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
    dimensions: false,
    colors: false,
    border: false,
    typography: false,
    placeholder: false,
    searchIcon: false,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <div className="toolbar">
      <div className="toolbar-tabs">
        <div
          className={`toolbar-tab ${activeTab === "design" ? "active" : ""}`}
          onClick={() => setActiveTab("design")}
        >
          <span>Design</span>
        </div>
      </div>

      <div className="toolbar-content">
        <div className="collapsible-section">
          <div
            className="section-header"
            onClick={() => toggleSection("dimensions")}
          >
            <span>Dimensions & Layout</span>
            {expandedSections.dimensions ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {expandedSections.dimensions && (
            <div className="section-content">
              <div className="input-group">
                <label>Width:</label>
                <input
                  type="number"
                  value={parseInt(inputStyles.width) || 200}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      width: `${e.target.value}px`,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Height:</label>
                <input
                  type="number"
                  value={parseInt(inputStyles.height) || 40}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      height: `${e.target.value}px`,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Padding:</label>
                <input
                  type="text"
                  value={inputStyles.padding || "8px 12px"}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      padding: e.target.value,
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
            onClick={() => toggleSection("colors")}
          >
            <span>Colors</span>
            {expandedSections.colors ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {expandedSections.colors && (
            <div className="section-content">
              <div className="input-group">
                <label>Background Color:</label>
                <input
                  type="color"
                  value={inputStyles.backgroundColor || "#ffffff"}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      backgroundColor: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Text Color:</label>
                <input
                  type="color"
                  value={inputStyles.color || "#333333"}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      color: e.target.value,
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
                  value={inputStyles.borderColor || "#cccccc"}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      borderColor: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Focus Border Color:</label>
                <input
                  type="color"
                  value={inputStyles.focusBorderColor || "#6d45ff"}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      focusBorderColor: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Border Style:</label>
                <select
                  value={inputStyles.borderStyle || "solid"}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      borderStyle: e.target.value,
                    }))
                  }
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div className="input-group">
                <label>Border Width:</label>
                <input
                  type="number"
                  value={parseInt(inputStyles.borderWidth) || 1}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      borderWidth: `${e.target.value}px`,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Border Radius:</label>
                <div className="border-radius-inputs">
                  <input
                    type="number"
                    value={parseInt(inputStyles.topLeftRadius) || 4}
                    onChange={(e) =>
                      setInputStyles((prev) => ({
                        ...prev,
                        topLeftRadius: `${e.target.value}px`,
                      }))
                    }
                    placeholder="TL"
                  />
                  <input
                    type="number"
                    value={parseInt(inputStyles.topRightRadius) || 4}
                    onChange={(e) =>
                      setInputStyles((prev) => ({
                        ...prev,
                        topRightRadius: `${e.target.value}px`,
                      }))
                    }
                    placeholder="TR"
                  />
                  <input
                    type="number"
                    value={parseInt(inputStyles.bottomLeftRadius) || 4}
                    onChange={(e) =>
                      setInputStyles((prev) => ({
                        ...prev,
                        bottomLeftRadius: `${e.target.value}px`,
                      }))
                    }
                    placeholder="BL"
                  />
                  <input
                    type="number"
                    value={parseInt(inputStyles.bottomRightRadius) || 4}
                    onChange={(e) =>
                      setInputStyles((prev) => ({
                        ...prev,
                        bottomRightRadius: `${e.target.value}px`,
                      }))
                    }
                    placeholder="BR"
                  />
                  <span>px</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="collapsible-section">
          <div
            className="section-header"
            onClick={() => toggleSection("typography")}
          >
            <span>Typography</span>
            {expandedSections.typography ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {expandedSections.typography && (
            <div className="section-content">
              <div className="input-group">
                <label>Font Size:</label>
                <input
                  type="number"
                  value={parseInt(inputStyles.fontSize) || 14}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      fontSize: `${e.target.value}px`,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Font Weight:</label>
                <select
                  value={inputStyles.fontWeight || "normal"}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      fontWeight: e.target.value,
                    }))
                  }
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
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
                  value={inputStyles.fontFamily || "Arial"}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
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

        <div className="collapsible-section">
          <div
            className="section-header"
            onClick={() => toggleSection("placeholder")}
          >
            <span>Placeholder</span>
            {expandedSections.placeholder ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {expandedSections.placeholder && (
            <div className="section-content">
              <div className="input-group">
                <label>Placeholder Text:</label>
                <input
                  type="text"
                  value={placeholderText}
                  onChange={(e) => setPlaceholderText(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Placeholder Color:</label>
                <input
                  type="color"
                  value={inputStyles.placeholderColor || "#999999"}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      placeholderColor: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Placeholder Font Size:</label>
                <input
                  type="number"
                  value={parseInt(inputStyles.placeholderFontSize) || 14}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      placeholderFontSize: `${e.target.value}px`,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Placeholder Opacity:</label>
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={inputStyles.placeholderOpacity || 0.7}
                  onChange={(e) =>
                    setInputStyles((prev) => ({
                      ...prev,
                      placeholderOpacity: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}
        </div>

        {inputType === "Search" && (
          <div className="collapsible-section">
            <div
              className="section-header"
              onClick={() => toggleSection("searchIcon")}
            >
              <span>Search Icon</span>
              {expandedSections.searchIcon ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
            {expandedSections.searchIcon && (
              <div className="section-content">
                <div className="input-group">
                  <label>Show Search Icon:</label>
                  <input
                    type="checkbox"
                    checked={inputStyles.showSearchIcon || false}
                    onChange={(e) =>
                      setInputStyles((prev) => ({
                        ...prev,
                        showSearchIcon: e.target.checked,
                      }))
                    }
                  />
                </div>

                {inputStyles.showSearchIcon && (
                  <>
                    <div className="input-group">
                      <label>Icon Position:</label>
                      <select
                        value={inputStyles.iconPosition || "right"}
                        onChange={(e) =>
                          setInputStyles((prev) => ({
                            ...prev,
                            iconPosition: e.target.value,
                          }))
                        }
                      >
                        <option value="right">Right</option>
                        <option value="left">Left</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label>Icon Size:</label>
                      <input
                        type="number"
                        min="10"
                        max="30"
                        value={inputStyles.iconSize || 18}
                        onChange={(e) =>
                          setInputStyles((prev) => ({
                            ...prev,
                            iconSize: parseInt(e.target.value),
                          }))
                        }
                      />
                    </div>

                    <div className="input-group">
                      <label>Icon Color:</label>
                      <input
                        type="color"
                        value={inputStyles.iconColor || "#8E9196"}
                        onChange={(e) =>
                          setInputStyles((prev) => ({
                            ...prev,
                            iconColor: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        <div className="revert-section">
          <button
            onClick={onRevert}
            className="revert-button"
            title="Revert to default styles"
          >
            <RotateCcw size={16} />
            <span>Revert</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputToolBox;
