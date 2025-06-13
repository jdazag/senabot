// src/pages/BeneficiosVigentes.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const BeneficiosVigentes = () => {
  const [vigentes, setVigentes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/beneficios/vigentes")
      .then((res) => setVigentes(res.data))
      .catch((err) => console.error("Error cargando beneficios vigentes:", err));
  }, []);

  return (
    <div>
      <h2>Beneficios Vigentes</h2>
      <ul>
        {vigentes.map((b) => (
          <li key={b.id}>
            <strong>{b.nombre}</strong>: {b.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeneficiosVigentes;
