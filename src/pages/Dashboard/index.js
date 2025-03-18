import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const buttonTypes = [
    { type: "primary", label: "Primary Button" },
    { type: "outline", label: "Outline Button" },
    { type: "link", label: "Link Button" },
  ];
  

  return (
    <div className="button-dashboard">
      <h2>Select a Button Type</h2>
      <div className="button-list">
        {buttonTypes.map((btn) => (
          <button
            key={btn.type}
            className={`dashboard-btn ${btn.type}`}
            onClick={() => navigate(`/customize/${btn.type}`)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
