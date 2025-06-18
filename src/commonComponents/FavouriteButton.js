import React, { useState } from "react";
import { Heart, Save } from "lucide-react";
import { useFavorites } from "../contexts/FavouriteContext";
import { useLocation, useNavigate } from "react-router-dom";

const SaveAsFavorite = ({
  componentType,
  componentId,
  currentStyles,
  currentTitle,
  currentContent,
  customLabel,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [saveOption, setSaveOption] = useState(""); // 'save' or 'saveAsNew'
  const [favoriteName, setFavoriteName] = useState(customLabel || "");
  const { addFavorite, updateFavorite, isFavorite, getFavoriteById } =
    useFavorites();

  const fromFavorite = location.state?.fromFavorite;
  const favoriteId = location.state?.favoriteId;
  const existingFavorite = favoriteId ? getFavoriteById(favoriteId) : null;

  const generateCodeForComponent = () => {
    switch (componentType) {
      case "button":
        return {
          html: `<button class="${componentId}-btn">${
            currentTitle || "Button"
          }</button>`,
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

  const handleSaveClick = () => {
    if (fromFavorite && existingFavorite) {
      setShowModal(true);
    } else {
      // Show confirmation dialog first
      setShowConfirmation(true);
    }
  };

  const handleConfirmSave = () => {
    setShowConfirmation(false);
    setSaveOption("saveAsNew");
    setShowModal(true);
  };

  const handleSave = () => {
    const savedCode = generateCodeForComponent();

    if (saveOption === "save" && existingFavorite) {
      const updatedFavorite = {
        ...existingFavorite,
        savedStyles: currentStyles,
        buttonText:
          componentType === "button"
            ? currentTitle
            : existingFavorite.buttonText,
        cardTitle:
          componentType === "card" ? currentTitle : existingFavorite.cardTitle,
        cardContent:
          componentType === "card"
            ? currentContent
            : existingFavorite.cardContent,
        savedCode: savedCode,
        updatedAt: new Date().toISOString(),
      };

      updateFavorite(favoriteId, updatedFavorite);
      setShowModal(false);
      alert("Favorite updated successfully!");
      navigate("/favourites");
    } else {
      // Save as new favorite
      if (!favoriteName.trim()) return;

      const favoriteComponent = {
        id: `${componentType}-${componentId}-${Date.now()}`,
        componentType: componentType.toUpperCase(),
        type:
          componentType === "button"
            ? "Button"
            : componentType === "card"
            ? "Card"
            : componentType,
        subtype: componentId,
        favoriteName: favoriteName.trim(),
        buttonType: componentType === "button" ? componentId : undefined,
        buttonText: componentType === "button" ? currentTitle : undefined,
        cardType: componentType === "card" ? componentId : undefined,
        cardTitle: componentType === "card" ? currentTitle : undefined,
        cardContent: componentType === "card" ? currentContent : undefined,
        savedStyles: currentStyles,
        savedCode: savedCode,
        label: favoriteName.trim(),
        addedAt: new Date().toISOString(),
      };

      addFavorite(favoriteComponent);
      setShowModal(false);
      setFavoriteName("");
      alert("Component saved to favorites!");
      navigate("/favourites");
    }
  };

  const componentUniqueId = `${componentType}-${componentId}`;
  const isAlreadyFavorite = isFavorite(componentUniqueId);

  return (
    <>
      <button
        className="save-favorite-btn"
        onClick={handleSaveClick}
        title={fromFavorite ? "Save changes" : "Save as favorite"}
      >
        {fromFavorite ? (
          <>
   <Save
              size={16}
              fill={isAlreadyFavorite ? "#ff4757" : "none"}
              color="#64748b"
            />
          </>
        ) : (
          <>
            <Save
              size={16}
              fill={isAlreadyFavorite ? "#ff4757" : "none"}
              color="#64748b"
            />
          </>
        )}
      </button>

      {showConfirmation && (
        <div className="modal-overlay-favourite">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add to Favorites</h3>
              <button
                className="modal-close"
                onClick={() => setShowConfirmation(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure to add this as favourite?</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="btn-save"
                onClick={handleConfirmSave}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay-favourite">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{fromFavorite ? "Save Options" : "Save as Favorite"}</h3>
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
                  <div className="option-group">
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
                  </div>
                  <div className="option-group">
                    <label className="option-label">
                      <input
                        type="radio"
                        name="saveOption"
                        value="saveAsNew"
                        checked={saveOption === "saveAsNew"}
                        onChange={(e) => setSaveOption(e.target.value)}
                      />
                      <span>Save as New - Create a new favorite</span>
                    </label>
                  </div>

                  {saveOption === "saveAsNew" && (
                    <div className="name-input-section">
                      <label className="input-label">Favorite Name</label>
                      <input
                        type="text"
                        className="favorite-name-input"
                        value={favoriteName}
                        onChange={(e) => setFavoriteName(e.target.value)}
                        placeholder={`Enter name for this ${componentType}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSave();
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="input-label">Favorite Name</label>
                  <input
                    type="text"
                    className="favorite-name-input"
                    value={favoriteName}
                    onChange={(e) => setFavoriteName(e.target.value)}
                    placeholder={`Enter name for this ${componentType}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSave();
                      }
                    }}
                  />
                </div>
              )}
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
                disabled={saveOption === "saveAsNew" && !favoriteName.trim()}
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
