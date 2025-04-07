import React from "react";
import { Link } from "react-router-dom";
import "../../src/styles/components/nav.scss";
import faqIcon from "../images/faq.png";

const Navbar = () => {
  return (
    <nav>
      <div className="container nav-wrap">
        <Link to="/">
          <img
            src="https://1billiontech.com/assets/images/logo.png"
            alt="logo"
            className="logo"
          />
        </Link>
        <ul className="nav-menu">
         
          <li>
            <Link to="/dashboard">Customize</Link>
          </li>
          <li>
            <Link to="/docs">Documentation</Link>
          </li>
          <li>
            <Link to="/faq">
              <img src={faqIcon} alt="icon" className="nav-icon" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
