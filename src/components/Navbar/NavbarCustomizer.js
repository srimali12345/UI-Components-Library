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

const NavbarCustomizer = ({ onSelect, template }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTemplate = location.state?.template;
  const [navbarStyle, setNavbarStyle] = useState({
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
  });

  const [navItems, setNavItems] = useState([
    { id: 1, text: "Item1", active: true, url: "/" },
    { id: 2, text: "Item2", active: false, url: "/item2" },
    { id: 3, text: "Item3", active: false, url: "/item3" },
  ]);

  const [isCodeVisible, setIsCodeVisible] = useState(false);

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
  }, [selectedTemplate]);

  const [activeTab, setActiveTab] = useState("html");

  const handleAddNavItem = (newItem) => {
    setNavItems([...navItems, { ...newItem, id: Date.now() }]);
  };

  const handleUpdateNavItem = (updatedItem) => {
    setNavItems(
      navItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
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
            css={generateCSS(navbarStyle)}
            sass={generateSASS(navbarStyle)}
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
          />
        }
      />
    </div>
  );
};

export default NavbarCustomizer;
