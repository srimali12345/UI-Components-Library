export const generateBorderRadius = (styles = {}) => {
  const {
    topLeftRadius = "0px",
    topRightRadius = "0px",
    bottomRightRadius = "0px",
    bottomLeftRadius = "0px",
  } = styles;

  return `${topLeftRadius} ${topRightRadius} ${bottomRightRadius} ${bottomLeftRadius}`;
};

/**
 * Generates HTML code for a button
 * @param {Object} params - Parameters for HTML generation
 * @returns {string} Generated HTML code
 */
export const generateHTML = ({ buttonType, buttonText, buttonStyles = {} }) => {
  const { icon = null, iconPosition = "right" } = buttonStyles;
  const buttonTypeClass = buttonType || "Primary";
  const buttonDisplayText =
    buttonText || (buttonType ? `${buttonType} Button` : "Default Button");

  if (!icon || icon === "null") {
    return `<button class="button ${buttonTypeClass}">
    ${buttonDisplayText}
  </button>`;
  }

  return iconPosition === "left"
    ? `<button class="button ${buttonTypeClass}">
    <img src="icon.png" alt="icon" />
    ${buttonDisplayText}
  </button>`
    : `<button class="button ${buttonTypeClass}">
    ${buttonDisplayText}
    <img src="icon.png" alt="icon" />
  </button>`;
};

/**
 * Generates CSS code for a button
 * @param {Object} params - Parameters for CSS generation
 * @returns {string} Generated CSS code
 */
export const generateCSS = ({ buttonType, buttonStyles = {} }) => {
  const {
    color = "#000",
    fontWeight = "400",
    fontSize = "16px",
    height = "40px",
    width = "100px",
    borderWidth = "0px",
    borderColor = "#3E41FF",
    backgroundColor = "#3E41FF",
    textDecoration = "none",
    fontFamily = "Arial",
  } = buttonStyles;

  const commonStyles = `
    color: ${borderColor};
    font-weight: ${fontWeight};
    font-size: ${fontSize};
    font-family: ${fontFamily};`;

  const heightAndWidthStyle =
    buttonType !== "Link"
      ? `
    height: ${height};
    width: ${width};`
      : "";

  const borderRadiusStyle =
    buttonType !== "Link"
      ? `
    border-radius: ${generateBorderRadius(buttonStyles)};`
      : "";

  switch (buttonType) {
    case "Outline":
      return `.button.Outline {
    background-color: transparent;
    border: ${borderWidth} solid ${borderColor};${borderRadiusStyle}${heightAndWidthStyle}${commonStyles}
  }`;
    case "Link":
      return `.button.Link {
    background-color: transparent;
    border: none;
    text-decoration: ${textDecoration};${commonStyles}
  }`;
    default:
      return `.button.Primary {
    background-color: ${backgroundColor};
    border: ${borderWidth} solid ${borderColor};${borderRadiusStyle}${heightAndWidthStyle}${commonStyles}
  }`;
  }
};

export const generateSCSS = ({ buttonType, buttonStyles = {} }) => {
  const {
    color = "#000",
    fontWeight = "400",
    fontSize = "16px",
    height = "40px",
    width = "100px",
    borderWidth = "0px",
    borderColor = "#3E41FF",
    backgroundColor = "#3E41FF",
    textDecoration = "none",
    fontFamily = "Arial",
  } = buttonStyles;

  const commonVars = `$button-color: ${color};
  $button-font-weight: ${fontWeight};
  $button-font-size: ${fontSize};
  $button-font-family: ${fontFamily};`;

  const heightAndWidthVar =
    buttonType !== "Link"
      ? `
  $button-height: ${height};
  $button-width: ${width};`
      : "";

  const borderRadiusVar =
    buttonType !== "Link"
      ? `
  $button-border-radius: ${generateBorderRadius(buttonStyles)};`
      : "";

  switch (buttonType) {
    case "Outline":
      return `${commonVars}${heightAndWidthVar}${borderRadiusVar}
  $button-bg: transparent;
  $button-border: ${borderWidth} solid ${borderColor};
  
  .button {
    &.Outline {
      background-color: $button-bg;
      border: $button-border;
      border-radius: $button-border-radius;
      color: $button-border;
      font-weight: $button-font-weight;
      font-size: $button-font-size;
      font-family: $button-font-family;
      height: $button-height;
      width: $button-width;
    }
  }`;
    case "Link":
      return `${commonVars}
  $button-bg: transparent;
  $button-text-decoration: ${textDecoration};
  
  .button {
    &.Link {
      background-color: $button-bg;
      border: none;
      color: $button-color;
      text-decoration: $button-text-decoration;
      font-weight: $button-font-weight;
      font-size: $button-font-size;
      font-family: $button-font-family;
    }
  }`;
    default:
      return `${commonVars}${heightAndWidthVar}${borderRadiusVar}
  $button-bg: ${backgroundColor};
  $button-border: ${borderWidth} solid ${borderColor};
  
  .button {
    &.Primary {
      background-color: $button-bg;
      border: $button-border;
      border-radius: $button-border-radius;
      color: $button-color;
      font-weight: $button-font-weight;
      font-size: $button-font-size;
      font-family: $button-font-family;
      height: $button-height;
      width: $button-width;
    }
  }`;
  }
};
