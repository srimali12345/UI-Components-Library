import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ButtonSelection from "./components/Button/ButtonSelection";
import ButtonCustomization from "./components/Button/ButtonCustomization";
import LandingPage from "./pages/Home";
import Layout from "./components/Layout";
import NavbarCustomizer from "./components/Navbar/NavbarCustomizer";
import "./styles/components/navbarCustomization.scss";
import NavbarTemplates from "./components/Navbar/NavbarTemplates";
import Docs from './pages/docs';
import FAQ from './pages/faq';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/docs" element={<Docs/>} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/dashboard/buttons" element={<ButtonSelection />} />
          <Route
            path="/customize/:buttonType"
            element={<ButtonCustomization />}
          />
          <Route path="/" element={<NavbarTemplates />} />
          <Route path="/customizer" element={<NavbarCustomizer />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
