import React from "react";
import Navbar from "./Navbar.js";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
