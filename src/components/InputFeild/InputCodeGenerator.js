function generateBorderRadius(styles = {}) {
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
}

function generateHTML({ inputType, placeholderText, inputStyles = {} }) {
  const isSearch = inputType.toLowerCase() === "search";
  const showSearchIcon = inputStyles.showSearchIcon;

  return `<div class="input-wrapper">
  ${
    isSearch && showSearchIcon
      ? `<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>`
      : ""
  }
  <input
    type="${inputType.toLowerCase()}"
    class="custom-input ${inputType}"
    placeholder="${placeholderText}"
  />
</div>`;
}

function generateCSS({ inputType, inputStyles = {} }) {
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
    borderRadius,
    showSearchIcon = true,
    iconSize = 18,
    iconColor = color,
    iconPosition = "right",
  } = inputStyles;

  const resolvedBorderRadius = borderRadius || generateBorderRadius(inputStyles);
  const isSearch = inputType.toLowerCase() === "search";
  const additionalPadding =
    showSearchIcon && isSearch
      ? iconPosition === "right"
        ? "padding-right: 40px;"
        : "padding-left: 40px;"
      : "";

  const iconPositionStyle =
    iconPosition === "left" ? "left: 12px;" : "right: 12px;";

  return `.input-wrapper {
  position: relative;
  display: inline-block;
}

.custom-input.${inputType} {
  width: ${width};
  height: ${height};
  padding: ${padding};
  ${additionalPadding}
  background-color: ${backgroundColor};
  color: ${color};
  border: ${borderWidth} ${borderStyle} ${borderColor};
  border-radius: ${resolvedBorderRadius};
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
}

${
  showSearchIcon && isSearch
    ? `.search-icon {
  position: absolute;
  top: 50%;
  ${iconPositionStyle}
  transform: translateY(-50%);
  width: ${iconSize}px;
  height: ${iconSize}px;
  color: ${iconColor};
  pointer-events: none;
}`
    : ""
}`;
}

function generateSCSS({ inputType, inputStyles = {} }) {
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
    borderRadius,
    showSearchIcon = true,
    iconPosition = "right",
    iconSize = 18,
  } = inputStyles;

  const resolvedBorderRadius = borderRadius || generateBorderRadius(inputStyles);
  const isSearch = inputType.toLowerCase() === "search";
  const iconPositionStyle = iconPosition === "left" ? "left: 12px;" : "right: 12px;";
  const paddingAdjustment =
    showSearchIcon && isSearch
      ? iconPosition === "left"
        ? "padding-left: 40px;"
        : "padding-right: 40px;"
      : "";

  return `$input-bg: ${backgroundColor};
$input-color: ${color};
$input-border: ${borderWidth} ${borderStyle} ${borderColor};
$input-border-focus: ${focusBorderColor};
$input-radius: ${resolvedBorderRadius};
$input-font-size: ${fontSize};
$input-padding: ${padding};
$placeholder-color: ${placeholderColor};
$placeholder-font-size: ${placeholderFontSize};
$placeholder-opacity: ${placeholderOpacity};
$placeholder-style: ${placeholderFontStyle};

.input-wrapper {
  position: relative;
  display: inline-block;

  ${
    isSearch && showSearchIcon
      ? `.search-icon {
    position: absolute;
    top: 50%;
    ${iconPositionStyle}
    transform: translateY(-50%);
    width: ${iconSize}px;
    height: ${iconSize}px;
    color: $input-color;
    pointer-events: none;
  }`
      : ""
  }
}

.custom-input {
  &.${inputType} {
    width: ${width};
    height: ${height};
    padding: $input-padding;
    ${paddingAdjustment}
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
      color: $placeholder-color;
      font-size: $placeholder-font-size;
      opacity: $placeholder-opacity;
      font-style: $placeholder-style;
    }
  }
}`;
}

export { generateBorderRadius, generateHTML, generateCSS, generateSCSS };
