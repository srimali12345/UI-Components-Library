import React, { useState } from "react";
import { ChevronDown, ChevronRight, RotateCcw } from "lucide-react";

const LoginToolBox = ({
  loginStyles,
  setLoginStyles,
  loginTitle,
  setLoginTitle,
  loginType,
  onRevert,
}) => {
  const [activeTab, setActiveTab] = useState("design");
  const [expandedSections, setExpandedSections] = useState({
    general: false,
    form: false,
    title: false,
    labels: false,
    inputs: false,
    button: false,
    checkbox: false
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
                onClick={() => toggleSection("general")}
              >
                <span>General</span>
                {expandedSections.general ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
              {expandedSections.general && (
                <div className="section-content">
                  <div className="input-group">
                    <label>Form Title:</label>
                    <input
                      type="text"
                      value={loginTitle || "Login Form"}
                      onChange={(e) => setLoginTitle(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="collapsible-section">
              <div
                className="section-header"
                onClick={() => toggleSection("form")}
              >
                <span>Form Container</span>
                {expandedSections.form ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
              {expandedSections.form && (
                <div className="section-content">
                  <div className="input-group">
                    <label>Background Color:</label>
                    <input
                      type="color"
                      value={loginStyles.backgroundColor || "#ffffff"}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          backgroundColor: e.target.value,
                        })
                      }
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Border Color:</label>
                    <input
                      type="color"
                      value={loginStyles.borderColor || "#e1e5e9"}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          borderColor: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Border Width:</label>
                    <input
                      type="number"
                      min="0"
                      value={parseInt(loginStyles.borderWidth) || 1}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          borderWidth: `${e.target.value}px`,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Border Radius:</label>
                    <input
                      type="number"
                      min="0"
                      value={parseInt(loginStyles.borderRadius) || 8}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          borderRadius: `${e.target.value}px`,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Padding:</label>
                    <input
                      type="number"
                      min="0"
                      value={parseInt(loginStyles.padding) || 32}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          padding: `${e.target.value}px`,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Width:</label>
                    <input
                      type="number"
                      min="200"
                      value={parseInt(loginStyles.width) || 400}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          width: `${e.target.value}px`,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="collapsible-section">
              <div
                className="section-header"
                onClick={() => toggleSection("title")}
              >
                <span>Title</span>
                {expandedSections.title ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
              {expandedSections.title && (
                <div className="section-content">
                  <div className="input-group">
                    <label>Title Color:</label>
                    <input
                      type="color"
                      value={loginStyles.titleColor || "#1a1a1a"}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          titleColor: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Title Font Size:</label>
                    <input
                      type="number"
                      min="12"
                      max="48"
                      value={parseInt(loginStyles.titleFontSize) || 24}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          titleFontSize: `${e.target.value}px`,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Title Font Weight:</label>
                    <select
                      value={loginStyles.titleFontWeight || "600"}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          titleFontWeight: e.target.value,
                        })
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
                </div>
              )}
            </div>

            <div className="collapsible-section">
              <div
                className="section-header"
                onClick={() => toggleSection("labels")}
              >
                <span>Labels</span>
                {expandedSections.labels ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
              {expandedSections.labels && (
                <div className="section-content">
                  <div className="input-group">
                    <label>Label Color:</label>
                    <input
                      type="color"
                      value={loginStyles.labelColor || "#374151"}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          labelColor: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Label Font Size:</label>
                    <input
                      type="number"
                      min="10"
                      max="20"
                      value={parseInt(loginStyles.labelFontSize) || 14}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          labelFontSize: `${e.target.value}px`,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="collapsible-section">
              <div
                className="section-header"
                onClick={() => toggleSection("inputs")}
              >
                <span>Input Fields</span>
                {expandedSections.inputs ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
              {expandedSections.inputs && (
                <div className="section-content">
                  <div className="input-group">
                    <label>Input Background:</label>
                    <input
                      type="color"
                      value={loginStyles.inputBackgroundColor || "#ffffff"}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          inputBackgroundColor: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Input Border Color:</label>
                    <input
                      type="color"
                      value={loginStyles.inputBorderColor || "#d1d5db"}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          inputBorderColor: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Input Border Radius:</label>
                    <input
                      type="number"
                      min="0"
                      value={parseInt(loginStyles.inputBorderRadius) || 6}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          inputBorderRadius: `${e.target.value}px`,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Input Padding:</label>
                    <input
                      type="text"
                      value={loginStyles.inputPadding || "12px"}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          inputPadding: e.target.value,
                        })
                      }
                      placeholder="e.g., 12px or 12px 16px"
                    />
                  </div>

                  <div className="input-group">
                    <label>Input Font Size:</label>
                    <input
                      type="number"
                      min="12"
                      max="20"
                      value={parseInt(loginStyles.inputFontSize) || 16}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          inputFontSize: `${e.target.value}px`,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="collapsible-section">
              <div
                className="section-header"
                onClick={() => toggleSection("button")}
              >
                <span>Button</span>
                {expandedSections.button ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
              {expandedSections.button && (
                <div className="section-content">
                  <div className="input-group">
                    <label>Button Background:</label>
                    <input
                      type="color"
                      value={loginStyles.buttonBackgroundColor || "#3b82f6"}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          buttonBackgroundColor: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Button Text Color:</label>
                    <input
                      type="color"
                      value={loginStyles.buttonColor || "#ffffff"}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          buttonColor: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Button Border Radius:</label>
                    <input
                      type="number"
                      min="0"
                      value={parseInt(loginStyles.buttonBorderRadius) || 6}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          buttonBorderRadius: `${e.target.value}px`,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Button Padding:</label>
                    <input
                      type="text"
                      value={loginStyles.buttonPadding || "12px 24px"}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          buttonPadding: e.target.value,
                        })
                      }
                      placeholder="e.g., 12px 24px"
                    />
                  </div>

                  <div className="input-group">
                    <label>Button Font Weight:</label>
                    <select
                      value={loginStyles.buttonFontWeight || "500"}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          buttonFontWeight: e.target.value,
                        })
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
                </div>
              )}
            </div>

            <div className="collapsible-section">
              <div
                className="section-header"
                onClick={() => toggleSection("checkbox")}
              >
                <span>Remember Me</span>
                {expandedSections.checkbox ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
              {expandedSections.checkbox && (
                <div className="section-content">
                  <div className="input-group">
                    <label>Text Color:</label>
                    <input
                      type="color"
                      value={loginStyles.rememberMeColor || "#374151"}
                      onChange={(e) =>
                        setLoginStyles({
                          ...loginStyles,
                          rememberMeColor: e.target.value,
                        })
                      }
                    />
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

export default LoginToolBox;