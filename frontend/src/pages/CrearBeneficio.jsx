import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CrearBeneficio = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    publico_objetivo: '',
    fecha_inicio: '',
    fecha_termino: '',
    institucion: '',
    estado: 'vigente',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!form.nombre || !form.descripcion || !form.fecha_inicio || !form.fecha_termino) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/beneficios', form);
      navigate('/beneficios');
    } catch (err) {
      console.error('Error al crear beneficio:', err);
      setError('Hubo un error al guardar el beneficio.');
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h4" className="bg-primary text-white">
          Crear Nuevo Beneficio
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
                    value={form.nombre}
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
                    value={form.institucion}
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
                value={form.descripcion}
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
                    value={form.fecha_inicio}
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
                    value={form.fecha_termino}
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
                    value={form.publico_objetivo}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select name="estado" value={form.estado} onChange={handleChange}>
                    <option value="vigente">Vigente</option>
                    <option value="proximo">Próximo</option>
                    <option value="finalizado">Finalizado</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end">
              <Button variant="secondary" className="me-2" onClick={() => navigate('/beneficios')}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Beneficio
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CrearBeneficio;
