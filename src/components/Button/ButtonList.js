import React from "react";

export const buttonTypes = [
  { type: "Primary", label: "Primary Button" },
  { type: "Outline", label: "Outline Button" },
  { type: "Link", label: "Link Button" },
];

const ButtonList = ({ onSelectButton }) => {
  return (
    <div className="button-list">
      {buttonTypes.map((btn) => (
        <div
          key={btn.type}
          className="button-item"
          onClick={() => onSelectButton(btn.type)}
        >
          {btn.label}
        </div>
      ))}
    </div>
  );
};

export default ButtonList;
