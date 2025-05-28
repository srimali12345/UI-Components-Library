const cardCommonDefaults = {
  backgroundColor: "#ffffff",
  textColor: "#333333",
  titleColor: "#000000",
  width: "300px",
  minHeight: "200px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#e0e0e0",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  titleFontSize: "18px",
  titleFontWeight: "bold",
  contentFontSize: "14px",
  contentLineHeight: "1.5",
  borderRadius: "8px",
  hoverEffect: "shadow",
};

const inputCommonDefaults = {
  backgroundColor: "#ffffff",
  color: "#333333",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#cccccc",
  focusBorderColor: "#6d45ff",
  width: "200px",
  height: "40px",
  fontSize: "14px",
  fontWeight: "normal",
  fontFamily: "Arial",
  borderRadius: "4px",
  padding: "0px 12px",
  display: "block",
  placeholderColor: "#999999",
  placeholderFontSize: "14px",
  placeholderOpacity: "0.7",
  placeholderFontStyle: "normal",
};

export const cardDefaults = {
  Basic: {
    ...cardCommonDefaults,
  },
  Image: {
    ...cardCommonDefaults,
    imageHeight: "200px",
  },
  Action: {
    ...cardCommonDefaults,
    buttonBackgroundColor: "#f1f1f1",
    buttonTextColor: "#333333",
  },
  Pricing: {
    ...cardCommonDefaults,
    buttonBackgroundColor: "#f1f1f1",
    buttonTextColor: "#333333",
    primaryButtonBackgroundColor: "#4a6cf7",
    primaryButtonTextColor: "#ffffff",
  },
};

export const buttonDefaults = {
  Primary: {
    backgroundColor: "#6d45ff",
    color: "#ffffff",
    borderWidth: "0px",
    borderColor: "#6d45ff",
    hoverBackgroundColor: "#5a35e0",
    hoverTextColor: "#ffffff",
    hoverBorderColor: "#5a35e0",
    width: "150px",
    height: "40px",
    fontSize: "16px",
    fontWeight: "normal",
    fontFamily: "Arial",
    borderRadius: "5px",
  },
  Outline: {
    backgroundColor: "transparent",
    color: "#6d45ff",
    border: "2px solid #6d45ff",
    borderWidth: "2px",
    borderColor: "#6d45ff",
    hoverBackgroundColor: "transparent",
    hoverTextColor: "#5a35e0",
    hoverBorderColor: "#5a35e0",
    width: "150px",
    height: "40px",
    fontSize: "16px",
    fontWeight: "normal",
    fontFamily: "Arial",
  },
  Link: {
    backgroundColor: "transparent",
    color: "#6d45ff",
    borderWidth: "0px",
    borderColor: "transparent",
    hoverBackgroundColor: "transparent",
    hoverTextColor: "#5a35e0",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "normal",
    fontFamily: "Arial",
  },
};

export const inputDefaults = {
  Text: {
    ...inputCommonDefaults,
  },
  Password: {
    ...inputCommonDefaults,
  },
  Search: {
    ...inputCommonDefaults,
    borderRadius: "20px",
    showSearchIcon: true,
    iconPosition: "right",
    iconSize: 18,
    iconColor: "#8E9196",
  },
};

export const navbarDefaultStyles = {
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

export const buttonTypes = [
  { type: "Primary", label: "Primary Button" },
  { type: "Outline", label: "Outline Button" },
  { type: "Link", label: "Link Button" }
];