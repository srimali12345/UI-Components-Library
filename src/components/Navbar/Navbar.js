import React, { useState, useEffect } from "react";
import NavDropdown from "./NavDropdown";
import "../../styles/components/navbarCustomization.scss";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const servicesDropdown = [
    { label: "Web Development", url: "/services/web-development" },
    { label: "Mobile App Development", url: "/services/mobile-app" },
    { label: "UI/UX Design", url: "/services/ui-ux-design" },
    { label: "Marketing", url: "/services/marketing" },
  ];

  const resourcesDropdown = [
    { label: "Blog", url: "/blog" },
    { label: "Documentation", url: "/docs" },
    { label: "Tutorials", url: "/tutorials" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">Logo</a>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <a href="/" className="navbar-link active">
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a href="/about" className="navbar-link">
              About
            </a>
          </li>
          <li className="navbar-item dropdown-container">
            <NavDropdown title="Services" items={servicesDropdown} />
          </li>
          <li className="navbar-item dropdown-container">
            <NavDropdown title="Resources" items={resourcesDropdown} />
          </li>
          <li className="navbar-item">
            <a href="/contact" className="navbar-link">
              Contact
            </a>
          </li>
        </ul>

        <div className="navbar-buttons">
          <a href="/login" className="navbar-button">
            Login
          </a>
          <a href="/signup" className="navbar-button primary">
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
