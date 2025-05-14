import React from "react";
import { Link } from "react-router-dom";
import "../../src/styles/components/nav.scss";
import faqIcon from "../images/faq.png";
import { Heart } from "lucide-react";
import { useFavorites } from "../contexts/FavouriteContext";

const Navbar = () => {
  const { favorites } = useFavorites();
  const hasFavorites = favorites.length > 0;
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
            <Link to="/favourites">
              <Heart size={16} className="nav-heart-icon" />
              Favourites{" "}
              {hasFavorites && (
                <span className="favorites-count">{favorites.length}</span>
              )}
            </Link>
          </li>
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
