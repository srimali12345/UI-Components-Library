import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import { buttonTypes } from "./ButtonList";
import CodeModal from "./CodeModal";

const ButtonSelection = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedButtonType, setSelectedButtonType] = useState("");
  const [selectedButtonStyles, setSelectedButtonStyles] = useState({});

  const handleOpenModal = (type) => {
    setSelectedButtonType(type);
    setModalVisible(true);

    const buttonDefaults = {
      Primary: {
        backgroundColor: "#6d45ff",
        color: "#ffffff",
        border: "1px solid #6d45ff",
        hoverBackgroundColor: "#5a35e0",
        hoverTextColor: "#ffffff",
        hoverBorderColor: "#5a35e0",
      },
      Outline: {
        backgroundColor: "transparent",
        color: "#6d45ff",
        border: "2px solid #6d45ff",
        hoverBorderColor: "#5a35e0",
        hoverTextColor: "#5a35e0",
      },
      Link: {
        backgroundColor: "transparent",
        color: "#6d45ff",
        border: "none",
        hoverTextColor: "#5a35e0",
      },
    };

    setSelectedButtonStyles(buttonDefaults[type] || {});
  };

  return (
    <div className="button-dashboard">
      <h2 className="component-title">Buttons</h2>
      <div className="button-list">
        {buttonTypes.map((btn) => (
          <div key={btn.type} className="btn-list-wrap">
            <p className="btn-wrap-title">{btn.label}</p>
            <div className="btn-wrap">
              <button
                className={`dashboard-btn ${btn.type}`}
                onClick={() => navigate(`/customize/${btn.type}`)}
              >
                {btn.label}
              </button>
              <div className="flex-wrap">
                <button
                  className="btn-tool-wrap"
                  title="View code"
                  onClick={() => handleOpenModal(btn.type)}
                >
                  <img src={copyIcon} alt="icon" className="btn-icon" />
                </button>
                <button
                  className="btn-tool-wrap"
                  title="Customize styles"
                  onClick={() => navigate(`/customize/${btn.type}`)}
                >
                  <img src={toolIcon} alt="icon" className="btn-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalVisible && (
        <CodeModal
          buttonType={selectedButtonType}
          buttonStyles={selectedButtonStyles}
          buttonText={`${selectedButtonType} Button`}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default ButtonSelection;
