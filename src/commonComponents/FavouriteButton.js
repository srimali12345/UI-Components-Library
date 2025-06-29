import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { useFavorites } from "../contexts/FavouriteContext";
import { useLocation } from "react-router-dom";

const SaveAsFavorite = ({
  componentType,
  componentId,
  currentStyles,
  currentTitle,
  currentContent,
  customLabel,
  backRoute = "/dashboard",
  activeTabOnBack = "buttons",
  triggerOpen = false,
  onSaveComplete,
}) => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [favoriteName, setFavoriteName] = useState(customLabel || "");
  const [confirmAdd, setConfirmAdd] = useState(false);
  const [saveOption, setSaveOption] = useState("saveAsNew");

  const { addFavorite, updateFavorite, isFavorite, getFavoriteById } = useFavorites();

  const fromFavorite = location.state?.fromFavorite;
  const favoriteId = location.state?.favoriteId;
  const existingFavorite = favoriteId ? getFavoriteById(favoriteId) : null;

  const componentUniqueId = `${componentType}-${componentId}`;
  const isAlreadyFavorite = isFavorite(componentUniqueId);

  useEffect(() => {
    if (triggerOpen) {
      setShowModal(true);
      if (fromFavorite && existingFavorite) {
        setSaveOption("save"); // default to update existing
        setFavoriteName(existingFavorite.favoriteName);
      }
    }
  }, [triggerOpen]);

  const generateCodeForComponent = () => {
    switch (componentType) {
      case "button":
        return {
          html: `<button class="${componentId}-btn">${currentTitle || "Button"}</button>`,
          css: `/* CSS for ${componentId} button */`,
          scss: `/* SCSS for ${componentId} button */`,
        };
      case "card":
        return {
          html: `<div class="${componentId}-card"><h4>${currentTitle}</h4><p>${currentContent}</p></div>`,
          css: `/* CSS for ${componentId} card */`,
          scss: `/* SCSS for ${componentId} card */`,
        };
      default:
        return {
          html: "<!-- HTML code will be generated -->",
          css: "/* CSS code will be generated */",
          scss: "/* SCSS code will be generated */",
        };
    }
  };

  const handleSave = () => {
    const savedCode = generateCodeForComponent();

    if (saveOption === "save" && existingFavorite) {
      const updated = {
        ...existingFavorite,
        savedStyles: currentStyles,
        buttonText: componentType === "button" ? currentTitle : existingFavorite.buttonText,
        cardTitle: componentType === "card" ? currentTitle : existingFavorite.cardTitle,
        cardContent: componentType === "card" ? currentContent : existingFavorite.cardContent,
        savedCode,
        updatedAt: new Date().toISOString(),
      };

      updateFavorite(favoriteId, updated);
      alert("Favorite updated successfully!");
    } else {
      if (!favoriteName.trim() || !confirmAdd) return;

      const newFavorite = {
        id: `${componentType}-${componentId}-${Date.now()}`,
        componentType: componentType.toUpperCase(),
        type: componentType === "button" ? "Button" : "Card",
        subtype: componentId,
        favoriteName: favoriteName.trim(),
        buttonType: componentType === "button" ? componentId : undefined,
        buttonText: componentType === "button" ? currentTitle : undefined,
        cardType: componentType === "card" ? componentId : undefined,
        cardTitle: componentType === "card" ? currentTitle : undefined,
        cardContent: componentType === "card" ? currentContent : undefined,
        savedStyles: currentStyles,
        savedCode,
        label: favoriteName.trim(),
        addedAt: new Date().toISOString(),
      };

      addFavorite(newFavorite);
      alert("Component saved to favorites!");
    }

    setShowModal(false);
    setFavoriteName("");
    setConfirmAdd(false);
    onSaveComplete?.();
  };

  return (
    <>
      <button
        className="save-favorite-btn"
        onClick={() => setShowModal(true)}
        title={fromFavorite ? "Save changes" : "Save as favorite"}
      >
        <Save
          size={16}
          fill={isAlreadyFavorite ? "#ff4757" : "none"}
          color="#64748b"
        />
      </button>

      {showModal && (
        <div className="modal-overlay-favourite">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Save as Favorite</h3>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {fromFavorite && existingFavorite ? (
                <div className="save-options">
                  <label className="option-label">
                    <input
                      type="radio"
                      name="saveOption"
                      value="save"
                      checked={saveOption === "save"}
                      onChange={(e) => setSaveOption(e.target.value)}
                    />
                    <span>
                      Save - Update existing "{existingFavorite.favoriteName}"
                    </span>
                  </label>
                  <label className="option-label save-new">
                    <input
                      type="radio"
                      name="saveOption"
                      value="saveAsNew"
                      checked={saveOption === "saveAsNew"}
                      onChange={(e) => {
                        setSaveOption(e.target.value);
                        setFavoriteName("");
                        setConfirmAdd(false);
                      }}
                    />
                    <span>Save as New - Create a new favorite</span>
                  </label>
                </div>
              ) : null}

              {saveOption === "saveAsNew" || !fromFavorite ? (
                <>
                  <label className="input-label">Favorite Name</label>
                  <input
                    type="text"
                    className="favorite-name-input"
                    value={favoriteName}
                    onChange={(e) => setFavoriteName(e.target.value)}
                    placeholder={`Enter name for this ${componentType}`}
                  />
                  <div className="radio-confirm-section">
                    <label className="option-label">
                      <input
                      className="confirm-checkbox"
                        type="checkbox"
                        checked={confirmAdd}
                        onChange={(e) => setConfirmAdd(e.target.checked)}
                      />
                      <span>Are you sure you want to add this as favorite?</span>
                    </label>
                  </div>

                </>
              ) : null}
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-save"
                onClick={handleSave}
                disabled={
                  saveOption === "saveAsNew"
                    ? !favoriteName.trim() || !confirmAdd
                    : false
                }
              >
                {saveOption === "save" ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveAsFavorite;
