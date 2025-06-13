// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Beneficios from "./pages/Beneficios";
import BeneficiosVigentes from "./pages/BeneficiosVigentes";
import CrearBeneficio from "./pages/CrearBeneficio";
import EditarBeneficio from "./pages/EditarBeneficio";

const App = () => (
    <Router>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beneficios" element={<Beneficios />} />
          <Route path="/beneficios/vigentes" element={<BeneficiosVigentes />} />
          <Route path="/beneficios/crear" element={<CrearBeneficio />} />
          <Route path="/beneficios/editar/:id" element={<EditarBeneficio />} />
        </Routes>
      </div>
    </Router>
);

export default App;
