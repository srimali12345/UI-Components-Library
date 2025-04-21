export const generateBorderRadius = (styles = {}) => {
  const {
    topLeftRadius = "4px",
    topRightRadius = "4px",
    bottomRightRadius = "4px",
    bottomLeftRadius = "4px",
  } = styles;

  if (
    topLeftRadius === topRightRadius &&
    topRightRadius === bottomRightRadius &&
    bottomRightRadius === bottomLeftRadius
  ) {
    return topLeftRadius;
  }

  return `${topLeftRadius} ${topRightRadius} ${bottomRightRadius} ${bottomLeftRadius}`;
};

export const generateHTML = ({ inputType, placeholderText }) => {
  return `<input
    type="${inputType.toLowerCase()}"
    class="custom-input ${inputType}"
    placeholder="${placeholderText}"
  />`;
};

export const generateCSS = ({ inputType, inputStyles = {} }) => {
  const {
    backgroundColor = "#ffffff",
    color = "#333333",
    borderWidth = "1px",
    borderStyle = "solid",
    borderColor = "#cccccc",
    focusBorderColor = "#6d45ff",
    width = "200px",
    height = "40px",
    fontSize = "14px",
    fontWeight = "normal",
    fontFamily = "Arial",
    padding = "0px 12px",
    display = "block",
    placeholderColor = "#999999",
    placeholderFontSize = "14px",
    placeholderOpacity = "0.7",
    placeholderFontStyle = "normal",
  } = inputStyles;

  const borderRadius = generateBorderRadius(inputStyles);

  return `.custom-input.${inputType} {
    width: ${width};
    height: ${height};
    padding: ${padding};
    background-color: ${backgroundColor};
    color: ${color};
    border: ${borderWidth} ${borderStyle} ${borderColor};
    border-radius: ${borderRadius};
    font-size: ${fontSize};
    font-weight: ${fontWeight};
    font-family: ${fontFamily};
    display: ${display};
    transition: border-color 0.2s ease;
  }
  
  .custom-input.${inputType}:focus {
    outline: none;
    border-color: ${focusBorderColor};
  }
  
  .custom-input.${inputType}::placeholder {
    color: ${placeholderColor};
    font-size: ${placeholderFontSize};
    opacity: ${placeholderOpacity};
    font-style: ${placeholderFontStyle};
  }`;
};

export const generateSCSS = ({ inputType, inputStyles = {} }) => {
  const {
    backgroundColor = "#ffffff",
    color = "#333333",
    borderWidth = "1px",
    borderStyle = "solid",
    borderColor = "#cccccc",
    focusBorderColor = "#6d45ff",
    width = "200px",
    height = "40px",
    fontSize = "14px",
    fontWeight = "normal",
    fontFamily = "Arial",
    padding = "0px 12px",
    display = "block",
    placeholderColor = "#999999",
    placeholderFontSize = "14px",
    placeholderOpacity = "0.7",
    placeholderFontStyle = "normal",
  } = inputStyles;

  const borderRadius = generateBorderRadius(inputStyles);

  return `$input-bg: ${backgroundColor};
  $input-color: ${color};
  $input-border: ${borderWidth} ${borderStyle} ${borderColor};
  $input-border-focus: ${focusBorderColor};
  $input-radius: ${borderRadius};
  $input-font-size: ${fontSize};
  $input-padding: ${padding};
  $placeholder-color: ${placeholderColor};
  
  .custom-input {
    &.${inputType} {
      width: ${width};
      height: ${height};
      padding: $input-padding;
      background-color: $input-bg;
      color: $input-color;
      border: $input-border;
      border-radius: $input-radius;
      font-size: $input-font-size;
      font-weight: ${fontWeight};
      font-family: ${fontFamily};
      display: ${display};
      transition: border-color 0.2s ease;
      
      &:focus {
        outline: none;
        border-color: $input-border-focus;
      }
      
      &::placeholder {
        color: ${placeholderColor};
        font-size: ${placeholderFontSize};
        opacity: ${placeholderOpacity};
        font-style: ${placeholderFontStyle};
      }
    }
  }`;
};
