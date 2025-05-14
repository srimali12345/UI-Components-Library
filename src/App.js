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
import InputCustomization from "./components/InputFeild/InputCustomization";
import InputSelection from "./components/InputFeild/InputFeildSelection";
import CardSelection from "./components/Card/CardSelection";
import CardCustomization from "./components/Card/CardCustomizer";
import { FavoritesProvider } from "./contexts/FavouriteContext";
import Favourite from "./pages/Favourite";

const App = () => {
  return (
    <Router>
      <FavoritesProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/docs" element={<Docs/>} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/dashboard" element={<ButtonSelection />} />
          <Route
            path="/customize/:buttonType"
            element={<ButtonCustomization />}
          />
          <Route path="/dashbord" element={<NavbarTemplates/>} />
          <Route path="/customize-navbar/:template" element={<NavbarCustomizer />} />
          <Route path="/dashbord" element={<InputSelection/>} />
          <Route path="/customize-input/:inputType"  element={<InputCustomization/>} />
          <Route path="/dashbord" element={<CardSelection/>} />
          <Route path="/customize-card/:cardType"  element={<CardCustomization/>} />
          <Route path="/favourites" element={<Favourite/>} />
        </Route>
      </Routes>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
