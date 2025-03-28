import React, { useState } from "react";

const LogoUploader = ({ onUpload, currentLogo }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onUpload(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    onUpload("");
  };

  return (
    <div className="logo-uploader">
      {currentLogo ? (
        <div className="logo-preview-container">
          <img src={currentLogo} alt="Logo preview" className="logo-preview" />
          <button onClick={handleRemoveLogo} className="remove-logo-btn">
            Remove
          </button>
        </div>
      ) : (
        <div
          className={`drop-area ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drag & drop or click to upload logo</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
      )}
    </div>
  );
};

export default LogoUploader;
