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

  return `${topLeftRadius} ${topRightRadius} ${bottomLeftRadius} ${bottomRightRadius} `;
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
    ? `
  <div class="nav-search">
    <input type="text" placeholder="Search...">
    <button class="search-button">
      <svg xmlns="http://www.w3.org/2000/svg" 
      width="16" height="16" viewBox="0 0 24 24" f
      ill="none" stroke="currentColor" stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65">
      </line></svg>
    </button>
  </div>`
    : "";

  const leftSideItems =
    navbarStyle.navPosition === "left"
      ? `<div class="nav-items">\n${navItems_html}\n</div>`
      : "";
  const rightSideItems =
    navbarStyle.navPosition === "right"
      ? `<div class="nav-items">\n${navItems_html}\n</div>`
      : "";

  return `<nav class="custom-navbar">
  <div class="navbar-container">
    <div class="navbar-left">
      <div class="navbar-logo">
        ${
          navbarStyle.logoUrl
            ? `<img src="${navbarStyle.logoUrl}" alt="Logo">`
            : "Logo"
        }
      </div>
      ${leftSideItems}
    </div>
    
    <div class="navbar-right">
      ${
        navbarStyle.navPosition === "left" && navbarStyle.hasSearch
          ? searchHTML
          : ""
      }
      ${rightSideItems}
      ${
        navbarStyle.navPosition === "right" && navbarStyle.hasSearch
          ? searchHTML
          : ""
      }
      <div class="nav-icons">
        <button class="icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" 
          width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" 
           stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
           <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
        </button>
        <button class="user-button">
          <svg xmlns="http://www.w3.org/2000/svg" 
          width="20" height="20" viewBox="0 0 24 24" 
          fill="none" stroke="currentColor" stroke-width="2" 
          stroke-linecap="round" stroke-linejoin="round"><circle cx="12" 
          cy="8" r="5"></circle><path d="M20 21a8 8 0 1 0-16 0"></path></svg>
        </button>
      </div>
    </div>
  </div>
</nav>`;
};

export const generateCSS = (navbarStyle) => {
  const borderRadius = generateBorderRadius(navbarStyle);
  const borderStyles = navbarStyle.borderWidth
    ? `border: ${navbarStyle.borderWidth} solid ${
        navbarStyle.borderColor || "#000"
      };`
    : "";

  const searchBarBorder = navbarStyle.SearchBorderWidth
    ? `border: ${navbarStyle.SearchBorderWidth} solid ${
        navbarStyle.SearchBarBorderColor || "#000"
      };`
    : "";

  return `/* Custom navbar styles */
.custom-navbar {
  background-color: ${navbarStyle.backgroundColor};
  color: ${navbarStyle.textColor};
  height: ${navbarStyle.height};
  padding: ${navbarStyle.padding};
  ${borderStyles}
  border-radius:${borderRadius}
}

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
}

.navbar-logo img {
  max-height: 100%;
  max-width: 100%;
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
}

.nav-item:hover {
  color: ${navbarStyle.hoverColor || "#7E69AB"};
}

.nav-item.active {
  color: ${navbarStyle.activeColor};
  border-bottom: 2px solid ${navbarStyle.activeColor};
}

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
}

.nav-search input {
  background: transparent;
  border: none;
  color: ${navbarStyle.textColor};
  outline: none;
  width: 180px;
  font-size: 0.875rem;
}

.nav-search input::placeholder {
  color: rgba(255, 255, 255, 0.5);
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
}

.search-button:hover {
  opacity: 1;
}

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

  return `// Custom navbar styles
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

  .nav-search {
    background-color: ${
      navbarStyle.searchBarBackgroundColor || "rgba(255, 255, 255, 0.1)"
    };
    border-radius: ${navbarStyle.SearchBarBorderRadius || "4px"};
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
