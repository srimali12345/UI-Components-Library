import React, { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";
import { generateHTML, generateCSS, generateSASS } from "./utils/CodeGenerator";
import PreviewPane from "./PreviewPane";
import CodeViewer from "./CodeViewer";
import NavbarToolBox from "./NavbarToolBox";
import { templates } from "./NavbarList";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import { useComponentCustomization } from "../../contexts/ComponentCustomizationSaveContext";
import { navbarDefaultStyles } from "../../constants";

const NavbarCustomizer = () => {
  const location = useLocation();
  const selectedTemplate = location.state?.template || templates[0];
  const defaultNavItems = [
    { id: 1, text: "Home", active: true, url: "/" },
    { id: 2, text: "About", active: false, url: "/about" },
    { id: 3, text: "Services", active: false, url: "/services" },
  ];

  // Get data from navigation state (when coming from favorites)
  const navigationState = location.state || {};
  const fromFavorite = navigationState.fromFavorite || false;
  const existingStyles = navigationState.existingStyles || {};
  const existingTitle = navigationState.existingTitle || (selectedTemplate ? selectedTemplate.name : "Custom Navbar");
  const existingNavItems = navigationState.existingNavItems || (selectedTemplate ? selectedTemplate.navItems : defaultNavItems);

  console.log("NavbarCustomizer - Navigation state:", {
    fromFavorite,
    existingStyles,
    existingTitle,
    existingNavItems,
  });

  const [
    navbarStyle,
    setNavbarStyle,
    navbarTitle,
    ,
    ,
    ,
    navItems,
    setNavItems,
    handleRevert,
    savingState,
    hasPreviouslySaved,
    hasUnsavedChanges,
    isInitialized,
  ] = useComponentCustomization(
    "navbar",
    selectedTemplate ? selectedTemplate.id : "custom",
    selectedTemplate ? { ...navbarDefaultStyles, ...selectedTemplate.style, ...existingStyles } : { ...navbarDefaultStyles, ...existingStyles },
    existingTitle, // Use existing title from favorites
    "",
    existingNavItems, // Use existing nav items from favorites
    fromFavorite, // isFromFavorites
    existingStyles, // existingStyles from favorites
    existingTitle, // existingTitle from favorites
    "", // existingContent (not used for navbar)
    existingNavItems // existingNavItems from favorites
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--nav-hover-color",
      navbarStyle.hoverColor || "#7E69AB"
    );
  }, [navbarStyle.hoverColor]);

  const [activeTab, setActiveTab] = useState("html");

  const handleAddNavItem = (newItem) => {
    setNavItems([...navItems, { ...newItem, id: Date.now() }]);
  };

  const handleUpdateNavItem = (parentId, updatedItem) => {
    setNavItems(
      navItems.map((item) => (item.id === parentId ? updatedItem : item))
    );
  };

  const handleDeleteNavItem = (itemId) => {
    setNavItems(navItems.filter((item) => item.id !== itemId));
  };

  const handleSetActiveItem = (itemId) => {
    setNavItems(
      navItems.map((item) => ({
        ...item,
        active: item.id === itemId,
      }))
    );
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
    <CustomizationLayout
      itemLabel={navbarTitle}
      activeTabOnBack="navbar"
      componentType="navbar"
      componentId={selectedTemplate ? selectedTemplate.id : "custom"}
      currentStyles={navbarStyle}
      currentTitle={navbarTitle}
      currentNavItems={navItems}
      customLabel={`${navbarTitle} Navbar`}
      hasUnsavedChanges={hasUnsavedChanges}
      onDiscardChanges={handleRevert}
      savingState={savingState}
      hasPreviouslySaved={hasPreviouslySaved}
      mainContent={
        <PreviewPane
          navbarStyle={navbarStyle}
          navItems={navItems}
          templateId={selectedTemplate ? selectedTemplate.id : null}
        />
      }
      codePanel={
        <CodeViewer
          activeTab={activeTab}
          html={generateHTML(navbarStyle, navItems)}
          css={generateCSS(navbarStyle, navItems)}
          sass={generateSASS(navbarStyle, navItems)}
        />
      }
      toolBox={
        <NavbarToolBox
          navbarStyle={navbarStyle}
          setNavbarStyle={setNavbarStyle}
          navItems={navItems}
          onAddNavItem={handleAddNavItem}
          onUpdateNavItem={handleUpdateNavItem}
          onDeleteNavItem={handleDeleteNavItem}
          onSetActiveItem={handleSetActiveItem}
          setNavItems={setNavItems}
          onRevert={handleRevert}
          savingState={savingState}
          hasPreviouslySaved={hasPreviouslySaved}
        />
      }
    />
  );
};

export default NavbarCustomizer;
