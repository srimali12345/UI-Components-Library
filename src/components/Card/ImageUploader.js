import React from "react";
import { Upload, X } from "lucide-react";

const ImageUploader = ({ onUpload, currentImage, label = "Upload Image" }) => {
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
    <div className="image-uploader">
      <div className="upload-section">
        {currentImage ? (
          <div className="image-preview-container">
            <img 
              src={currentImage} 
              alt="Preview" 
              className="image-preview"
              style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                borderRadius: "6px",
                border: "1px solid #e5e7eb"
              }}
            />
            <button 
              onClick={handleRemove} 
              className="remove-image-btn"
              style={{
                position: "absolute",
                top: "4px",
                right: "4px",
                background: "rgba(0, 0, 0, 0.6)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div 
            className="upload-placeholder"
            style={{
              height: "120px",
              border: "2px dashed #d1d5db",
              borderRadius: "6px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
              background: "#f9fafb"
            }}
          >
            <Upload size={24} />
            <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>No image uploaded</p>
          </div>
        )}
      </div>
      
      <div className="upload-actions" style={{ marginTop: "12px" }}>
        <label 
          className="upload-button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            background: "#6d45ff",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "500"
          }}
        >
          <Upload size={14} />
          {label}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
