import React from "react";

const LogoUploader = ({ onUpload, currentLogo }) => {
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onUpload("");
  };

  return (
    <div className="logo-uploader">
      <div className="upload-box">
        {currentLogo ? (
          <img src={currentLogo} alt="Logo Preview" className="logo-preview" />
        ) : (
          <p className="no-logo-text">No logo uploaded</p>
        )}
      </div>
      <div className="action-buttons">
        <label className="upload-button">
          Upload Logo
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        {currentLogo && (
          <button onClick={handleRemove} className="remove-button">
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default LogoUploader;
