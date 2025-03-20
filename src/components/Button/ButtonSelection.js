import React from "react";
import { useNavigate } from "react-router-dom";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";

const ButtonSelection = () => {
  const navigate = useNavigate();
  const buttonTypes = [
    { type: "primary", label: "Primary Button" },
    { type: "outline", label: "Outline Button" },
    { type: "link", label: "Link Button" },
  ];

  return (
    <div className="button-dashboard">
      <h2 className="component-title">Buttons</h2>
      <div className="button-list">
        {buttonTypes.map((btn) => (
          <div className="btn-list-wrap">
            <p className="btn-wrap-title">{btn.label}</p>
            <div className="btn-wrap">
              <button
                key={btn.type}
                className={`dashboard-btn ${btn.type}`}
                onClick={() => navigate(`/customize/${btn.type}`)}
              >
                {btn.label}
              </button>
              <div className="flex-wrap">
                <button className="btn-link"  onClick={() => navigate(`/customize/${btn.type}`)}><img src={copyIcon} alt="icon" className="btn-icon"/></button>
                <button className="btn-link" onClick={() => navigate(`/customize/${btn.type}`)}><img src={toolIcon} alt="icon" className="btn-icon"/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonSelection;
