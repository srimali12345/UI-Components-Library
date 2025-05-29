import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import { loginTypes } from "../../constants";
import LoginCodeModal from "./LoginCodeModal";
import "../../styles/themes/login.scss";
import FavouriteButton from "../../commonComponents/FavouriteButton";
import { loginDefaults } from "../../constants";

const LoginSelection = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLoginType, setSelectedLoginType] = useState("");
  const [selectedLoginStyles, setSelectedLoginStyles] = useState({});

  const CustomizedLoginPreview = ({ defaultStyles, onClick, className = "" }) => {
    const formStyles = {
      backgroundColor: defaultStyles.backgroundColor,
      border: `${defaultStyles.borderWidth} solid ${defaultStyles.borderColor}`,
      borderRadius: defaultStyles.borderRadius,
      padding: defaultStyles.padding,
      width: defaultStyles.width,
      boxShadow: defaultStyles.boxShadow,
      maxWidth: "200px",
      transform: "scale(0.6)",
      transformOrigin: "top left",
      cursor: "pointer"
    };

    const titleStyles = {
      color: defaultStyles.titleColor,
      fontSize: `${parseInt(defaultStyles.titleFontSize) * 0.7}px`,
      fontWeight: defaultStyles.titleFontWeight,
      margin: "0 0 12px 0",
      textAlign: "center"
    };

    const inputStyles = {
      backgroundColor: defaultStyles.inputBackgroundColor,
      border: `1px solid ${defaultStyles.inputBorderColor}`,
      borderRadius: defaultStyles.inputBorderRadius,
      padding: "6px",
      width: "100%",
      fontSize: "10px",
      marginBottom: "8px"
    };

    const buttonStyles = {
      backgroundColor: defaultStyles.buttonBackgroundColor,
      color: defaultStyles.buttonColor,
      border: "none",
      borderRadius: defaultStyles.buttonBorderRadius,
      padding: "6px 12px",
      width: "100%",
      fontSize: "10px",
      fontWeight: defaultStyles.buttonFontWeight,
      cursor: "pointer"
    };

    return (
      <div style={formStyles} onClick={onClick} className={className}>
        <h3 style={titleStyles}>Login Form</h3>
        <div style={{ marginBottom: "8px" }}>
          <label style={{ fontSize: "8px", color: defaultStyles.labelColor }}>Username:</label>
          <input style={inputStyles} placeholder="Enter username" readOnly />
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label style={{ fontSize: "8px", color: defaultStyles.labelColor }}>Password:</label>
          <input style={inputStyles} type="password" placeholder="Enter password" readOnly />
        </div>
        <div style={{ marginBottom: "8px", fontSize: "8px", color: defaultStyles.rememberMeColor }}>
          <input type="checkbox" style={{ marginRight: "4px" }} readOnly />
          Remember me
        </div>
        <button style={buttonStyles}>Login</button>
      </div>
    );
  };

  const handleOpenModal = (type) => {
    setSelectedLoginType(type);
    setModalVisible(true);

    const stylesStorageKey = `login-styles-${type}`;
    const savedStyles = localStorage.getItem(stylesStorageKey);

    if (savedStyles) {
      try {
        const parsedStyles = JSON.parse(savedStyles);
        setSelectedLoginStyles({ ...loginDefaults[type], ...parsedStyles });
      } catch (error) {
        console.error("Error parsing saved styles:", error);
        setSelectedLoginStyles(loginDefaults[type] || {});
      }
    } else {
      setSelectedLoginStyles(loginDefaults[type] || {});
    }
  };

  return (
    <div className="login-dashboard">
      <div className="dashboard-header">
        <h2 className="component-title">Login Forms</h2>
        <button 
          className="create-custom-btn"
          onClick={() => navigate('/customize/login/custom')}
        >
          Create Your Own Login
        </button>
      </div>
      
      <div className="login-list">
        {loginTypes.map((login) => (
          <div key={login.type} className="login-list-wrap">
            <p className="login-wrap-title">{login.label}</p>
            <div className="login-wrap">
              <CustomizedLoginPreview
                defaultStyles={loginDefaults[login.type] || {}}
                onClick={() => navigate(`/customize/login/${login.type}`)}
              />

              <div className="flex-wrap">
                <FavouriteButton
                  component={{
                    id: `login-${login.type}`,
                    type: "Login",
                    subtype: login.type,
                    label: login.label,
                  }}
                />
                <button
                  className="btn-tool-wrap"
                  title="View code"
                  onClick={() => handleOpenModal(login.type)}
                >
                  <img src={copyIcon} alt="icon" className="btn-icon" />
                </button>
                <button
                  className="btn-tool-wrap"
                  title="Customize styles"
                  onClick={() => navigate(`/customize/login/${login.type}`)}
                >
                  <img src={toolIcon} alt="icon" className="btn-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalVisible && (
        <LoginCodeModal
          loginType={selectedLoginType}
          loginStyles={selectedLoginStyles}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default LoginSelection;
