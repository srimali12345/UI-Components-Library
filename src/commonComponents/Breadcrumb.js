// components/common/Breadcrumb.jsx
import React from "react";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="breadcrumb-container">
      <span className="breadcrumb-home" onClick={() => navigate("/")}>
        <Home size={18} strokeWidth={2} />
      </span>
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          <span className="breadcrumb-separator">›</span>
          <span
            className={
              item.onClick || item.path ? "breadcrumb-link" : "breadcrumb-text"
            }
            onClick={() => handleClick(item)}
            style={{
              cursor: item.onClick || item.path ? "pointer" : "default",
            }}
          >
            {item.label}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
