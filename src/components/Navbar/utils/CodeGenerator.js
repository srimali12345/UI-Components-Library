export const generateBorderRadius = (styles = {}) => {
  const {
    topLeftRadius = "6px",
    topRightRadius = "6px",
    bottomRightRadius = "6px",
    bottomLeftRadius = "6px",
  } = styles;

  const tl = parseInt(topLeftRadius) || 6;
  const tr = parseInt(topRightRadius) || 6;
  const br = parseInt(bottomRightRadius) || 6;
  const bl = parseInt(bottomLeftRadius) || 6;

  if (tl === tr && tr === br && br === bl) {
    return `${tl}px`;
  }

  return `${topLeftRadius} ${topRightRadius} ${bottomRightRadius} ${bottomLeftRadius}`;
};

export const generateSearchBorderRadius = (styles = {}) => {
  const {
    searchBorderTopLeftRadius = "6px",
    searchBorderTopRightRadius = "6px",
    searchBorderBottomLeftRadius = "6px",
    searchBorderBottomRightRadius = "6px",
  } = styles;

  const tl = parseInt(searchBorderTopLeftRadius) || 6;
  const tr = parseInt(searchBorderTopRightRadius) || 6;
  const br = parseInt(searchBorderBottomLeftRadius) || 6;
  const bl = parseInt(searchBorderBottomRightRadius) || 6;

  if (tl === tr && tr === br && br === bl) {
    return `${tl}px`;
  }

  return `${searchBorderTopLeftRadius} ${searchBorderTopRightRadius} ${searchBorderBottomLeftRadius} ${searchBorderBottomRightRadius}`;
};

const generateSubmenuHTML = (submenuItems) => {
  if (!submenuItems || submenuItems.length === 0) {
    return "";
  }

  return `
    <div class="nav-submenu">
      ${submenuItems
        .map(
          (item) => `
        <a href="${item.url}" class="submenu-item">${item.text}</a>
      `
        )
        .join("")}
    </div>
  `;
};

const getNotificationIconHTML = (navbarStyle) => {
  if (navbarStyle.icons?.notification?.show === false) {
    return "";
  }

  const variant = navbarStyle.icons?.notification?.variant || "bell";

  if (variant === "bell") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="18" 
    height="18" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell">
      <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1
       1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>
    </svg>`;
  } else if (variant === "bell-ring") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-ring">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
      <path d="M4 2C2.8 3.7 2 5.7 2 8"/>
      <path d="M22 8c0-2.3-.8-4.3-2-6"/>
    </svg>`;
  } else if (variant === "bell-plus") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-plus">
      <path d="M19.3 14.8C19.3 14.8 21 16.5 21 17.6C21 18.7 21 19.8 18.9 19.8C16.8 19.8 13 19.8 9.8 19.8C6.7 
      19.8 5.7 19.8 4.2 19.8C2.7 19.8 3 17.7 3 16.6C3 15.5 4.7 13.8 4.7 13.8"/>
      <path d="M15.2 19.8C15.2 20.4 14.9 21 14.4 21.4C13.8 21.8 13.1 22 12.4 22C11.7 22
      11 21.8 10.4 21.4C9.9 21 9.6 20.4 9.6 19.8"/>
      <path d="M4.7 13.8C4.7 13.8 4 12.9 4 10.8C4 8.7 7.4 4 12 4C16.6 4 
      20 8.7 20 10.8C20 12.9 19.3 13.8 19.3 13.8"/>
      <line x1="12" x2="12" y1="4" y2="8"/>
      <line x1="14" x2="10" y1="6" y2="6"/>
    </svg>`;
  }

  return "";
};

const getProfileIconHTML = (navbarStyle) => {
  if (navbarStyle.icons?.profile?.show === false) {
    return "";
  }

  const variant = navbarStyle.icons?.profile?.variant || "user";

  if (variant === "user") {
    return `<svg xmlns="http://www.w3.org/2000/svg" 
    width="18" height="18" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="lucide lucide-user">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>`;
  } else if (variant === "user-circle") {
    return `<svg xmlns="http://www.w3.org/2000/svg"
     width="18" height="18" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" c
    lass="lucide lucide-user-circle">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="10" r="3"/>
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
    </svg>`;
  } else if (variant === "user-round") {
    return `<svg xmlns="http://www.w3.org/2000/svg" 
    width="18" height="18" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
    class="lucide lucide-user-round">
      <circle cx="12" cy="8" r="5"/>
      <path d="M20 21a8 8 0 0 0-16 0"/>
    </svg>`;
  }

  return "";
};

export const generateHTML = (navbarStyle, navItems = []) => {
  const hasAnySubmenu =
    navItems &&
    navItems.some((item) => item.submenu && item.submenu.length > 0);

  const navItems_html = navItems
    .map((item) => {
      const hasSubmenu = item.submenu && item.submenu.length > 0;
      const submenuHtml = hasSubmenu ? generateSubmenuHTML(item.submenu) : "";

      return `  <div class="nav-item-wrapper">
    <a href="${item.url}" class="nav-item${item.active ? " active" : ""}${
        hasSubmenu ? " has-dropdown" : ""
      }">${item.text}${
        hasSubmenu ? '<span class="dropdown-arrow">▼</span>' : ""
      }</a>
    ${submenuHtml}
  </div>`;
    })
    .join("\n");

  const searchHTML = navbarStyle.hasSearch
    ? `<div class="search-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
    class="lucide lucide-search-icon lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    <input
      type="text"
      placeholder="Search"
      class="search-input"
    />
    </div>`
    : "";

  const logoHTML = `<div class="navbar-logo">
    ${
      navbarStyle.logoUrl
        ? `<img src="logo.png" alt="Logo">`
        : '<img class="navbar-logo" src="https://www.pngkey.com/png/full/233-2332677_image-500580-placeholder-transparent.png"/>'
    }
  </div>`;

  const notificationIconHTML = getNotificationIconHTML(navbarStyle);
  const profileIconHTML = getProfileIconHTML(navbarStyle);

  const iconsHTML =
    notificationIconHTML || profileIconHTML
      ? `<div class="nav-icons">
        ${
          notificationIconHTML
            ? `<button class="icon-button notification-button">${notificationIconHTML}</button>`
            : ""
        }
        ${
          profileIconHTML
            ? `<button class="user-button profile-button">${profileIconHTML}</button>`
            : ""
        }
      </div>`
      : "";

  let leftContent = "";
  let rightContent = "";

  if (navbarStyle.navPosition === "left") {
    leftContent = `
      ${logoHTML}
      <div class="nav-items">
        ${navItems_html}
      </div>
    `;
    rightContent = `
      ${searchHTML}
    `;
  } else if (navbarStyle.navPosition === "right") {
    leftContent = `
      ${logoHTML}
      ${searchHTML}
    `;
    rightContent = `
      <div class="nav-items">
        ${navItems_html}
      </div>
    `;
  } else {
    leftContent = logoHTML;
    rightContent = `
      ${searchHTML}
      <div class="nav-items">
        ${navItems_html}
      </div>
    `;
  }

  return `<nav class="custom-navbar">
  <div class="navbar-container">
    <div class="navbar-left">
      ${leftContent}
    </div>
    <div class="navbar-right">
      ${rightContent}
      ${iconsHTML}
    </div>
  </div>
</nav>`;
};

export const generateCSS = (navbarStyle, navItems = []) => {
  const borderRadius = generateBorderRadius(navbarStyle);
  const searchBorderRadius = generateSearchBorderRadius(navbarStyle);

  const hasAnySubmenu =
    navItems &&
    navItems.some((item) => item.submenu && item.submenu.length > 0);

  const hasNotificationIcon = navbarStyle.icons?.notification?.show !== false;
  const hasProfileIcon = navbarStyle.icons?.profile?.show !== false;

  const borderStyles = `border: ${navbarStyle.borderWidth || "1px"} solid ${
    navbarStyle.borderColor || "#e5e7eb"
  };`;

  const searchBarBorder = navbarStyle.SearchBorderWidth
    ? `border: ${navbarStyle.SearchBorderWidth} solid ${
        navbarStyle.SearchBarBorderColor || "#000"
      };`
    : "border:1px solid #e5e7eb";

  const logoStyles = navbarStyle.logoUrl
    ? `
.navbar-logo {
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-right: 1rem;
}
.navbar-logo img {
  max-height: 100%;
  max-width: 100%;
}
`
    : "";

  const searchStyles = navbarStyle.hasSearch
    ? `
.search-container {
  display: flex;
  align-items: center;
  background-color: ${
    navbarStyle.searchBarBackgroundColor || "rgba(255, 255, 255, 0.1)"
  };
  border-radius:${searchBorderRadius};
  ${searchBarBorder};
  padding: 6px 12px;
  flex-shrink: 0;
}
  .search-container input {
    background: transparent;
    border: none;
    color: ${navbarStyle.textColor};
    outline: none;
    width: 180px;
    font-size: 0.875rem;
    margin-left: 5px;
  }
`
    : "";

  const submenuStyles = hasAnySubmenu
    ? `
.nav-item-wrapper {
  position: relative;
  padding-bottom: 10px;
}

.nav-item.has-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dropdown-arrow {
  font-size: 10px;
  margin-left: 4px;
}

.nav-submenu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${navbarStyle.backgroundColor};
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  z-index: 1;
  display: none;
  border: 1px solid ${navbarStyle.borderColor || "#e5e7eb"};
  border-radius: 4px;
  margin-top: 5px;
  pointer-events: auto;
}

.nav-item-wrapper:hover .nav-submenu {
  display: block;
}

.submenu-item {
  color: ${navbarStyle.textColor};
  padding: 10px 15px;
  text-decoration: none;
  display: block;
  font-size: 0.85rem;
  white-space: nowrap;
}

.submenu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: ${navbarStyle.hoverColor || "#7E69AB"};
}
`
    : "";

  const iconColorStyles =
    hasNotificationIcon || hasProfileIcon
      ? `
${
  hasNotificationIcon
    ? `.notification-button svg {
  color: ${navbarStyle.icons?.notification?.color || navbarStyle.textColor};
}`
    : ""
}

${
  hasProfileIcon
    ? `.profile-button svg {
  color: ${navbarStyle.icons?.profile?.color || navbarStyle.textColor};
}`
    : ""
}
`
      : "";

  const iconContainerStyles =
    hasNotificationIcon || hasProfileIcon
      ? `
.nav-icons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-button {
  background: transparent;
  border: none;
  color: ${navbarStyle.textColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.2s;
}
${iconColorStyles}

.icon-button:hover {
  opacity: 1;
}

.user-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: ${navbarStyle.textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
`
      : "";

  return `.custom-navbar {
  background-color: ${navbarStyle.backgroundColor};
  color: ${navbarStyle.textColor};
  height:60px;
  padding:0 20px;
  ${borderStyles}
  border-radius: ${borderRadius};
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0 auto;
}

.navbar-left, .navbar-right {
  display: flex;
  align-items: center;
}

.navbar-logo {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.navbar-logo img {
  max-height: 100%;
  max-width: 100%;
}

.nav-items {
  display: flex;
  gap: 1.5rem;
  margin-right: 20px;
  align-items:center
}

.nav-item {
  color: ${navbarStyle.textColor};
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s ease;
}

.nav-item:hover {
  color: ${navbarStyle.hoverColor || "#7E69AB"};
}

.nav-item.active {
  color: ${navbarStyle.activeColor};
  border-bottom: 2px solid ${navbarStyle.activeColor};
}
${searchStyles}
${submenuStyles}
${iconContainerStyles}

@media (max-width: 768px) {
  .nav-items, .nav-search {
    display: none;
  }
}`;
};

export const generateSASS = (navbarStyle, navItems = []) => {
  // Check if any item has submenu
  const hasAnySubmenu =
    navItems &&
    navItems.some((item) => item.submenu && item.submenu.length > 0);

  // Check if icons are enabled
  const hasNotificationIcon = navbarStyle.icons?.notification?.show !== false;
  const hasProfileIcon = navbarStyle.icons?.profile?.show !== false;
  const hasIcons = hasNotificationIcon || hasProfileIcon;

  const borderStyles = navbarStyle.borderWidth
    ? `border: ${navbarStyle.borderWidth} solid ${
        navbarStyle.borderColor || "#000"
      };`
    : "";

  const borderRadius =
    navbarStyle.topLeftRadius ||
    navbarStyle.topRightRadius ||
    navbarStyle.bottomRightRadius ||
    navbarStyle.bottomLeftRadius
      ? `border-radius: ${navbarStyle.topLeftRadius || 0} 
       ${navbarStyle.topRightRadius || 0} 
       ${navbarStyle.bottomRightRadius || 0} 
       ${navbarStyle.bottomLeftRadius || 0};`
      : `border-radius: ${navbarStyle.borderRadius || "0px"};`;

  const searchBarBorder = navbarStyle.SearchBorderWidth
    ? `border: ${navbarStyle.SearchBorderWidth} solid ${
        navbarStyle.SearchBarBorderColor || "#000"
      };`
    : "";

  const searchStyles = navbarStyle.hasSearch
    ? `
  .nav-search {
    background-color: ${
      navbarStyle.searchBarBackgroundColor || "rgba(255, 255, 255, 0.1)"
    };
    border-radius: ${navbarStyle.SearchBarBorderRadius || "6px"};
    ${searchBarBorder}
    padding: 0.3rem 0.5rem;
    display: flex;
    align-items: center;
    margin-right: 1rem;

    input {
      background: transparent;
      border: none;
      color: ${navbarStyle.textColor};
      outline: none;
      width: 180px;
      font-size: 0.875rem;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }

  .search-button {
    background: transparent;
    border: none;
    color: ${navbarStyle.textColor};
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`
    : "";

  // Add submenu styles in SASS format - only if we have submenus
  const submenuStyles = hasAnySubmenu
    ? `
  .nav-item-wrapper {
    position: relative;
    
    &:hover .nav-submenu {
      display: block;
    }
  }

  .nav-item {
    &.has-dropdown {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }

  .dropdown-arrow {
    font-size: 10px;
    margin-left: 4px;
  }

  .nav-submenu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: ${navbarStyle.backgroundColor};
    min-width: 160px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    z-index: 1;
    display: none;
    border: 1px solid ${navbarStyle.borderColor || "#e5e7eb"};
    border-radius: 4px;
    margin-top: 5px;
    
    .submenu-item {
      color: ${navbarStyle.textColor};
      padding: 10px 15px;
      text-decoration: none;
      display: block;
      font-size: 0.85rem;
      white-space: nowrap;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: ${navbarStyle.hoverColor || "#7E69AB"};
      }
    }
  }
  `
    : "";

  // Add custom icon styles - only if icons are enabled
  const iconStyles = hasIcons
    ? `
  .nav-icons {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    ${
      hasNotificationIcon
        ? `.notification-button svg {
      color: ${navbarStyle.icons?.notification?.color || navbarStyle.textColor};
    }`
        : ""
    }
    
    ${
      hasProfileIcon
        ? `.profile-button svg {
      color: ${navbarStyle.icons?.profile?.color || navbarStyle.textColor};
    }`
        : ""
    }
  }

  .icon-button {
    background: transparent;
    border: none;
    color: ${navbarStyle.textColor};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }

  .user-button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    color: ${navbarStyle.textColor};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  `
    : "";

  return `
.custom-navbar {
  background-color: ${navbarStyle.backgroundColor};
  color: ${navbarStyle.textColor};
  height: ${navbarStyle.height || "60px"};
  padding: ${navbarStyle.padding || "0 20px"};
  ${borderStyles}
  ${borderRadius}

  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .navbar-left, .navbar-right {
    display: flex;
    align-items: center;
  }

  .navbar-logo {
    width: 100px;
    height: 40px;
    display: flex;
    align-items: center;
    margin-right: 1rem;

    img {
      max-height: 100%;
      max-width: 100%;
    }
  }

  .nav-items {
    display: flex;
    gap: 1.5rem;
  }

  ${submenuStyles}

  .nav-item {
    color: ${navbarStyle.textColor};
    text-decoration: none;
    padding: 0.5rem 0;
    position: relative;
    transition: color 0.2s ease;

    &:hover {
      color: ${navbarStyle.hoverColor || "#7E69AB"};
    }

    &.active {
      color: ${navbarStyle.activeColor};
      border-bottom: 2px solid ${navbarStyle.activeColor};
    }
  }

  ${searchStyles}

  ${iconStyles}
}

@media (max-width: 768px) {
  .custom-navbar {
    .nav-items, .nav-search {
      display: none;
    }
  }
}`;
};
