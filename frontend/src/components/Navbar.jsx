// src/components/Navbar.jsx

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
    <Link to="/" style={{ marginRight: "10px" }}>Inicio</Link>
    <Link to="/beneficios" style={{ marginRight: "10px" }}>Todos los beneficios</Link>
    <Link to="/beneficios/vigentes" style={{ marginRight: "10px" }}>Beneficios vigentes</Link>
    <Link to="/beneficios/crear">Crear beneficio</Link>
  </nav>
);

export default Navbar;
