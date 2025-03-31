import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import CodeModal from "./CodeModal";
import { buttonTypes } from "./ButtonList";
const ButtonSelection = ({buttonStyles}) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedButtonType, setSelectedButtonType] = useState("");
  
  const handleOpenModal = (type) => {
    setSelectedButtonType(type);
    setModalVisible(true);
  };
  return (
    <div className="button-dashboard">
      <h2 className="component-title">Buttons</h2>
      <div className="button-list">
        {buttonTypes.map((btn) => (
          <div className="btn-list-wrap">
            <p className="btn-wrap-title">{btn.label}</p>
            <div className="btn-wrap">
              <button
              style={{ ...buttonStyles}}
                key={btn.type}
                className={`dashboard-btn ${btn.type}`}
                onClick={() => navigate(`/customize/${btn.type}`)}
              >
                {btn.label}
              </button>
              <div className="flex-wrap">
                <button className="btn-tool-wrap" title="Customize styles"   onClick={() => handleOpenModal(btn.type)}><img src={copyIcon} alt="icon" className="btn-icon"/></button>
                <button className="btn-tool-wrap" title="Customize styles" onClick={() => navigate(`/customize/${btn.type}`)}><img src={toolIcon} alt="icon" className="btn-icon"/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalVisible && (
        <CodeModal
     
          buttonType={selectedButtonType}
          onClose={() => setModalVisible(false)}
        />
      )}

    </div>
  );
};

export default ButtonSelection;
