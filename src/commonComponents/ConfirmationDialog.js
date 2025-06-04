import React from "react";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Discard Changes?",
  message = "You have unsaved changes. Are you sure you want to discard them?",
  confirmText = "Discard",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay-favourite">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            {cancelText}
          </button>
          <button
            className="btn-save"
            onClick={onConfirm}
            style={{ backgroundColor: "#ef4444" }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
