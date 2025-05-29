export const generateLoginHTML = ({ loginType, loginTitle, loginStyles = {} }) => {
  const formTitle = loginTitle || "Login Form";
  const formClass = loginType || "Classic";

  return `<form class="login-form ${formClass}">
  <h2 class="login-title">${formTitle}</h2>
  
  <div class="input-group">
    <label class="login-label">Username:</label>
    <input class="login-input" type="text" placeholder="Enter your username" />
  </div>
  
  <div class="input-group">
    <label class="login-label">Password:</label>
    <input class="login-input" type="password" placeholder="Enter your password" />
  </div>
  
  <div class="remember-me">
    <input type="checkbox" id="remember" />
    <label for="remember">Remember me</label>
  </div>
  
  <button class="login-button" type="submit">Login</button>
</form>`;
};

export const generateLoginCSS = ({ loginType, loginStyles = {} }) => {
  const {
    backgroundColor = "#ffffff",
    borderColor = "#e1e5e9", 
    borderWidth = "1px",
    borderRadius = "8px",
    padding = "32px",
    width = "400px",
    boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)",
    titleColor = "#1a1a1a",
    titleFontSize = "24px",
    titleFontWeight = "600",
    labelColor = "#374151",
    labelFontSize = "14px",
    inputBackgroundColor = "#ffffff",
    inputBorderColor = "#d1d5db",
    inputBorderRadius = "6px",
    inputPadding = "12px",
    inputFontSize = "16px",
    buttonBackgroundColor = "#3b82f6",
    buttonColor = "#ffffff",
    buttonBorderRadius = "6px",
    buttonPadding = "12px 24px",
    buttonFontWeight = "500",
    rememberMeColor = "#374151"
  } = loginStyles;

  return `.login-form.${loginType} {
  background-color: ${backgroundColor};
  border: ${borderWidth} solid ${borderColor};
  border-radius: ${borderRadius};
  padding: ${padding};
  width: ${width};
  max-width: 100%;
  box-shadow: ${boxShadow};
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

.login-form .login-title {
  color: ${titleColor};
  font-size: ${titleFontSize};
  font-weight: ${titleFontWeight};
  margin: 0 0 24px 0;
  text-align: center;
}

.login-form .input-group {
  margin-bottom: 16px;
}

.login-form .login-label {
  color: ${labelColor};
  font-size: ${labelFontSize};
  font-weight: 500;
  display: block;
  margin-bottom: 6px;
}

.login-form .login-input {
  background-color: ${inputBackgroundColor};
  border: 1px solid ${inputBorderColor};
  border-radius: ${inputBorderRadius};
  padding: ${inputPadding};
  width: 100%;
  font-size: ${inputFontSize};
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.login-form .login-input:focus {
  border-color: ${buttonBackgroundColor};
  box-shadow: 0 0 0 3px ${buttonBackgroundColor}20;
}

.login-form .remember-me {
  color: ${rememberMeColor};
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0;
}

.login-form .login-button {
  background-color: ${buttonBackgroundColor};
  color: ${buttonColor};
  border: none;
  border-radius: ${buttonBorderRadius};
  padding: ${buttonPadding};
  width: 100%;
  font-size: 16px;
  font-weight: ${buttonFontWeight};
  cursor: pointer;
  transition: opacity 0.2s;
}

.login-form .login-button:hover {
  opacity: 0.9;
}`;
};

export const generateLoginSCSS = ({ loginType, loginStyles = {} }) => {
  const {
    backgroundColor = "#ffffff",
    borderColor = "#e1e5e9",
    borderWidth = "1px", 
    borderRadius = "8px",
    padding = "32px",
    width = "400px",
    boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)",
    titleColor = "#1a1a1a",
    titleFontSize = "24px",
    titleFontWeight = "600",
    labelColor = "#374151",
    labelFontSize = "14px",
    inputBackgroundColor = "#ffffff",
    inputBorderColor = "#d1d5db",
    inputBorderRadius = "6px", 
    inputPadding = "12px",
    inputFontSize = "16px",
    buttonBackgroundColor = "#3b82f6",
    buttonColor = "#ffffff",
    buttonBorderRadius = "6px",
    buttonPadding = "12px 24px",
    buttonFontWeight = "500",
    rememberMeColor = "#374151"
  } = loginStyles;

  return `// Login Form Variables
$form-bg: ${backgroundColor};
$form-border-color: ${borderColor};
$form-border-width: ${borderWidth};
$form-border-radius: ${borderRadius};
$form-padding: ${padding};
$form-width: ${width};
$form-shadow: ${boxShadow};

$title-color: ${titleColor};
$title-font-size: ${titleFontSize};
$title-font-weight: ${titleFontWeight};

$label-color: ${labelColor};
$label-font-size: ${labelFontSize};

$input-bg: ${inputBackgroundColor};
$input-border-color: ${inputBorderColor};
$input-border-radius: ${inputBorderRadius};
$input-padding: ${inputPadding};
$input-font-size: ${inputFontSize};

$button-bg: ${buttonBackgroundColor};
$button-color: ${buttonColor};
$button-border-radius: ${buttonBorderRadius};
$button-padding: ${buttonPadding};
$button-font-weight: ${buttonFontWeight};

$remember-color: ${rememberMeColor};

.login-form {
  &.${loginType} {
    background-color: $form-bg;
    border: $form-border-width solid $form-border-color;
    border-radius: $form-border-radius;
    padding: $form-padding;
    width: $form-width;
    max-width: 100%;
    box-shadow: $form-shadow;
    font-family: Arial, sans-serif;
    box-sizing: border-box;
  }

  .login-title {
    color: $title-color;
    font-size: $title-font-size;
    font-weight: $title-font-weight;
    margin: 0 0 24px 0;
    text-align: center;
  }

  .input-group {
    margin-bottom: 16px;
  }

  .login-label {
    color: $label-color;
    font-size: $label-font-size;
    font-weight: 500;
    display: block;
    margin-bottom: 6px;
  }

  .login-input {
    background-color: $input-bg;
    border: 1px solid $input-border-color;
    border-radius: $input-border-radius;
    padding: $input-padding;
    width: 100%;
    font-size: $input-font-size;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;

    &:focus {
      border-color: $button-bg;
      box-shadow: 0 0 0 3px #{$button-bg}20;
    }
  }

  .remember-me {
    color: $remember-color;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 0;
  }

  .login-button {
    background-color: $button-bg;
    color: $button-color;
    border: none;
    border-radius: $button-border-radius;
    padding: $button-padding;
    width: 100%;
    font-size: 16px;
    font-weight: $button-font-weight;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
}`;
};
