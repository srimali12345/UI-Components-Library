export const generateHTML = (navbarStyle, navItems) => {
  const hasLogo = navbarStyle.logoUrl !== "";
  const logoPlaceholder =
    '<img src="your-logo.png" alt="Logo" class="navbar-logo">';

  const itemsHTML = navItems
    .map(
      (item) =>
        `    <li><a href="${item.url}" class="nav-link${
          item.active ? " active" : ""
        }">${item.text}</a></li>`
    )
    .join("\n");

  return `<nav class="custom-navbar">
    <div class="navbar-container">
      ${
        hasLogo
          ? '    <div class="logo-container">\n      ' +
            logoPlaceholder +
            "\n    </div>"
          : ""
      }
      <ul class="nav-menu">
  ${itemsHTML}
      </ul>
    </div>
  </nav>`;
};

export const generateCSS = (navbarStyle) => {
  return `.custom-navbar {
    background-color: ${navbarStyle.backgroundColor};
    color: ${navbarStyle.textColor};
    height: ${navbarStyle.height};
    padding: ${navbarStyle.padding};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .logo-container {
    height: 100%;
    display: flex;
    align-items: center;
  }
  
  .navbar-logo {
    max-height: 70%;
  }
  
  .nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-menu li {
    margin-left: 20px;
  }
  
  .nav-link {
    color: ${navbarStyle.textColor};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .nav-link:hover {
    color: ${navbarStyle.hoverColor};
  }
  
  .nav-link.active {
    color: ${navbarStyle.activeColor};
  }
  
  @media (max-width: 768px) {
    .navbar-container {
      flex-direction: column;
    }
    
    .nav-menu {
      margin-top: 15px;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .nav-menu li {
      margin: 5px 10px;
    }
  }`;
};

export const generateSASS = (navbarStyle) => {
  return `$navbar-bg: ${navbarStyle.backgroundColor};
  $text-color: ${navbarStyle.textColor};
  $active-color: ${navbarStyle.activeColor};
  $hover-color: ${navbarStyle.hoverColor};
  $navbar-height: ${navbarStyle.height};
  $navbar-padding: ${navbarStyle.padding};
  
  .custom-navbar {
    background-color: $navbar-bg;
    color: $text-color;
    height: $navbar-height;
    padding: $navbar-padding;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      max-width: 1200px;
      margin: 0 auto;
      
      .logo-container {
        height: 100%;
        display: flex;
        align-items: center;
        
        .navbar-logo {
          max-height: 70%;
        }
      }
      
      .nav-menu {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        
        li {
          margin-left: 20px;
          
          .nav-link {
            color: $text-color;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
            
            &:hover {
              color: $hover-color;
            }
            
            &.active {
              color: $active-color;
            }
          }
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    .custom-navbar {
      .navbar-container {
        flex-direction: column;
        
        .nav-menu {
          margin-top: 15px;
          flex-wrap: wrap;
          justify-content: center;
          
          li {
            margin: 5px 10px;
          }
        }
      }
    }
  }`;
};
