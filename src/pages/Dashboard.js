import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ButtonSelection from "../components/Button/ButtonSelection";
import NavbarCustomizer from "../components/Navbar/NavbarCustomizer";
import "../styles/pages/dashboard.scss";
import NavbarTemplates from "../components/Navbar/NavbarTemplates";
import InputSelection from "../components/InputFeild/InputFeildSelection";

const Dashboard = () => {
  const location = useLocation();
  const [activeComponent, setActiveComponent] = useState("buttons");

  useEffect(() => {
    if (location.state?.active) {
      setActiveComponent(location.state.active);
    }
  }, [location.state]);

  return (
    <div className="container dashboard-wrap">
      <div
        className="sidebar-wrap"
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      >
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
                activeComponent === "input" ? "active" : ""
              }`}
              onClick={() => setActiveComponent("input")}
            >
              Input Fields
            </li>
            <li
              className={`menu-text  disabled-menu `}
            >
              Select
            </li>
            <li
              className={`menu-text  disabled-menu`}
            >
              Radio Buttons
            </li>
            <li
              className={`menu-text  disabled-menu`}
            >
              Checkboxes
            </li>
          </ul>
        </div>
        <div className="mt-10">
          <p className="sub-text">Themes</p>
          <ul>
            <li
              className={`menu-text ${
                activeComponent === "navbar" ? "active" : ""
              }`}
              onClick={() => setActiveComponent("navbar")}
            >
              Navbar
            </li>
            <li
              className={`menu-text  disabled-menu `}
            >
              Footer
            </li>
            <li
              className={`menu-text  disabled-menu`}
            >
              Cards
            </li>
            <li
              className={`menu-text  disabled-menu`}
            >
              Login
            </li>
          </ul>
        </div>
      </div>

      <div className="dashboard-content">
        {activeComponent === "buttons" && <ButtonSelection />}
        {activeComponent === "navbar" && (
          <NavbarTemplates onSelect={onselect} />
        )}
        {activeComponent === "input" && <InputSelection />}
      </div>
    </div>
  );
};

export default Dashboard;
