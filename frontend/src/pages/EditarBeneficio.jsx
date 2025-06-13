import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const EditarBeneficio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [beneficio, setBeneficio] = useState({
    nombre: '',
    descripcion: '',
    publico_objetivo: '',
    fecha_inicio: '',
    fecha_termino: '',
    institucion: '',
    estado: 'vigente',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerBeneficio = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/beneficios/${id}`);
        const beneficioData = res.data;

        // Aseguramos que las fechas estén en formato YYYY-MM-DD para los inputs tipo date
        beneficioData.fecha_inicio = beneficioData.fecha_inicio?.split('T')[0] || '';
        beneficioData.fecha_termino = beneficioData.fecha_termino?.split('T')[0] || '';

        setBeneficio(beneficioData);
      } catch (err) {
        console.error('Error al obtener beneficio:', err);
        setError('No se pudo cargar el beneficio.');
      }
    };

    obtenerBeneficio();
  }, [id]);

  const handleChange = (e) => {
    setBeneficio({ ...beneficio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/beneficios/${id}`, beneficio);
      navigate('/beneficios');
    } catch (err) {
      console.error('Error al actualizar beneficio:', err);
      setError('Hubo un error al actualizar el beneficio.');
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h4" className="bg-warning text-dark">
          Editar Beneficio
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={beneficio.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="institucion">
                  <Form.Label>Institución</Form.Label>
                  <Form.Control
                    type="text"
                    name="institucion"
                    value={beneficio.institucion}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="descripcion">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={beneficio.descripcion}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="fecha_inicio">
                  <Form.Label>Fecha de Inicio *</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_inicio"
                    value={beneficio.fecha_inicio}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="fecha_termino">
                  <Form.Label>Fecha de Término *</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_termino"
                    value={beneficio.fecha_termino}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="publico_objetivo">
                  <Form.Label>Público Objetivo</Form.Label>
                  <Form.Control
                    type="text"
                    name="publico_objetivo"
                    value={beneficio.publico_objetivo}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    name="estado"
                    value={beneficio.estado}
                    onChange={handleChange}
                  >
                    <option value="vigente">Vigente</option>
                    <option value="proximo">Próximo</option>
                    <option value="finalizado">Finalizado</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => navigate('/beneficios')}
              >
                Cancelar
              </Button>
              <Button variant="warning" type="submit">
                Actualizar Beneficio
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditarBeneficio;
