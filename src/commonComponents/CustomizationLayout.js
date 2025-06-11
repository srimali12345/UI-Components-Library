import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import SaveAsFavorite from "../commonComponents/FavouriteButton";
import ConfirmationDialog from "./ConfirmationDialog";

const CustomizationLayout = ({
  mainContent,
  codePanel,
  toolBox,
  pageTitle = "Customization",
  backRoute = "/dashboard",
  itemLabel = "Custom Item",
  activeTabOnBack = "buttons",
  componentType,
  componentId,
  currentStyles,
  currentTitle,
  currentContent,
  customLabel,
  hasUnsavedChanges,
  onDiscardChanges,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Check if we came from favorites
  const fromFavorite = location.state?.fromFavorite;
  
  // Update page title based on source
  const displayTitle = fromFavorite ? "Favourites Customization" : pageTitle;
  
  // Determine the correct back route based on where we came from
  const actualBackRoute = fromFavorite ? "/favourites" : backRoute;

  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

  const handleBackClick = () => {
    // Check if there are unsaved changes - CALL the function to get boolean result
    const hasChanges = hasUnsavedChanges && typeof hasUnsavedChanges === 'function' ? hasUnsavedChanges() : false;
    
    console.log("Back clicked, checking for unsaved changes:", hasChanges);
    
    if (hasChanges) {
      console.log("Showing confirmation dialog due to unsaved changes");
      setShowConfirmDialog(true);
    } else {
      console.log("No unsaved changes, navigating back immediately");
      // No unsaved changes, navigate back immediately
      if (fromFavorite) {
        navigate("/favourites");
      } else {
        navigate(backRoute, { state: { active: activeTabOnBack } });
      }
    }
  };

  const handleDiscardConfirm = () => {
    console.log("User confirmed discard changes");
    
    // Call the discard changes function if provided
    if (onDiscardChanges && typeof onDiscardChanges === 'function') {
      onDiscardChanges();
    }
    
    // Close dialog and navigate back
    setShowConfirmDialog(false);
    
    // Navigate to the correct route based on where we came from
    if (fromFavorite) {
      navigate("/favourites");
    } else {
      navigate(backRoute, { state: { active: activeTabOnBack } });
    }
  };

  const handleDiscardCancel = () => {
    console.log("User cancelled discard");
    setShowConfirmDialog(false);
  };

  return (
    <div className="main-custom-wrap">
      <div className="customization-container">
        <div className="preview-main">
          <div className="customization-container-preview">
            <div className="flex-wrap">
              <button
                className="btn-icon-wrap"
                onClick={handleBackClick}
              >
                <ChevronLeft size={20} />
              </button>
              <span>{displayTitle}</span>
            </div>
            <div className="text-gray">{itemLabel}</div>
            <div className="flex-wrap">
              <SaveAsFavorite
                componentType={componentType}
                componentId={componentId}
                currentStyles={currentStyles}
                currentTitle={currentTitle}
                currentContent={currentContent}
                customLabel={customLabel}
              />
            </div>
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

      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={handleDiscardCancel}
        onConfirm={handleDiscardConfirm}
        title="Discard Changes?"
        message="You have unsaved changes. Are you sure you want to discard them and go back?"
        confirmText="Discard"
        cancelText="Cancel"
      />
    </div>
  );
};

export default CustomizationLayout;
