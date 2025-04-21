import React from "react";

export const inputTypes = [
  { type: "Text", label: "Text Input" },
  { type: "Password", label: "Password Input" },
  { type: "Search", label: "Search Input" },
];

const InputList = ({ onSelectInput }) => {
  return (
    <div className="input-list">
      {inputTypes.map((input) => (
        <div
          key={input.type}
          className="input-item"
          onClick={() => onSelectInput(input.type)}
        >
          {input.label}
        </div>
      ))}
    </div>
  );
};

export default InputList;
