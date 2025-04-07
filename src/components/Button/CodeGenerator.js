export const generateBorderRadius = (styles = {}) => {
  const {
    topLeftRadius = "0px",
    topRightRadius = "0px",
    bottomRightRadius = "0px",
    bottomLeftRadius = "0px",
  } = styles;

  return `${topLeftRadius} ${topRightRadius} ${bottomRightRadius} ${bottomLeftRadius}`;
};

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

export const generateCSS = ({ buttonType, buttonStyles = {} }) => {
  const {
    color = "#000",
    fontWeight = "400",
    fontSize = "16px",
    height = "40px",
    width = "100px",
    borderWidth = "0px",
    borderColor = "#6d45ff",
    backgroundColor = "#6d45ff",
    textDecoration = "none",
    fontFamily = "Arial",
    hoverBackgroundColor = "#5a35e0",
    hoverTextColor = "inherit",
    hoverBorderColor = "#5a35e0",
  } = buttonStyles;

  const commonStyles = `
  color: ${color};
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

  let cssCode = "";

  switch (buttonType) {
    case "Outline":
      cssCode = `.button.Outline {
  background-color: transparent;
  border: ${borderWidth} solid ${borderColor};${borderRadiusStyle}${heightAndWidthStyle}${commonStyles}
}

.button.Outline:hover {
  background-color: ${hoverBackgroundColor || "rgba(62, 65, 255, 0.1)"};
  color: ${hoverTextColor || color};
  border-color: ${hoverBorderColor || borderColor};
}`;
      break;

    case "Link":
      cssCode = `.button.Link {
  background-color: transparent;
  border: none;
  text-decoration: ${textDecoration};${commonStyles}
}

.button.Link:hover {
  text-decoration: underline;
  color: ${hoverTextColor || color};
}`;
      break;

    default:
      cssCode = `.button.Primary {
  background-color: ${backgroundColor};
  border: ${borderWidth} solid ${borderColor};${borderRadiusStyle}${heightAndWidthStyle}${commonStyles}
}

.button.Primary:hover {
  background-color: ${hoverBackgroundColor || "#5a35e0"};
  color: ${hoverTextColor || "#ffffff"};
  border-color: ${hoverBorderColor || borderColor};
}`;
  }

  return cssCode;
};

export const generateSCSS = ({ buttonType, buttonStyles = {} }) => {
  const {
    color = "#000",
    fontWeight = "400",
    fontSize = "16px",
    height = "40px",
    width = "100px",
    borderWidth = "0px",
    borderColor = " #6d45ff",
    backgroundColor = " #6d45ff",
    textDecoration = "none",
    fontFamily = "Arial",
    hoverBackgroundColor = "#5a35e0",
    hoverTextColor = "inherit",
    hoverBorderColor = "#5a35e0",
  } = buttonStyles;

  const commonVars = `$button-color: ${color};
$button-font-weight: ${fontWeight};
$button-font-size: ${fontSize};
$button-font-family: ${fontFamily};
$button-hover-bg: ${hoverBackgroundColor || "#5a35e0"};
$button-hover-color: ${hoverTextColor || color};
$button-hover-border: ${hoverBorderColor || borderColor};`;

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

  let scssCode = "";

  switch (buttonType) {
    case "Outline":
      scssCode = `${commonVars}${heightAndWidthVar}${borderRadiusVar}
$button-bg: transparent;
$button-border: ${borderWidth} solid ${borderColor};

.button {
  &.Outline {
    background-color: $button-bg;
    border: $button-border;
    border-radius: $button-border-radius;
    color: $button-color;
    font-weight: $button-font-weight;
    font-size: $button-font-size;
    font-family: $button-font-family;
    height: $button-height;
    width: $button-width;
    
    &:hover {
      background-color: $button-hover-bg;
      color: $button-hover-color;
      border-color: $button-hover-border;
    }
  }
}`;
      break;

    case "Link":
      scssCode = `${commonVars}
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
    
    &:hover {
      text-decoration: underline;
      color: $button-hover-color;
    }
  }
}`;
      break;

    default:
      scssCode = `${commonVars}${heightAndWidthVar}${borderRadiusVar}
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
    
    &:hover {
      background-color: $button-hover-bg;
      color: $button-hover-color;
      border-color: $button-hover-border;
    }
  }
}`;
  }

  return scssCode;
};
