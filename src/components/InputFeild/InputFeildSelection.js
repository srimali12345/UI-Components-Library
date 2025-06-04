import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputTypes } from "./InputList";
import CodeModal from "./InputCodeModel";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import { Search } from "lucide-react";
import "../../styles/components/inputCustomization.scss";
import FavoriteButton from "../../commonComponents/FavouriteButton";
import { inputDefaults } from "../../constants";

const InputSelection = ({ inputType }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInputType, setSelectedInputType] = useState("");
  const [selectedInputStyles, setSelectedInputStyles] = useState({});

  const handleOpenModal = (type, e) => {
    e.stopPropagation();

    setSelectedInputType(type);
    setModalVisible(true);

    setSelectedInputStyles(inputDefaults[type] || {});
  };

  const handleInputClick = (type, e) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/customize-input/${type}`);
  };

  return (
    <div className="input-dashboard">
      <h2 className="component-title">Input Fields</h2>
      <div className="input-list">
        {inputTypes.map((input) => (
          <div key={input.type} className="input-list-wrap">
            <p className="input-wrap-title">{input.label}</p>
            <div className="input-wrap">
              {input.type === "Search" && (
                <Search size={18} className="svg-icon-search" />
              )}
              <input
                type={input.type.toLowerCase()}
                className={`dashboard-input ${input.type}`}
                placeholder={`Enter ${input.type}`}
                onClick={(e) => handleInputClick(input.type, e)}
              />
              <div className="flex-wrap">
                <button
                  className="input-tool-wrap"
                  title="View code"
                  onClick={(e) => handleOpenModal(input.type, e)}
                >
                  <img src={copyIcon} alt="icon" className="input-icon" />
                </button>
                <button
                  className="input-tool-wrap"
                  title="Customize styles"
                  onClick={() => {
                    navigate(`/customize-input/${input.type}`, {
                      state: { input },
                    });
                  }}
                >
                  <img src={toolIcon} alt="icon" className="input-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalVisible && (
        <CodeModal
          inputType={selectedInputType}
          inputStyles={selectedInputStyles}
          placeholderText={`Enter ${selectedInputType}`}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default InputSelection;
