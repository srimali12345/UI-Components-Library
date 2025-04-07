import React from "react";

const ColorPicker = ({ label, color, onChange }) => {
  return (
    <div className="color-picker">
      <label className="label">{label}</label>
      <div className="color-picker-container">
        <div className="color-box" style={{ backgroundColor: color }}></div>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="color-input"
          id={`color-${label}`}
        />
        <label htmlFor={`color-${label}`} className="color-change-btn">
          Change
        </label>
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
