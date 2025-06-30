import React, { useState, useEffect } from "react";
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
  const [triggerFavoriteSave, setTriggerFavoriteSave] = useState(false);

  const fromFavorite = location.state?.fromFavorite;
  const sourceActiveTab = location.state?.active || activeTabOnBack;
  const displayTitle = fromFavorite ? "Favourites Customization" : pageTitle;

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const hasChanges =
        hasUnsavedChanges && typeof hasUnsavedChanges === "function"
          ? hasUnsavedChanges()
          : false;

      if (hasChanges) {
        e.preventDefault();
        e.returnValue = ""; // Chrome requires returnValue to be set
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up on unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);


  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

const handleBackClick = () => {
  const hasChanges =
    hasUnsavedChanges && typeof hasUnsavedChanges === "function"
      ? hasUnsavedChanges()
      : false;

  if (hasChanges) {
     setShowConfirmDialog(true);
    } else {
  navigate(backRoute, { state: { active: sourceActiveTab } });
    }
};


  const handleDiscardConfirm = () => {
    onDiscardChanges?.(); // clear the local changes
  navigate(backRoute, { state: { active: sourceActiveTab } }); // go back
  };

  const handleDiscardCancel = () => {
    setShowConfirmDialog(false);
    onDiscardChanges?.();
    navigate(backRoute, { state: { active: sourceActiveTab } });
  };

    const handleClose = () => {
    setShowConfirmDialog(false);
   
  };

  const handleFavoriteSaveComplete = () => {
    setTriggerFavoriteSave(false);
    onDiscardChanges?.();
    navigate(backRoute, { state: { active: sourceActiveTab } });
  };

  return (
    <div className="main-custom-wrap">
      <div className="customization-container">
        <div className="preview-main">
          <div className="customization-container-preview">
            <div className="flex-wrap">
              <button className="btn-icon-wrap" onClick={handleBackClick}>
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
                backRoute={backRoute}
                activeTabOnBack={sourceActiveTab}
                triggerOpen={triggerFavoriteSave}
                onSaveComplete={handleFavoriteSaveComplete}
              />
            </div>
          </div>
          <div className="middle-section">{mainContent}</div>
        </div>

        <div className="code-panel">
          <div className="code-panel-header">
            <div className="code-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 18L22 12L16 6" stroke="#3E41FF" strokeWidth="2" />
                <path d="M8 6L2 12L8 18" stroke="#3E41FF" strokeWidth="2" />
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
        onClose={handleDiscardConfirm}
        onConfirm={handleDiscardConfirm}
        onBack={handleClose}
        title="Unsaved Changes?"
        message="You have unsaved changes. Do you want to save them before going back?"
        confirmText="Save Changes"
        cancelText="Go Back"
      />
    </div>
  );
};

export default CustomizationLayout;
