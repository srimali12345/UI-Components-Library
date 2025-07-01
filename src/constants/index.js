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

export const loginDefaults = {
  Classic: {
    backgroundColor: "#ffffff",
    borderColor: "#e1e5e9",
    borderWidth: "1px",
    borderRadius: "8px",
    padding: "24px",
    width: "200px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    titleColor: "#1a1a1a",
    titleFontSize: "24px",
    titleFontWeight: "600",
    labelColor: "#374151",
    labelFontSize: "14px",
    inputBackgroundColor: "#ffffff",
    inputBorderColor: "#d1d5db",
    inputBorderRadius: "6px",
    inputPadding: "12px",
    inputFontSize: "16px",
    buttonBackgroundColor: "#3b82f6",
    buttonColor: "#ffffff",
    buttonBorderRadius: "6px",
    buttonPadding: "12px 24px",
    buttonFontWeight: "500",
    rememberMeColor: "#374151"
  },
  Modern: {
    backgroundColor: "#ffffff",
    borderColor: "transparent",
    borderWidth: "0px",
    borderRadius: "16px",
    padding: "24px",
    width: "200px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    titleColor: "#111827",
    titleFontSize: "28px",
    titleFontWeight: "700",
    labelColor: "#6b7280",
    labelFontSize: "14px",
    inputBackgroundColor: "#f9fafb",
    inputBorderColor: "transparent",
    inputBorderRadius: "12px",
    inputPadding: "16px",
    inputFontSize: "16px",
    buttonBackgroundColor: "#6366f1",
    buttonColor: "#ffffff",
    buttonBorderRadius: "12px",
    buttonPadding: "16px 32px",
    buttonFontWeight: "600",
    rememberMeColor: "#6b7280"
  },
  Minimal: {
    backgroundColor: "transparent",
    borderColor: "#e5e7eb",
    borderWidth: "1px",
    borderRadius: "4px",
    padding: "24px",
    width: "200px",
    boxShadow: "none",
    titleColor: "#000000",
    titleFontSize: "20px",
    titleFontWeight: "400",
    labelColor: "#000000",
    labelFontSize: "13px",
    inputBackgroundColor: "#ffffff",
    inputBorderColor: "#000000",
    inputBorderRadius: "0px",
    inputPadding: "16px",
    inputFontSize: "14px",
    buttonBackgroundColor: "#000000",
    buttonColor: "#ffffff",
    buttonBorderRadius: "0px",
    buttonPadding: "12px 20px",
    buttonFontWeight: "400",
    rememberMeColor: "#000000"
  }
};


export const buttonTypes = [
  { type: "Primary", label: "Primary Button" },
  { type: "Outline", label: "Outline Button" },
  { type: "Link", label: "Link Button" }
];

export const loginTypes = [
  {
    type: "Classic",
    label: "Classic Login"
  },
  {
    type: "Modern", 
    label: "Modern Login"
  },
  {
    type: "Minimal",
    label: "Minimal Login"
  }
];
