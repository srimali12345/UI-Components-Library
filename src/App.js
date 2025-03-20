import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ButtonSelection from "./components/Button/ButtonSelection";
import ButtonCustomization from "./components/Button/ButtonCustomization";
import LandingPage from "./pages/Home";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/buttons" element={<ButtonSelection/>} />
          <Route path="/customize/:buttonType" element={<ButtonCustomization />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
