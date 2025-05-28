import React, { useState } from "react";
import { ChevronDown, ChevronRight, RotateCcw } from "lucide-react";

const CardToolBox = ({
  cardStyles,
  setCardStyles,
  cardTitle,
  setCardTitle,
  cardContent,
  setCardContent,
  cardType,
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

  const [expandedSections, setExpandedSections] = useState({
    dimensions: false,
    colors: false,
    border: false,
    typography: false,
    content: true,
    image: false,
    buttons: false,
    effects: false,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const isImageCard = cardType === "Image" || cardType === "ImageOverlay";
  const isOverlay = cardType === "ImageOverlay";
  const hasButtons = cardType === "Action" || cardType === "Pricing";
  const hasPrimaryButton = cardType === "Pricing";

  return (
    <div className="toolbar">
      <div className="toolbar-content">
        <div className="collapsible-section">
          <div
            className="section-header"
            onClick={() => toggleSection("content")}
          >
            <span>Content</span>
            {expandedSections.content ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {expandedSections.content && (
            <div className="section-content">
              <div className="input-group">
                <label>Card Title:</label>
                <input
                  type="text"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Card Content:</label>
                <textarea
                  value={cardContent}
                  onChange={(e) => setCardContent(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

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
                  type="text"
                  value={cardStyles.width || "300px"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
                      ...prev,
                      width: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Min Height:</label>
                <input
                  type="text"
                  value={cardStyles.minHeight || "200px"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
                      ...prev,
                      minHeight: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Padding:</label>
                <input
                  type="text"
                  value={cardStyles.padding || "20px"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
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
                  value={cardStyles.backgroundColor || "#ffffff"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
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
                  value={cardStyles.textColor || "#333333"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
                      ...prev,
                      textColor: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Title Color:</label>
                <input
                  type="color"
                  value={cardStyles.titleColor || "#000000"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
                      ...prev,
                      titleColor: e.target.value,
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
            <span>Border & Shadow</span>
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
                  value={cardStyles.borderColor || "#e0e0e0"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
                      ...prev,
                      borderColor: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Border Width:</label>
                <input
                  type="text"
                  value={cardStyles.borderWidth || "1px"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
                      ...prev,
                      borderWidth: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Border Style:</label>
                <select
                  value={cardStyles.borderStyle || "solid"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
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
                <label>Border Radius:</label>
                <div className="border-radius-inputs">
                  <input
                    type="number"
                    value={parseInt(cardStyles.topLeftRadius) || 8}
                    onChange={(e) =>
                      setCardStyles((prev) => ({
                        ...prev,
                        topLeftRadius: `${e.target.value}px`,
                      }))
                    }
                    placeholder="TL"
                  />
                  <input
                    type="number"
                    value={parseInt(cardStyles.topRightRadius) || 8}
                    onChange={(e) =>
                      setCardStyles((prev) => ({
                        ...prev,
                        topRightRadius: `${e.target.value}px`,
                      }))
                    }
                    placeholder="TR"
                  />
                  <input
                    type="number"
                    value={parseInt(cardStyles.bottomLeftRadius) || 8}
                    onChange={(e) =>
                      setCardStyles((prev) => ({
                        ...prev,
                        bottomLeftRadius: `${e.target.value}px`,
                      }))
                    }
                    placeholder="BL"
                  />
                  <input
                    type="number"
                    value={parseInt(cardStyles.bottomRightRadius) || 8}
                    onChange={(e) =>
                      setCardStyles((prev) => ({
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
                <label>Box Shadow:</label>
                <input
                  type="text"
                  value={cardStyles.boxShadow || "0 2px 8px rgba(0, 0, 0, 0.1)"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
                      ...prev,
                      boxShadow: e.target.value,
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
                <label>Title Font Size:</label>
                <input
                  type="text"
                  value={cardStyles.titleFontSize || "18px"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
                      ...prev,
                      titleFontSize: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Title Font Weight:</label>
                <select
                  value={cardStyles.titleFontWeight || "bold"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
                      ...prev,
                      titleFontWeight: e.target.value,
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
                <label>Content Font Size:</label>
                <input
                  type="text"
                  value={cardStyles.contentFontSize || "14px"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
                      ...prev,
                      contentFontSize: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Line Height:</label>
                <input
                  type="text"
                  value={cardStyles.contentLineHeight || "1.5"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
                      ...prev,
                      contentLineHeight: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="input-group">
                <label>Font Family:</label>
                <select
                  value={cardStyles.fontFamily || "Arial"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
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

        {isImageCard && (
          <div className="collapsible-section">
            <div
              className="section-header"
              onClick={() => toggleSection("image")}
            >
              <span>Image</span>
              {expandedSections.image ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
            {expandedSections.image && (
              <div className="section-content">
                <div className="input-group">
                  <label>Image Height:</label>
                  <input
                    type="text"
                    value={cardStyles.imageHeight || "200px"}
                    onChange={(e) =>
                      setCardStyles((prev) => ({
                        ...prev,
                        imageHeight: e.target.value,
                      }))
                    }
                  />
                </div>

                {isOverlay && (
                  <div className="input-group">
                    <label>Overlay Color:</label>
                    <input
                      type="text"
                      value={cardStyles.overlayColor || "rgba(0, 0, 0, 0.4)"}
                      onChange={(e) =>
                        setCardStyles((prev) => ({
                          ...prev,
                          overlayColor: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {hasButtons && (
          <div className="collapsible-section">
            <div
              className="section-header"
              onClick={() => toggleSection("buttons")}
            >
              <span>Buttons</span>
              {expandedSections.buttons ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
            {expandedSections.buttons && (
              <div className="section-content">
                <div className="input-group">
                  <label>Button Background:</label>
                  <input
                    type="color"
                    value={cardStyles.buttonBackgroundColor || "#f1f1f1"}
                    onChange={(e) =>
                      setCardStyles((prev) => ({
                        ...prev,
                        buttonBackgroundColor: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="input-group">
                  <label>Button Text Color:</label>
                  <input
                    type="color"
                    value={cardStyles.buttonTextColor || "#333333"}
                    onChange={(e) =>
                      setCardStyles((prev) => ({
                        ...prev,
                        buttonTextColor: e.target.value,
                      }))
                    }
                  />
                </div>

                {hasPrimaryButton && (
                  <>
                    <div className="input-group">
                      <label>Primary Button Background:</label>
                      <input
                        type="color"
                        value={
                          cardStyles.primaryButtonBackgroundColor || "#4a6cf7"
                        }
                        onChange={(e) =>
                          setCardStyles((prev) => ({
                            ...prev,
                            primaryButtonBackgroundColor: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="input-group">
                      <label>Primary Button Text:</label>
                      <input
                        type="color"
                        value={cardStyles.primaryButtonTextColor || "#ffffff"}
                        onChange={(e) =>
                          setCardStyles((prev) => ({
                            ...prev,
                            primaryButtonTextColor: e.target.value,
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

        <div className="collapsible-section">
          <div
            className="section-header"
            onClick={() => toggleSection("effects")}
          >
            <span>Effects</span>
            {expandedSections.effects ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
          {expandedSections.effects && (
            <div className="section-content">
              <div className="input-group">
                <label>Hover Effect:</label>
                <select
                  value={cardStyles.hoverEffect || "shadow"}
                  onChange={(e) =>
                    setCardStyles((prev) => ({
                      ...prev,
                      hoverEffect: e.target.value,
                    }))
                  }
                >
                  <option value="none">None</option>
                  <option value="shadow">Shadow</option>
                  <option value="scale">Scale</option>
                  <option value="border">Border</option>
                </select>
              </div>
            </div>
          )}
        </div>
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

export default CardToolBox;
