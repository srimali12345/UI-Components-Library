import React from "react";

export const cardTypes = [
  { type: "Basic", label: "Basic Card" },
  { type: "Image", label: "Image Card" },
  { type: "Action", label: "Action Card" },
  { type: "Pricing", label: "Pricing Card" }
];

const CardList = ({ onSelectCard }) => {
  return (
    <div className="card-list">
      {cardTypes.map((card) => (
        <div
          key={card.type}
          className="card-item"
          onClick={() => onSelectCard(card.type)}
        >
          {card.label}
        </div>
      ))}
    </div>
  );
};

export default CardList;