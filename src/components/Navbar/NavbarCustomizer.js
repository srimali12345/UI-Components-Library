
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Copy, EyeOff, Eye } from "lucide-react";
import { generateHTML, generateCSS, generateSASS } from "./utils/CodeGenerator";
import PreviewPane from "./PreviewPane";
import CodeViewer from "./CodeViewer";
import NavbarToolBox from "./NavbarToolBox";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { templates } from "./NavbarList";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import { useComponentCustomization } from "../../contexts/ComponentCustomizationSaveContext";

const NavbarCustomizer = () => {
  const location = useLocation();
  const selectedTemplate = location.state?.template || templates[0];

  const defaultStyles = {
    backgroundColor: "#1A1F2C",
    textColor: "#ffffff",
    activeColor: "#9b87f5",
    hoverColor: "#7E69AB",
    logoUrl: "",
    height: "60px",
    padding: "0 20px",
    borderRadius: "0px",
    hasSearch: false,
    navPosition: "left",
    borderColor: "#e5e7eb",
    borderWidth: "1px",
    topLeftRadius: "6px",
    topRightRadius: "6px",
    bottomLeftRadius: "6px",
    bottomRightRadius: "6px",
    searchBarBackgroundColor: "rgba(255, 255, 255, 0.1)",
    searchBorderTopLeftRadius: "6px",
    searchBorderTopRightRadius: "6px",
    searchBorderBottomLeftRadius: "6px",
    searchBorderBottomRightRadius: "6px",
    SearchBorderWidth: "1px",
    SearchBarBorderColor: "#e5e7eb",
    searchBorderRadius: "6px",
  };

  const defaultNavItems = [
    { id: 1, text: "Home", active: true, url: "/" },
    { id: 2, text: "About", active: false, url: "/about" },
    { id: 3, text: "Services", active: false, url: "/services" },
  ];

  const [
    navbarStyle,
    setNavbarStyle,
    navbarTitle,
    setNavbarTitle,
    navbarContent,
    setNavbarContent,
    navItems,
    setNavItems,
    handleRevert,
    savingState,
    hasPreviouslySaved
  ] = useComponentCustomization(
    "navbar",
    selectedTemplate ? selectedTemplate.id : "custom",
    selectedTemplate ? { ...defaultStyles, ...selectedTemplate.style } : defaultStyles,
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