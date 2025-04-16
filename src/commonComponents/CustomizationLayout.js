import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

const CustomizationLayout = ({
  mainContent,
  codePanel,
  toolBox,
  pageTitle = "Customization",
  backRoute = "/dashboard",
  itemLabel = "Custom Item",
  activeTabOnBack = "buttons",
}) => {
  const navigate = useNavigate();
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

  return (
    <div className="main-custom-wrap">
      <div className="customization-container">
        <div className="preview-main">
          <div className="customization-container-preview">
            <div className="flex-wrap">
              <button
                className="btn-icon-wrap"
                onClick={() =>
                  navigate(backRoute, { state: { active: activeTabOnBack } })
                }
              >
                <ChevronLeft size={20} />
              </button>
              <span>{pageTitle}</span>
            </div>
            <div className="text-gray">{itemLabel}</div>
          </div>
          <div className="middle-section">{mainContent}</div>
        </div>

        <div className="code-panel">
          <div className="code-panel-header">
            <div className="code-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 18L22 12L16 6"
                  stroke="#3E41FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 6L2 12L8 18"
                  stroke="#3E41FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Generated Code</h3>
            <div className="toggle-code-button" onClick={toggleCodeVisibility}>
              {isCodeVisible ? (
                <>
                  <span>Hide Code</span>
                  <EyeOff size={18} />
                </>
              ) : (
                <>
                  <span>View Code</span>
                  <Eye size={18} />
                </>
              )}
            </div>
          </div>

          {isCodeVisible && (
            <div className="code-panel-content">{codePanel}</div>
          )}
        </div>
      </div>

      {toolBox}
    </div>
  );
};

export default CustomizationLayout;
