import React, { useState } from "react";
import ButtonSelection from "../components/Button/ButtonSelection";
import NavbarCustomizer from "../components/Navbar/NavbarCustomizer";
import "../styles/pages/dashboard.scss";
import NavbarTemplates from "../components/Navbar/NavbarTemplates";

const Dashboard = () => {
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
            <li
              className={`menu-text ${
                activeComponent === "forms" ? "active" : ""
              }`}
              onClick={() => setActiveComponent("forms")}
            >
              Forms
            </li>
          </ul>
        </div>
        <div className="mt-10">
          <p className="sub-text">Themes</p>
          <ul>
            <li className="menu-text">Login</li>
            <li
              className={`menu-text ${
                activeComponent === "navbar" ? "active" : ""
              }`}
              onClick={() => setActiveComponent("navbar")}
              
            >
              Navbar
            </li>
          </ul>
        </div>
      </div>

      <div className="dashboard-content">
        {activeComponent === "buttons" && <ButtonSelection />}
        {activeComponent === "navbar" && (
          <NavbarTemplates onSelect={onselect} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
