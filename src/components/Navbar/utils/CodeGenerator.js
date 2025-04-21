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

  return `${topLeftRadius} ${topRightRadius} ${bottomLeftRadius} ${bottomRightRadius}`;
};

export const generateHTML = (navbarStyle, navItems) => {
  const navItems_html = navItems
    .map((item) => {
      return `  <a href="${item.url}" class="nav-item${
        item.active ? " active" : ""
      }">${item.text}</a>`;
    })
    .join("\n");

  const searchHTML = navbarStyle.hasSearch
    ? `<div class="search-container ">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
    class="lucide lucide-search-icon lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    <input
      type="text"
      placeholder="Search"
      className="search-input"
    />
      </div>`
    : "";

  const logoHTML = `<div class="navbar-logo">
    ${
      navbarStyle.logoUrl
        ? `<img src="${navbarStyle.logoUrl}" alt="Logo">`
        : '<img class= "navbar-logo" src="https://www.pngkey.com/png/full/233-2332677_image-500580-placeholder-transparent.png"/>'
    }
  </div>`;

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
      <div class="nav-icons">
        <button class="icon-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 
        0 24 24" fill="none" stroke="currentColor" 
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="lucide lucide-bell-icon lucide-bell">
        <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
        <path d="M3.262 15.326A1 1 0 0 0 4 
        17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 
        6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
        </button>
        <button class="user-button">
        <div className="profile-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
         viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" stroke-width="2" stroke-linecap="round" 
        stroke-linejoin="round" class="lucide 
        lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" 
        r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
        </div>
        </button>
      </div>
    </div>
  </div>
</nav>`;
};

export const generateCSS = (navbarStyle) => {
  const borderRadius = generateBorderRadius(navbarStyle);

  const borderStyles = `border: ${navbarStyle.borderWidth || "1px"} solid ${navbarStyle.borderColor || "#e5e7eb"};`;

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
  border-radius: ${navbarStyle.SearchBarBorderRadius || "6px"};
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
.profile-icon {
  width: 32px;
  height: 32px;
  background-color: #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  .user-icon {
    color: #4b5563;
  }
}

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

@media (max-width: 768px) {
  .nav-items, .nav-search {
    display: none;
  }
}`;
};

export const generateSASS = (navbarStyle) => {
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

  return `
.custom-navbar {
  background-color: ${navbarStyle.backgroundColor};
  color: ${navbarStyle.textColor};
  height: ${navbarStyle.height};
  padding: ${navbarStyle.padding};
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
}

@media (max-width: 768px) {
  .custom-navbar {
    .nav-items, .nav-search {
      display: none;
    }
  }
}`;
};
