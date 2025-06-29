import React from "react";
import { NavLink } from "react-router-dom";
import "../../src/styles/components/nav.scss";
import faqIcon from "../images/faq.png";

const Navbar = () => {
  return (
    <nav>
      <div className="container nav-wrap">
        <NavLink to="/">
          <img
            src="https://1billiontech.com/assets/images/logo.png"
            alt="logo"
            className="logo"
          />
        </NavLink>
        <ul className="nav-menu">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Customize
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/docs"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Documentation
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faq"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <img src={faqIcon} alt="icon" className="nav-icon" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
