import React from "react";

const ColorPicker = ({ label, color, onChange }) => {
  return (
    <div className="color-picker">
      <label>{label}</label>
      <div className="color-input-container">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="color-input"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="color-text-input"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
