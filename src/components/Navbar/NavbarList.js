export const templates = [
  {
    id: 2,
    name: "Dark Navbar with Search",
    style: {
      backgroundColor: "#1A1F2C",
      textColor: "#ffffff",
      activeColor: "#9b87f5",
      hoverColor: "#7E69AB",
      borderRadius: "0px",
      hasSearch: true,
      navPosition: "left",
    },
    navItems: [
      { id: 1, text: "Item1", active: true, url: "/" },
      { id: 2, text: "Item2", active: false, url: "/item2" },
      { id: 3, text: "Item3", active: false, url: "/item3" },
    ],
    thumbnail: "dark-navbar-search.png",
  },
  {
    id: 3,
    name: "Light Rounded Navbar",
    style: {
      backgroundColor: "#ffffff",
      textColor: "#333333",
      activeColor: "#9b87f5",
      hoverColor: "#7E69AB",
      borderRadius: "8px",
      hasSearch: true,
      navPosition: "right",
    },
    navItems: [
      { id: 1, text: "Item1", active: true, url: "/" },
      { id: 2, text: "Item2", active: false, url: "/item2" },
      { id: 3, text: "Item3", active: false, url: "/item3" },
    ],
    thumbnail: "light-navbar.png",
  },
];
