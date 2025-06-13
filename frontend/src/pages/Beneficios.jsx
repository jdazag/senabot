import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Función para formatear fechas a DD/MM/AAAA
const formatearFecha = (fechaStr) => {
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const Beneficios = () => {
  const [beneficios, setBeneficios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cargarBeneficios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/beneficios');
      setBeneficios(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar los beneficios:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarBeneficios();
  }, []);

  const eliminarBeneficio = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este beneficio?')) {
      try {
        await axios.delete(`http://localhost:5000/api/beneficios/${id}`);
        cargarBeneficios();
      } catch (error) {
        console.error('Error al eliminar beneficio:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2 className="text-primary">Listado de Beneficios</h2>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => navigate('/beneficios/crear')}>
            <FaPlus className="me-2" />
            Agregar Beneficio
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Público Objetivo</th>
              <th>Inicio</th>
              <th>Término</th>
              <th>Institución</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {beneficios.map((b) => (
              <tr key={b.id}>
                <td>{b.nombre}</td>
                <td>{b.descripcion}</td>
                <td>{b.publico_objetivo}</td>
                <td>{formatearFecha(b.fecha_inicio)}</td>
                <td>{formatearFecha(b.fecha_termino)}</td>
                <td>{b.institucion}</td>
                <td>
                  <span className={`badge bg-${b.estado === 'vigente' ? 'success' : b.estado === 'proximo' ? 'warning' : 'secondary'}`}>
                    {b.estado}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/api/beneficios/editar/${b.id}`)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => eliminarBeneficio(b.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Beneficios;
