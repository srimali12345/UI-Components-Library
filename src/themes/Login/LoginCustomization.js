import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import LoginToolBox from "./LoginToolBox";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import LoginPreview from "./LoginPreview";
import LoginCodePanel from "./LoginCodePanel";
import { useComponentCustomization } from "../../contexts/ComponentCustomizationSaveContext";
import { useFavorites } from "../../contexts/FavouriteContext";
import { loginDefaults } from "../../constants";

const LoginCustomization = () => {
  const { loginType } = useParams();
  const location = useLocation();
  const actualLoginType = loginType || "Classic";
  const defaultTitle = "Login Form";

  // Get data from navigation state (when coming from favorites)
  const navigationState = location.state || {};
  const fromFavorite = navigationState.fromFavorite || false;
  const existingStyles = navigationState.existingStyles || {};
  const existingTitle = navigationState.existingTitle || defaultTitle;

  console.log("LoginCustomization - Navigation state:", {
    fromFavorite,
    existingStyles,
    existingTitle,
  });

  const [
    loginStyles,
    setLoginStyles,
    loginTitle,
    setLoginTitle,
    ,
    ,
    ,
    ,
    handleRevert,
    savingState,
    hasPreviouslySaved,
    hasUnsavedChanges,
    isInitialized,
  ] = useComponentCustomization(
    "login",
    actualLoginType,
    loginDefaults[actualLoginType],
    defaultTitle,
    "", // defaultContent
    [], // defaultNavItems
    fromFavorite, // isFromFavorites
    existingStyles, // existingStyles from favorites
    existingTitle // existingTitle from favorites
  );

  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the current component is a favorite on component mount
  useEffect(() => {
    if (favorites) {
      const isCurrentlyFavorite = favorites.some(
        (fav) =>
          fav.componentType === "LOGIN" &&
          fav.loginType === actualLoginType &&
          fav.loginTitle === loginTitle
      );
      setIsFavorite(isCurrentlyFavorite);
    }
  }, [favorites, actualLoginType, loginTitle]);

  const handleToggleFavorite = () => {
    if (!favorites) return; // Prevent errors if favorites context isn't available

    const componentData = {
      componentType: "LOGIN",
      loginType: actualLoginType,
      loginTitle: loginTitle,
      savedStyles: loginStyles,
      favoriteName: loginTitle || "Login Form",
    };

    if (isFavorite) {
      const favoriteToRemove = favorites.find(
        (fav) =>
          fav.componentType === "LOGIN" &&
          fav.loginType === actualLoginType &&
          fav.loginTitle === loginTitle
      );
      if (favoriteToRemove) {
        removeFavorite(favoriteToRemove.id);
      }
    } else {
      addFavorite(componentData);
    }
    setIsFavorite(!isFavorite);
  };

  // Show loading state until initialized
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading customization...</div>
      </div>
    );
  }

  return (
    <>
      <CustomizationLayout
        activeTabOnBack="login"
        itemLabel={`LOGIN1 - ${loginType || "Classic"} Form`}
        componentType="login"
        componentId={actualLoginType}
        currentStyles={loginStyles}
        currentTitle={loginTitle}
        customLabel={`${actualLoginType} Login Form`}
        hasUnsavedChanges={hasUnsavedChanges}
        onDiscardChanges={handleRevert}
        savingState={savingState}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        mainContent={
          <LoginPreview
            loginStyles={loginStyles}
            loginTitle={loginTitle}
            loginType={loginType}
          />
        }
        codePanel={
          <LoginCodePanel
            loginTitle={loginTitle}
            loginType={loginType}
            loginStyles={loginStyles}
          />
        }
        toolBox={
          <LoginToolBox
            loginStyles={loginStyles}
            setLoginStyles={setLoginStyles}
            loginTitle={loginTitle}
            setLoginTitle={setLoginTitle}
            loginType={actualLoginType}
            onRevert={handleRevert}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        }
      />
    </>
  );
};

export default LoginCustomization;