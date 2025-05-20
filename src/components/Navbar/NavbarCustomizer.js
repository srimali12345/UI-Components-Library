import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Copy, EyeOff, Eye } from "lucide-react";
import { generateHTML, generateCSS, generateSASS } from "./utils/CodeGenerator";
import PreviewPane from "./PreviewPane";
import CodeViewer from "./CodeViewer";
import NavbarToolBox from "./NavbarToolBox";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { templates } from "./NavbarList";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import { useComponentCustomization } from "../../contexts/ComponentCustomizationSaveContext";

const NavbarCustomizer = ({ onSelect, template }) => {
  const location = useLocation();
  const selectedTemplate = location.state?.template;
  const defaultNavbarStyle = {
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
    { id: 1, text: "Item1", active: true, url: "/" },
    { id: 2, text: "Item2", active: false, url: "/item2" },
    { id: 3, text: "Item3", active: false, url: "/item3" },
  ];
  const navbarType = selectedTemplate?.name || "Custom";
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  // Use the hook with all the required parameters
  const [navbarStyle, setNavbarStyle, navbarText, setNavbarText, handleRevert] =
    useComponentCustomization(
      "navbar",
      navbarType,
      selectedTemplate
        ? { ...defaultNavbarStyle, ...selectedTemplate.style }
        : defaultNavbarStyle,
      ""
    );

  // Initialize navItems from localStorage if available, otherwise use default or template items
  const navItemsStorageKey = `navbar-items-${navbarType}`;

  const getInitialNavItems = () => {
    try {
      const savedItems = localStorage.getItem(navItemsStorageKey);
      return savedItems
        ? JSON.parse(savedItems)
        : selectedTemplate?.navItems || defaultNavItems;
    } catch (error) {
      console.error("Error loading saved nav items:", error);
      return selectedTemplate?.navItems || defaultNavItems;
    }
  };

  const [navItems, setNavItems] = useState(getInitialNavItems());

  // Save navItems to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(navItemsStorageKey, JSON.stringify(navItems));
    } catch (error) {
      console.error("Error saving nav items to localStorage:", error);
    }
  }, [navItems, navItemsStorageKey]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--nav-hover-color",
      navbarStyle.hoverColor || "#7E69AB"
    );
  }, [navbarStyle.hoverColor]);

  useEffect(() => {
    if (selectedTemplate) {
      setNavbarStyle((prev) => ({ ...prev, ...selectedTemplate.style }));
      setNavItems(selectedTemplate.navItems);
    }
  }, [selectedTemplate, setNavbarStyle]);

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

  // Custom revert handler that also resets nav items
  const handleCompleteRevert = () => {
    handleRevert();

    // Reset navItems and remove from localStorage
    localStorage.removeItem(navItemsStorageKey);
    setNavItems(selectedTemplate?.navItems || defaultNavItems);
  };

  return (
    <div>
      <CustomizationLayout
        itemLabel={selectedTemplate?.name || "Custom Navbar"}
        activeTabOnBack="navbar"
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
            onRevert={handleCompleteRevert}
          />
        }
      />
    </div>
  );
};

export default NavbarCustomizer;
