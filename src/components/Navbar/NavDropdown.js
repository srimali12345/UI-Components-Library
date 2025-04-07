import React, { useState, useRef, useEffect } from "react";
import "../../styles/components/navbarCustomization.scss";

const NavDropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div className={`nav-dropdown ${isOpen ? "open" : ""}`} ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {title}
        <svg
          className={`arrow-icon ${isOpen ? "rotated" : ""}`}
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li key={index} className="dropdown-item">
              <a href={item.url} className="dropdown-link">
                {item.icon && (
                  <span className="dropdown-icon">{item.icon}</span>
                )}
                <span className="dropdown-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavDropdown;
