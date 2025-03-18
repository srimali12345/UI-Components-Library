import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ButtonCustomization from "./components/Button/ButtonCustomization";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customize/:buttonType" element={<ButtonCustomization/>} />
      </Routes>
    </Router>
  );
};

export default App;
