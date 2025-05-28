import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cardTypes } from "./CardList";
import CardCodeModal from "./CardCodeModal";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import FavoriteButton from "../../commonComponents/FavouriteButton";
import { cardDefaults } from "../../constants";

const CardSelection = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCardType, setSelectedCardType] = useState("");
  const [selectedCardStyles, setSelectedCardStyles] = useState({});

  const handleOpenModal = (type, e) => {
    e.stopPropagation();

    setSelectedCardType(type);
    setModalVisible(true);
    setSelectedCardStyles(cardDefaults[type] || {});
  };

  const handleCardClick = (type, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/customize-card/${type}`);
  };

  const renderCardPreview = (card, onClick) => {
    switch (card.type) {
      case "Basic":
        return (
          <div className="card-preview basic" onClick={onClick}>
            <div className="card-header">Header</div>
            <div className="card-body">
              <h3 className="card-title">Basic Card</h3>
              <p className="card-text">This is a Basic card with sample content.</p>
            </div>
            <div className="card-footer">Footer</div>
          </div>
        );
      case "Image":
        return (
          <div className="card-preview image" onClick={onClick}>
            <div className="card-image"></div>
            <div className="card-body">
              <h3 className="card-title">Image Card</h3>
              <p className="card-text">This is a Image card with sample content.</p>
            </div>
          </div>
        );
      case "Action":
        return (
          <div className="card-preview action" onClick={onClick}>
            <div className="card-body">
              <h3 className="card-title">Action Card</h3>
              <p className="card-text">Card with action button.</p>
              <div className="card-actions">
                <button className="card-button">Learn More</button>
              </div>
            </div>
          </div>
        );
      case "Pricing":
        return (
          <div className="card-preview pricing" onClick={onClick}>
            <div className="card-body">
              <h3 className="card-title">Pricing Card</h3>
              <p className="card-text">Card with pricing information and CTA buttons.</p>
              <div className="card-actions">
                <button className="card-button">Learn More</button>
                <button className="card-button primary">Get Started</button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card-dashboard">
      <h2 className="component-title">Card Components</h2>
      <div className="card-grid">
        {cardTypes.map((card) => (
          <div key={card.type} className="card-list-wrap">
            <p className="card-wrap-title">{card.label}</p>
            <div 
              className="card-wrap" 
             
            >
              {renderCardPreview(card,(e) => handleCardClick(card.type, e)) }
              <div className="flex-wrap">

                <FavoriteButton component={{
                  id: card.type,
                  type: 'Card',
                  subtype: card.type,
                  label:card.label

                }}/>
                <button
                  className="card-tool-wrap"
                  title="View code"
                  onClick={(e) => handleOpenModal(card.type, e)}
                >
                  <img src={copyIcon} alt="code icon" className="input-icon" />
                </button>
                <button
                  className="card-tool-wrap"
                  title="Customize styles"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/customize-card/${card.type}`,{
                      state:{card},
                    });
                  }}
                >
                  <img src={toolIcon} alt="tool icon" className="input-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalVisible && (
        <CardCodeModal
          cardType={selectedCardType}
          cardStyles={selectedCardStyles}
          cardTitle={`${selectedCardType} Card`}
          cardContent={`This is a ${selectedCardType} card with sample content.`}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default CardSelection;