import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import copyIcon from "../../images/code.png";
import toolIcon from "../../images/tool.png";
import { loginTypes } from "../../constants";
import LoginCodeModal from "./LoginCodeModal";
import "../../styles/themes/login.scss";
import { loginDefaults } from "../../constants";
import { useFavorites } from "../../contexts/FavouriteContext";
import { Heart, Trash2 } from "lucide-react";

const LoginSelection = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLoginType, setSelectedLoginType] = useState("");
  const [selectedLoginStyles, setSelectedLoginStyles] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);

  const { favorites, removeFavorite } = useFavorites();

  const CustomizedLoginPreview = ({
    defaultStyles,
    onClick,
    className = "",
  }) => {
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
      cursor: "pointer",
    };

    const titleStyles = {
      color: defaultStyles.titleColor,
      fontSize: `${parseInt(defaultStyles.titleFontSize) * 0.7}px`,
      fontWeight: defaultStyles.titleFontWeight,
      margin: "0 0 12px 0",
      textAlign: "center",
    };

    const inputStyles = {
      backgroundColor: defaultStyles.inputBackgroundColor,
      border: `1px solid ${defaultStyles.inputBorderColor}`,
      borderRadius: defaultStyles.inputBorderRadius,
      padding: "6px",
      width: "100%",
      fontSize: "10px",
      marginBottom: "8px",
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
      cursor: "pointer",
    };

    return (
      <div style={formStyles} onClick={onClick} className={className}>
        <h3 style={titleStyles}>Login Form</h3>
        <div style={{ marginBottom: "8px" }}>
          <label style={{ fontSize: "8px", color: defaultStyles.labelColor }}>
            Username:
          </label>
          <input style={inputStyles} placeholder="Enter username" readOnly />
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label style={{ fontSize: "8px", color: defaultStyles.labelColor }}>
            Password:
          </label>
          <input
            style={inputStyles}
            type="password"
            placeholder="Enter password"
            readOnly
          />
        </div>
        <div
          style={{
            marginBottom: "8px",
            fontSize: "8px",
            color: defaultStyles.rememberMeColor,
          }}
        >
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
    setSelectedLoginStyles(loginDefaults[type] || {});
  };

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const loginFavorites = favorites.filter(
    (component) =>
      component.type === "Login" || component.componentType === "LOGIN"
  );

  const handleCustomizeFavorite = (component) => {
    if (component.componentType === "LOGIN" && component.loginType) {
      navigate(`/customize/login/${component.loginType}`, {
        state: {
          fromFavorite: true,
          favoriteId: component.id,
          existingStyles: component.savedStyles || {},
          existingTitle: component.loginTitle || component.label || "Login Form",
        },
      });
    }
  };

  const handleRemoveFavorite = (componentId) => {
    if (window.confirm("Are you sure you want to remove this favorite?")) {
      removeFavorite(componentId);
    }
  };

  const handleShowFavoriteCode = (component) => {
    setSelectedLoginType(component.loginType || "Default");
    setSelectedLoginStyles(component.savedStyles || {});
    setModalVisible(true);
  };

  const renderFavoritePreview = (component) => {
    const savedStyles = component.savedStyles || {};

    const loginContainerStyles = {
      backgroundColor: savedStyles.backgroundColor || '#ffffff',
      border: `${savedStyles.borderWidth || "1px"} solid ${savedStyles.borderColor || "#e1e5e9"}`,
      borderRadius: savedStyles.borderRadius || '8px',
      padding: savedStyles.padding || '24px',
      boxShadow: savedStyles.boxShadow || '0 4px 12px rgba(0, 0, 0, 0.1)',
      fontFamily: "Arial, sans-serif",
      maxWidth: '280px',
      width: '100%',
      transform: 'scale(0.8)',
      transformOrigin: 'center',
    };

    const loginTitleStyles = {
      color: savedStyles.titleColor || "#1a1a1a",
      fontSize: savedStyles.titleFontSize || '18px',
      fontWeight: savedStyles.titleFontWeight || '600',
      margin: '0 0 16px 0',
      textAlign: 'center'
    };

    const loginLabelStyles = {
      color: savedStyles.labelColor || '#374151',
      fontSize: savedStyles.labelFontSize || '12px',
      fontWeight: '500',
      display: 'block',
      marginBottom: '4px'
    };

    const loginInputStyles = {
      backgroundColor: savedStyles.inputBackgroundColor || '#ffffff',
      border: `1px solid ${savedStyles.inputBorderColor || '#d1d5db'}`,
      borderRadius: savedStyles.inputBorderRadius || '6px',
      padding: savedStyles.inputPadding || '8px',
      width: '100%',
      fontSize: savedStyles.inputFontSize || '12px',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box',
      marginBottom: '10px'
    };

    const loginButtonStyles = {
      backgroundColor: savedStyles.buttonBackgroundColor || '#3b82f6',
      color: savedStyles.buttonColor || '#ffffff',
      border: 'none',
      borderRadius: savedStyles.buttonBorderRadius || '6px',
      padding: savedStyles.buttonPadding || '8px 16px',
      width: '100%',
      fontSize: '12px',
      fontWeight: savedStyles.buttonFontWeight || '500',
      cursor: 'pointer',
      transition: 'opacity 0.2s'
    };

    const rememberMeStyles = {
      color: savedStyles.rememberMeColor || '#374151',
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      margin: '8px 0'
    };

    return (
      <div style={loginContainerStyles}>
        <h2 style={loginTitleStyles}>
          {component.loginTitle || "Login Form"}
        </h2>
        <div style={{ marginBottom: "10px" }}>
          <label style={loginLabelStyles}>Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            style={loginInputStyles}
            readOnly
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={loginLabelStyles}>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            style={loginInputStyles}
            readOnly
          />
        </div>
        <div style={rememberMeStyles}>
          <input type="checkbox" id="remember" style={{ margin: 0 }} />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button style={loginButtonStyles}>
          Login
        </button>
      </div>
    );
  };

  return (
    <div className="login-dashboard">
      <div 
        className="section-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2 className="component-title">
          <strong
            style={{
              cursor: "pointer",
            }}
            onClick={() => setShowFavorites(false)}
          >
            Login Forms
          </strong>
          {showFavorites && (
            <span
              className="favourite-link"
              style={{
                marginLeft: "5px",
                fontWeight: "normal",
                cursor: "pointer",
              }}
            >
              /Favourites
            </span>
          )}
        </h2>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {!showFavorites && (
            <button
              onClick={handleToggleFavorites}
              title="View Login favorites"
              className="fav-button"
            >
              <Heart size={16} />
              <span>Favourites ({loginFavorites.length})</span>
            </button>
          )}
        </div>
      </div>

      {showFavorites ? (
        <div className="favorites-section">
          {loginFavorites.length > 0 ? (
            <div className="login-list">
              {loginFavorites.map((component) => (
                <div key={component.id} className="login-list-wrap">
                  <div className="login-wrap-header">
                    <p className="login-wrap-title">
                      {component.favoriteName ||
                        `${component.loginType} Login`}
                    </p>
                  </div>
                  <div className="login-wrap">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "100px",
                      }}
                    >
                      {renderFavoritePreview(component)}
                    </div>

                    <div className="flex-wrap">
                      <button
                        className="btn-tool-wrap"
                        title="View code"
                        onClick={() => handleShowFavoriteCode(component)}
                      >
                        <img src={copyIcon} alt="icon" className="btn-icon" />
                      </button>
                      <button
                        className="btn-tool-wrap"
                        title="Customize styles"
                        onClick={() => handleCustomizeFavorite(component)}
                      >
                        <img src={toolIcon} alt="icon" className="btn-icon" />
                      </button>
                      <button
                        className="btn-tool-wrap"
                        title="Remove from favorites"
                        onClick={() => handleRemoveFavorite(component.id)}
                        style={{ backgroundColor: "#fee2e2" }}
                      >
                        <Trash2 size={16} color="#dc2626" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            >
              <Heart
                size={48}
                color="#d1d5db"
                style={{ marginBottom: "1rem" }}
              />
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#6b7280" }}>
                No Login Favorites Yet
              </h3>
              <p style={{ margin: 0, color: "#9ca3af" }}>
                Save your customized login forms to see them here.
              </p>
            </div>
          )}
        </div>
      ) : (
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
      )}

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
