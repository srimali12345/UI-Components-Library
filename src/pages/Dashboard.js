import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonSelection from "../components/Button/ButtonSelection";
import NavbarCustomizer from "../components/Navbar/NavbarCustomizer";

import "../styles/pages/dashboard.scss";
import "../styles/components/navbar.scss";
const Dashboard = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("buttons");

  return (
    <div className="container dashboard-wrap">
      <div className="sidebar-wrap">
        <p className="sub-title">Components</p>
        <div>
          <p className="sub-text">General</p>
          <ul>
            <li
              className={`menu-text ${
                activeComponent === "buttons" ? "active" : ""
              }`}
              onClick={() => setActiveComponent("buttons")}
            >
              Buttons
            </li>
            <li className="menu-text">Forms</li>
          </ul>
        </div>
        <div className="mt-10">
          <p className="sub-text">Themes</p>
          <ul>
            <li className="menu-text">Login</li>
            <li
              className="menu-text"
              onClick={() => setActiveComponent("navbar")}
            >
              Navbar
            </li>
          </ul>
        </div>
      </div>

      <div className="dashboard-content">
        {activeComponent === "buttons" && <ButtonSelection />}
        {activeComponent === "navbar" && <NavbarCustomizer />}
      </div>
    </div>
  );
};

export default Dashboard;
