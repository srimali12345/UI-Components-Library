import { generateHTML as generateButtonHTML, generateCSS as generateButtonCSS, generateSCSS as generateButtonSCSS } from '../components/Button/CodeGenerator';
import { generateHTML as generateCardHTML, generateCSS as generateCardCSS, generateSCSS as generateCardSCSS } from '../components/Card/CardCodeGenerator';
import { generateHTML as generateInputHTML, generateCSS as generateInputCSS, generateSCSS as generateInputSCSS } from '../components/InputFeild/InputCodeGenerator';
import { generateLoginHTML as generateLoginHTML, generateLoginCSS as generateLoginCSS, generateLoginSCSS as generateLoginSCSS } from '../themes/Login/LoginCodeGenerator';
import { generateHTML as generateNavbarHTML, generateCSS as generateNavbarCSS, generateSASS as generateNavbarSCSS } from '../components/Navbar/utils/CodeGenerator';

export const generateFavoriteCode = (component, codeType) => {
  const { componentType, savedStyles = {}, buttonText, cardTitle, cardContent, placeholderText, loginTitle, navItems } = component;

  try {
    switch (componentType) {
      case "BUTTON":
        const buttonProps = {
          buttonType: component.buttonType,
          buttonText: buttonText || component.label,
          buttonStyles: savedStyles
        };
        
        switch (codeType) {
          case "html":
            return generateButtonHTML(buttonProps);
          case "css":
            return generateButtonCSS(buttonProps);
          case "scss":
            return generateButtonSCSS(buttonProps);
          default:
            return "Invalid code type";
        }

      case "CARD":
        const cardProps = {
          cardStyles: savedStyles,
          cardTitle: cardTitle || "Card Title",
          cardContent: cardContent || "Card content...",
          cardType: component.cardType
        };
        
        switch (codeType) {
          case "html":
            return generateCardHTML(cardProps);
          case "css":
            return generateCardCSS(cardProps);
          case "scss":
            return generateCardSCSS(cardProps);
          default:
            return "Invalid code type";
        }

      case "INPUT":
        const inputProps = {
          inputStyles: savedStyles,
          placeholderText: placeholderText || "Enter text...",
          inputType: component.inputType
        };
        
        switch (codeType) {
          case "html":
            return generateInputHTML(inputProps);
          case "css":
            return generateInputCSS(inputProps);
          case "scss":
            return generateInputSCSS(inputProps);
          default:
            return "Invalid code type";
        }

      case "LOGIN":
        const loginProps = {
          loginStyles: savedStyles,
          loginTitle: loginTitle || "Login Form",
          loginType: component.loginType
        };
        
        switch (codeType) {
          case "html":
            return generateLoginHTML(loginProps);
          case "css":
            return generateLoginCSS(loginProps);
          case "scss":
            return generateLoginSCSS(loginProps);
          default:
            return "Invalid code type";
        }

      case "NAV":
      case "NAVBAR":
        const navbarProps = {
          navbarStyle: savedStyles,
          navItems: navItems || [
            { id: 1, text: "Home", active: true, url: "/" },
            { id: 2, text: "About", active: false, url: "/about" }
          ]
        };
        
        switch (codeType) {
          case "html":
            return generateNavbarHTML(navbarProps.navbarStyle, navbarProps.navItems);
          case "css":
            return generateNavbarCSS(navbarProps.navbarStyle, navbarProps.navItems);
          case "scss":
            return generateNavbarSCSS(navbarProps.navbarStyle, navbarProps.navItems);
          default:
            return "Invalid code type";
        }

      default:
        return `<!-- No code generator available for ${componentType} -->`;
    }
  } catch (error) {
    console.error(`Error generating ${codeType} code for ${componentType}:`, error);
    return `<!-- Error generating code: ${error.message} -->`;
  }
};

// Helper function to get all code types for a component
export const getAllCodesForComponent = (component) => {
  return {
    html: generateFavoriteCode(component, "html"),
    css: generateFavoriteCode(component, "css"),
    scss: generateFavoriteCode(component, "scss")
  };
};
