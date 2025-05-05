import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputTypes } from "./InputList";
import CodeModal from "./InputCodeModel";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import { Search } from "lucide-react";
import "../../styles/components/inputCustomization.scss";

const InputSelection = ({ inputType }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInputType, setSelectedInputType] = useState("");
  const [selectedInputStyles, setSelectedInputStyles] = useState({});

  const handleOpenModal = (type, e) => {
    // Prevent event bubbling to parent elements
    e.stopPropagation();

    setSelectedInputType(type);
    setModalVisible(true);

    const inputDefaults = {
      Text: {
        backgroundColor: "#ffffff",
        color: "#333333",
        borderWidth: "1px",
        borderColor: "#cccccc",
        focusBorderColor: "#6d45ff",
      },
      Password: {
        backgroundColor: "#ffffff",
        color: "#333333",
        borderWidth: "1px",
        borderColor: "#cccccc",
        focusBorderColor: "#6d45ff",
      },
      Search: {
        backgroundColor: "#ffffff",
        color: "#333333",
        borderWidth: "1px",
        borderColor: "#cccccc",
        focusBorderColor: "#6d45ff",
        borderRadius: "20px",
      },
    };

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
