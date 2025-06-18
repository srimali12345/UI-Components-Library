import React from "react";
import "../../src/styles/pages/home.scss";
import { useNavigate } from "react-router-dom";
import cardIcon1 from "../images/cardIcon-1.png";
import cardIcon2 from "../images/cardIcon-2.png";
import cardIcon3 from "../images/cardIcon-3.png";
import htmlIcon from "../images/html.png";
import cssIcon from "../images/css.png";
import sasslIcon from "../images/sass.png";
import faqIcon from "../images/faq.png";
import bgImage from '../images/bg-art.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="content" style={{ '--bg-image': `url(${bgImage})` }}>
        <h1 className="title">Component Library v0.1</h1>
        <span className="sub-title">
          Speed up with our intuitive and engaging UI components!
        </span>
        <div className="image-wrap">
        <img src={htmlIcon} alt="icon" className="img-icon" />
        <img src={cssIcon} alt="icon" className="img-icon" />
        <img src={sasslIcon} alt="icon" className="img-icon" />
        </div>
        <button
          className="btn-primary mt-50"
          onClick={() => navigate(`/dashboard`)}
        >
          Get Started Now
        </button>
      </div>
      <div className="container">
        <div className="card-content">
          <div className="card-wrap">
            <img src={cardIcon1} alt="icon" className="card-icon" />
            <p className="card-title">Timeless elegance</p>
            <span className="card-text">
              Create stunning user interfaces effortlessly. Use One Billion Tech
              Material Design as your foundation, or design your own elegant
              theme.
            </span>
          </div>
          <div className="card-wrap">
            <img src={cardIcon2} alt="icon" className="card-icon" />
            <p className="card-title">Documentation</p>
            <span className="card-text">
              Our components combine flexibility with strength, giving you
              complete control over their appearance and functionality.
            </span>
          </div>
          <div className="card-wrap">
            <img src={cardIcon3} alt="icon" className="card-icon" />
            <p className="card-title">Committed to inclusivity</p>
            <span className="card-text">
              We are committed to creating solutions for all users, which is why
              we prioritize accessibility in every new feature we release.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
