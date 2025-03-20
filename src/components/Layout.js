import React from "react";
import Navbar from "./Navbar.js";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      
    </div>
  );
};

export default Layout;
