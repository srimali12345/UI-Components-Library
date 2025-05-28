
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
    hasPreviouslySaved
  ] = useComponentCustomization(
    "navbar",
    selectedTemplate ? selectedTemplate.id : "custom",
    selectedTemplate ? { ...navbarDefaultStyles, ...selectedTemplate.style } : navbarDefaultStyles,
    selectedTemplate ? selectedTemplate.name : "Custom Navbar",
    "",
    selectedTemplate ? selectedTemplate.navItems : defaultNavItems
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

  return (
    <CustomizationLayout
      itemLabel={navbarTitle}
      activeTabOnBack="navbar"
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
        />
      }
    />
  );
};

export default NavbarCustomizer;